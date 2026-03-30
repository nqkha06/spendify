<?php

use App\Models\Category;
use App\Models\Page;
use App\Models\PageTranslation;
use App\Repositories\BaseRepository;
use App\Traits\HasSpecificationBuilder;
use Illuminate\Http\Request;

it('applies dynamic relation filters search and sorting', function () {
    $techCategory = Category::query()->create([
        'name' => 'Tech',
        'color' => '#111111',
        'status' => 'active',
    ]);

    $sportsCategory = Category::query()->create([
        'name' => 'Sports',
        'color' => '#222222',
        'status' => 'active',
    ]);

    $firstTechPage = Page::query()->create([
        'slug' => 'tech-breaking-1',
        'category_id' => $techCategory->id,
        'status' => 'published',
    ]);

    $secondTechPage = Page::query()->create([
        'slug' => 'tech-breaking-2',
        'category_id' => $techCategory->id,
        'status' => 'published',
    ]);

    $sportsPage = Page::query()->create([
        'slug' => 'sports-news',
        'category_id' => $sportsCategory->id,
        'status' => 'published',
    ]);

    PageTranslation::query()->create([
        'page_id' => $firstTechPage->id,
        'lang_code' => 'vi',
        'title' => 'Breaking technology update',
        'slug' => 'breaking-technology-update',
    ]);

    PageTranslation::query()->create([
        'page_id' => $secondTechPage->id,
        'lang_code' => 'vi',
        'title' => 'Breaking AI update',
        'slug' => 'breaking-ai-update',
    ]);

    PageTranslation::query()->create([
        'page_id' => $sportsPage->id,
        'lang_code' => 'vi',
        'title' => 'Match result',
        'slug' => 'match-result',
    ]);

    $repository = new BaseRepository(new Page);

    $result = $repository->pagination([
        'with' => ['category'],
        'search' => [
            'value' => 'Breaking',
            'fields' => ['translations.title'],
        ],
        'filters' => [
            'simple' => [
                'category.name' => 'Tech',
            ],
            'complex' => [],
            'date' => [],
        ],
        'sort' => [
            ['field' => 'category.name', 'direction' => 'asc'],
            ['field' => 'id', 'direction' => 'desc'],
        ],
        'pageSize' => 10,
    ]);

    expect($result->total())->toBe(2)
        ->and($result->items()[0]->id)->toBe($secondTechPage->id)
        ->and($result->items()[1]->id)->toBe($firstTechPage->id)
        ->and($result->items()[0]->relationLoaded('category'))->toBeTrue();
});

it('builds dynamic specification from request payload', function () {
    $builder = new class
    {
        use HasSpecificationBuilder;

        public function __construct()
        {
            $this->with = ['translations'];
            $this->includable = ['category'];
            $this->searchable = ['title', 'category.name'];
            $this->filterable = ['status', 'category.name'];
            $this->sortable = ['id', 'category.name'];
            $this->defaultSort = [['field' => 'id', 'direction' => 'desc']];
        }

        public function make(Request $request): array
        {
            return $this->buildSpecification($request);
        }
    };

    $request = new Request([
        'search' => 'alpha',
        'include' => 'category,invalid_relation',
        'filters' => [
            'status' => 'published',
            'category.name' => [
                'like' => 'Tech',
            ],
        ],
        'sort' => '-category.name,id',
        'per_page' => 500,
    ]);

    $specification = $builder->make($request);

    expect($specification['with'])->toBe(['translations', 'category'])
        ->and($specification['search']['value'])->toBe('alpha')
        ->and($specification['filters']['simple']['status'])->toBe('published')
        ->and($specification['filters']['complex']['category.name']['like'])->toBe('Tech')
        ->and($specification['sort'][0])->toBe([
            'field' => 'category.name',
            'direction' => 'desc',
        ])
        ->and($specification['sort'][1])->toBe([
            'field' => 'id',
            'direction' => 'asc',
        ])
        ->and($specification['pageSize'])->toBe(100);
});
