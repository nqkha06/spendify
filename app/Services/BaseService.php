<?php

namespace App\Services;

use App\Traits\HasSpecificationBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

abstract class BaseService
{
    use HasSpecificationBuilder;

    protected $request;

    protected $result;

    protected $repository;

    protected $model;

    protected $modelData = [];

    protected $modelTranslationData = [];

    protected $modelTranslation;

    public function __construct($repository)
    {
        $this->repository = $repository;
    }

    // ====== MAIN DATA METHODS ======
    public function getAll(array|Request $request = [])
    {
        $this->setRequest($this->normalizeRequest($request));
        $specification = $this->specificationBuilder();

        $this->result = $this->repository->get($specification);

        return $this->getResult();
    }

    public function getCount(array|Request $request = [])
    {
        $this->setRequest($this->normalizeRequest($request));
        $specification = $this->specificationBuilder();

        $this->result = $this->repository->getCount($specification);

        return $this->getResult();
    }

    public function paginate(array|Request $request = [])
    {
        $this->setRequest($this->normalizeRequest($request));
        $specification = $this->specificationBuilder();

        $this->result = $this->repository->pagination($specification);

        return $this->getResult();
    }

    public function find(int $id, array $with = [])
    {
        $record = $this->repository->find($id, $with);
        if (! $record) {
            abort(404);
        }

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

    public function getResult()
    {
        return $this->result;
    }

    protected function saveModel(?int $id = null): static
    {
        $this->model = $id
            ? $this->repository->update($id, $this->modelData)
            : $this->repository->create($this->modelData);

        $this->result = $this->model;

        return $this;
    }

    protected function saveTranslation(): static
    {
        $relation = 'translations';

        if ($this->request->has($relation)) {
            $this->model->{$relation}()->updateOrCreate(
                [
                    $this->repository->getModel()->getForeignKey() => $this->model->id,
                    'lang_code' => $this->request->input('translations.lang_code', app()->getLocale()),
                ],
                array_merge(
                    $this->request->input('translations', []),
                    [
                        $this->repository->getModel()->getForeignKey() => $this->model->id,
                        'lang_code' => $this->request->input('translations.lang_code', app()->getLocale()),
                    ]
                )
            );
        }

        return $this;
    }

    protected function saveRelations(): static
    {
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

    protected function beforeSave(): static
    {
        return $this;
    }

    protected function afterSave(): static
    {
        return $this;
    }

    protected function setRequest(Request $request): static
    {
        $this->request = $request;

        return $this;
    }

    // ====== TRANSACTION HELPERS ======
    protected function beginTransaction()
    {
        DB::beginTransaction();

        return $this;
    }

    protected function commit()
    {
        DB::commit();

        return $this;
    }

    protected function rollBack()
    {
        DB::rollBack();

        return $this;
    }

    private function specificationBuilder(): array
    {
        return $this->buildSpecification($this->request);
    }

    private function normalizeRequest(array|Request $input = []): Request
    {
        return $input instanceof Request
            ? $input
            : new Request($input);
    }

    public function with(array $relations): static
    {
        $this->with = $relations;

        return $this;
    }
}
