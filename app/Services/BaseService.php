<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use App\Traits\HasSpecificationBuilder;
use Illuminate\Support\Facades\Log;

abstract class BaseService {
    use HasSpecificationBuilder;

    protected $request;
    protected $result;

    protected $repository;
    protected $model;
    protected $modelData = [];

    protected $modelTranslationData = [];
    protected $modelTranslation;

    // TTL cache (giây)
    protected int $cacheTTL;

    // Bật cache mặc định
    protected bool $useCache = true;

    public function __construct($repository) {
        $this->repository = $repository;
        $this->cacheTTL = config('cache.settings_ttl', 3600);
    }

    // ====== PUBLIC STATIC METHODS ======
    public static function noCache(): static
    {
        $instance = app(static::class);
        $instance->useCache = false;
        return $instance;
    }

    // ====== MAIN DATA METHODS ======
    public function getAll(array|Request $request = [])
    {
        $this->setRequest($this->normalizeRequest($request));
        $specification = $this->specificationBuilder();

        $cacheKey = $this->getCacheKey('getAll', $this->request->all());

        $queryFn = fn() => $this->repository->get($specification);

        if ($this->useCache) {
            $this->result = Cache::remember($cacheKey, $this->cacheTTL, $queryFn);
        } else {
            $this->result = $queryFn();
        }
        return $this->getResult();
    }

    public function getCount(array|Request $request = [])
    {
        $this->setRequest($this->normalizeRequest($request));
        $specification = $this->specificationBuilder();

        $cacheKey = $this->getCacheKey('getCount', $specification);

        $queryFn = fn() => $this->repository->getCount($specification);

        if ($this->useCache) {
            $this->result = Cache::remember($cacheKey, $this->cacheTTL, $queryFn);
        } else {
            $this->result = $queryFn();
        }

        return $this->getResult();
    }

    public function paginate(array|Request $request = [])
    {
        $this->setRequest($this->normalizeRequest($request));
        $specification = $this->specificationBuilder();
        $cacheKey = $this->getCacheKey('paginate', $specification);

        $queryFn = fn() => $this->repository->pagination($specification);

        // if ($this->useCache) {
        //     $this->result = Cache::remember($cacheKey, $this->cacheTTL, $queryFn);
        // } else {
        //     $this->result = $queryFn();
        // }
        $this->result = $queryFn();

        return $this->getResult();
    }

    public function find(int $id, array $with = [])
    {
        $cacheKey = $this->getCacheKey('find', [$id, $with]);

        $queryFn = fn() => $this->repository->find($id, $with);

        if ($this->useCache) {
            return Cache::remember($cacheKey, $this->cacheTTL, function () use ($queryFn) {
                $record = $queryFn();
                if (!$record) abort(404);
                return $record;
            });
        }

        $record = $queryFn();
        if (!$record) abort(404);
        return $record;
    }

    public function save(Request $request, ?int $id = null)
    {
        try {
            $result = $this->beginTransaction()
                ->setRequest($request)
                ->prepareModel()
                ->beforeSave()
                ->saveModel($id)
                ->saveTranslation()
                ->saveRelations()
                ->afterSave()
                ->commit()
                ->getResult();

            $this->flushCache(); // clear cache sau khi save/update

            return $result;
        } catch (\Throwable $th) {
            $this->rollBack();
            Log::error($th->getMessage());
            return false;
        }
    }

    public function destroy(int|string $id): bool
    {
        try {
            $deleted = $this->repository->delete($id);
            if ($deleted) {
                $this->flushCache(); // clear cache sau khi xoá
            }
            return (bool) $deleted;
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return false;
        }
    }
    // ====== INTERNAL HELPERS ======
    protected function prepareModel(): static
    {
        $this->modelData = $this->request->only($this->repository->getFillable());

        $translationReq = $this->request->only($this->repository->getTranslatable());
        $translations = array_merge(
            ['lang_code' => $this->request->input('translations.lang_code', 'vi')],
            $translationReq
        );

        $this->request->merge([
            'translations' => $translations,
        ]);

        foreach (array_keys($translationReq) as $key) {
            $this->request->offsetUnset($key);
        }

        return $this;
    }

    public function getResult() {
        return $this->result;
    }

    protected function saveModel(?int $id = null): static {
        $this->model = $id
            ? $this->repository->update($id, $this->modelData)
            : $this->repository->create($this->modelData);

        $this->result = $this->model;
        return $this;
    }

    protected function saveTranslation(): static {
        $relation = "translations";

        if ($this->request->has($relation)) {
            $this->model->{$relation}()->updateOrCreate(
                [
                    $this->repository->getModel()->getForeignKey() => $this->model->id,
                    'lang_code' => $this->request->input('translations.lang_code', app()->getLocale())
                ],
                array_merge(
                    $this->request->input('translations', []),
                    [
                        $this->repository->getModel()->getForeignKey() => $this->model->id,
                        'lang_code' => $this->request->input('translations.lang_code', app()->getLocale())
                    ]
                )
            );
        }

        return $this;
    }

    protected function saveRelations(): static {
        $relations = $this->repository->getModel()->relatables ?? [];
        foreach ($relations as $relation) {
            if ($this->request->has($relation)) {
                $type = $this->repository->getModel()->{$relation}() instanceof \Illuminate\Database\Eloquent\Relations\BelongsToMany ? 'many' : 'one';

                switch ($type) {
                    case 'many':
                        $this->model->{$relation}()->sync($this->request->input($relation, []));
                        break;
                    case 'one':
                        $this->model->{$relation}()->associate($this->request->input($relation));
                        $this->model->save();
                        break;
                }
            }
        }

        return $this;
    }

    protected function beforeSave(): static { return $this; }
    protected function afterSave(): static { return $this; }

    protected function setRequest(Request $request): static {
        $this->request = $request;
        return $this;
    }

    // ====== TRANSACTION HELPERS ======
    protected function beginTransaction() { DB::beginTransaction(); return $this; }
    protected function commit() { DB::commit(); return $this; }
    protected function rollBack() { DB::rollBack(); return $this; }

    // ====== CACHE HELPERS ======
    protected function getCacheKey(string $method, array $params = []): string {
        return sprintf(
            "%s.%s.%s",
            get_class($this->repository),
            $method,
            md5(json_encode($params)),
        );
    }

    protected function flushCache(): void {
        Cache::flush();
    }

    private function specificationBuilder(): array {
        return $this->buildSpecification($this->request);
    }

    private function normalizeRequest(array|Request $input = []): Request {
        return $input instanceof Request
            ? $input
            : new Request($input);
    }

    public function with(array $relations): static {
        $this->with = $relations;
        return $this;
    }
}
