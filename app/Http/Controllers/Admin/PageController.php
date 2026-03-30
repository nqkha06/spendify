<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Enums\BaseStatusEnum;
use App\Http\Requests\Admin\PageRequest;
use App\Models\Language;
use App\Models\Page;
use App\Support\Crud\IndexQuery;
use App\Support\Crud\PersistAction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class PageController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $defaultLocale = $this->defaultLocale();

        $pages = IndexQuery::for(Page::class)
            ->with(['translations'])
            ->filters([
                'search' => function (Builder $q, $value) {
                    $term = trim((string) $value);
                    $q->where(function (Builder $builder) use ($term) {
                        $builder
                            ->where('slug', 'like', "%{$term}%")
                            ->orWhereHas('translations', function (Builder $t) use ($term) {
                                $t->where('title', 'like', "%{$term}%")
                                    ->orWhere('slug', 'like', "%{$term}%");
                            });
                    });
                },
                'status' => ['type' => 'eq', 'col' => 'status'],
            ])
            ->sorts(['slug', 'status', 'created_at', 'id'], 'created_at', 'desc')
            ->paginate($request);

        $items = collect($pages->items())->map(function (Page $page) use ($defaultLocale) {
            $translation = $page->translations
                ->firstWhere('lang_code', $defaultLocale)
                ?? $page->translations->first();

            return [
                'id' => $page->id,
                'title' => $translation?->title ?? '',
                'slug' => $translation?->slug ?? $page->slug,
                'status' => $page->status instanceof BaseStatusEnum ? $page->status->value : (string) $page->status,
                'created_at' => optional($page->created_at)->toDateTimeString(),
            ];
        });

        return Inertia::render('admin/pages/list', [
            'pages' => $items,
            'pagination' => [
                'current_page' => $pages->currentPage(),
                'last_page' => $pages->lastPage(),
                'per_page' => $pages->perPage(),
                'total' => $pages->total(),
                'from' => $pages->firstItem(),
                'to' => $pages->lastItem(),
            ],
            'filters' => [
                'search' => $request->input('search'),
                'status' => $request->input('status'),
                'sort' => $request->input('sort'),
                'dir' => $request->input('dir'),
                'sort_by' => $request->input('sort'),
                'sort_direction' => $request->input('dir'),
            ],
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('admin/pages/add', [
            'languages' => $this->languages(),
            'default_locale' => $this->defaultLocale(),
        ]);
    }

    public function store(PageRequest $request, PersistAction $persist)
    {
        $data = $request->validated();

        $page = $persist->create(Page::class, [
            'user_id' => $request->user()?->id,
            'image' => $data['image'] ?? null,
            'slug' => $this->resolveBaseSlug($data),
            'category_id' => $data['category_id'] ?? null,
            'tags' => $this->normalizeTags($data['tags'] ?? null),
            'status' => $data['status'] ?? BaseStatusEnum::DRAFT->value,
        ]);

        $this->syncTranslations($page, $data['translations'] ?? []);

        if ($request->wantsJson()) {
            return response()->json($page->load('translations'), Response::HTTP_CREATED);
        }

        return redirect()->route('admin.pages.index')->with('success', 'Page created successfully.');
    }

    public function edit(Page $page): InertiaResponse
    {
        $page->load('translations');

        $translations = $page->translations->mapWithKeys(fn ($t) => [
            $t->lang_code => [
                'title' => $t->title,
                'slug' => $t->slug,
                'content' => $t->content,
                'meta_title' => $t->meta_title,
                'meta_description' => $t->meta_description,
                'meta_keywords' => $t->meta_keywords,
            ],
        ]);

        return Inertia::render('admin/pages/edit', [
            'languages' => $this->languages(),
            'default_locale' => $this->defaultLocale(),
            'page' => [
                'id' => $page->id,
                'slug' => $page->slug,
                'image' => $page->image,
                'category_id' => $page->category_id,
                'tags' => $page->tags,
                'status' => $page->status instanceof BaseStatusEnum ? $page->status->value : (string) $page->status,
                'translations' => $translations,
            ],
        ]);
    }

    public function update(PageRequest $request, Page $page, PersistAction $persist)
    {
        $data = $request->validated();

        $persist->update($page, [
            'slug' => $this->resolveBaseSlug($data, $page),
            'image' => $data['image'] ?? null,
            'category_id' => $data['category_id'] ?? null,
            'tags' => $this->normalizeTags($data['tags'] ?? null),
            'status' => $data['status'] ?? $page->status,
        ], false);

        $this->syncTranslations($page, $data['translations'] ?? []);

        if ($request->wantsJson()) {
            return response()->json($page->load('translations'));
        }

        return redirect()->route('admin.pages.index')->with('success', 'Page updated successfully.');
    }

    public function destroy(Request $request, Page $page)
    {
        $page->delete();

        if ($request->wantsJson()) {
            return response()->json(['deleted' => true]);
        }

        return redirect()->route('admin.pages.index')->with('success', 'Page deleted successfully.');
    }

    private function defaultLocale(): string
    {
        return Language::where('is_default', true)->value('code') ?? app()->getLocale();
    }

    private function languages(): Collection
    {
        return Language::orderBy('order')->get(['id', 'name', 'code', 'locale', 'is_default']);
    }

    private function syncTranslations(Page $page, array $translations): void
    {
        foreach ($translations as $locale => $payload) {
            $rawSlug = $payload['slug'] ?? Str::slug((string) ($payload['title'] ?? ''));
            $normalizedSlug = $rawSlug !== null && trim((string) $rawSlug) !== ''
                ? Str::slug((string) $rawSlug)
                : null;

            $page->translations()->updateOrCreate(
                ['lang_code' => $locale],
                [
                    'title' => $payload['title'] ?? '',
                    'slug' => $normalizedSlug,
                    'content' => $payload['content'] ?? null,
                    'meta_title' => $payload['meta_title'] ?? null,
                    'meta_description' => $payload['meta_description'] ?? null,
                    'meta_keywords' => $payload['meta_keywords'] ?? null,
                ]
            );
        }
    }

    private function resolveBaseSlug(array $data, ?Page $page = null): string
    {
        $defaultLocale = $this->defaultLocale();
        $translation = $data['translations'][$defaultLocale] ?? reset($data['translations']) ?: [];

        $slugSource = $data['slug'] ?? $translation['slug'] ?? $translation['title'] ?? '';
        $slug = Str::slug((string) $slugSource);

        if ($slug === '' && $page) {
            return (string) $page->slug;
        }

        if ($slug === '') {
            return 'page-' . Str::random(8);
        }

        return $slug;
    }

    private function normalizeTags($value): ?array
    {
        if (is_array($value)) {
            return array_values(array_filter(array_map('trim', $value)));
        }

        if (is_string($value)) {
            return array_values(array_filter(array_map('trim', explode(',', $value))));
        }

        return null;
    }
}
