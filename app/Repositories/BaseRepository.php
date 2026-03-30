<?php

namespace App\Repositories;

use App\Repositories\Contracts\BaseRepositoryInterface;
use App\Traits\Queryable;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

/**
 * Class BaseRepository
 * @package App\Repositories
 */
class BaseRepository implements BaseRepositoryInterface
{
    use Queryable;

    protected $model;

    public function __construct(
        Model $model
    ) {
        $this->model = $model;
    }

    public function getModel(): Model
    {
        return $this->model;
    }

    public function create(array $payload = [])
    {
        $model = $this->model->create($payload);
        return $model->fresh();
    }

    public function update(int $id = 0, array $payload = [])
    {
        $model = $this->find($id);
        if (!$model) {
            return null;
        }
        $model->update($payload);
        return $model;
    }


    public function delete(int $id = 0)
    {
        return $this->find($id)->delete();
    }

    public function forceDelete(int $id): bool
    {
        $record = $this->model->withTrashed()->find($id);
        if ($record) {
            return $record->forceDelete();
        }
        return false;
    }

    public function createPivot($model, array $payload = [], string $relation = '')
    {
        return $model->{$relation}()->attach($model->id, $payload);
    }

    public function query()
    {
        return $this->model;
    }
    public function getFillable()
    {
        return $this->model->getFillable();
    }
    public function getTranslatable()
    {
        $translatable = property_exists($this->model, 'translatable') ? $this->model->getTranslatable() : [];
        return $translatable;
    }
    public function updateOrCreate(array $condition = [], array $payload = [])
    {
        return $this->model->updateOrCreate($condition, $payload);
    }

    public function pagination(array $specification = [])
    {
        $query = $this->getQuery();

        // Eager load
        if (!empty($specification['with'])) {
            $query->with($specification['with']);
        }

        // Search
        if (!empty($specification['search']['value']) && !empty($specification['search']['fields'])) {
            $keyword = $specification['search']['value'];
            $fields  = $specification['search']['fields'];
            $query->where(function ($q) use ($keyword, $fields) {
                foreach ($fields as $field) {
                    if (in_array($field, $this->getFillable())) {

                        $q->orWhere($field, 'like', '%' . $keyword . '%');
                        // if (true) { //is multilingual
                        //     $q->orWhereHas('translations', function ($qt) use ($field, $keyword) {
                        //         $qt->where($field, 'like', '%' . $keyword . '%');
                        //     });

                        // }
                    }
                    if (in_array($field, $this->getTranslatable())) {
                        $q->orWhereHas('translations', function ($qt) use ($field, $keyword) {
                            $qt->where($field, 'like', '%' . $keyword . '%');
                        });
                    }
                }
            });
        }

        // Filters
        if (!empty($specification['filters'])) {
            // Simple filters
            if (!empty($specification['filters']['simple'])) {
                foreach ($specification['filters']['simple'] as $field => $value) {
                    if ($value !== null && in_array($field, $this->getFillable())) {
                        $query->where($field, $value);
                    }
                }
            }

            // Date filters
            if (!empty($specification['filters']['date'])) {
                foreach ($specification['filters']['date'] as $field => $dateFilter) {
                    $query->whereBetween($field, [
                        Carbon::parse($dateFilter['from'])->startOfDay(),
                        Carbon::parse($dateFilter['to'])->endOfDay()
                    ]);
                }
            }

            // Complex filters (vd: gt, lt, gte, lte, like, between,...)
            if (!empty($specification['filters']['complex'])) {
                foreach ($specification['filters']['complex'] as $field => $conditions) {
                    if (is_array($conditions) && in_array($field, $this->getFillable())) {
                        foreach ($conditions as $operator => $val) {
                            if($val === null) {
                                continue;
                            }
                            $operator = strtolower(trim($operator));
                            switch ($operator) {
                                case 'gt':
                                    $query->where($field, '>', $val);
                                    break;
                                case 'lt':
                                    $query->where($field, '<', $val);
                                    break;
                                case 'gte':
                                    $query->where($field, '>=', $val);
                                    break;
                                case 'lte':
                                    $query->where($field, '<=', $val);
                                    break;
                                case 'ne':
                                    $query->where($field, '<>', $val);
                                    break;
                                case 'like':
                                    $query->where($field, 'like', "%{$val}%");
                                    break;
                                case 'between':
                                    if (is_array($val) && count($val) === 2) {
                                        $query->whereBetween($field, $val);
                                    }
                                    break;

                                default: // fallback
                                    $query->where($field, $val);
                            }
                        }
                    }
                }
            }
        }

        // Sort
        if (!empty($specification['sort']) && is_array($specification['sort'])) {
            $field = $specification['sort'][0];
            $direction = $specification['sort'][1];
            // if (in_array($field, $this->getFillable())) {
            //     $query->orderBy($field, $direction);
            // }
            $query->orderBy($field, $direction);

        } else {
            $query->orderBy('id', 'desc');
        }

        // Paginate
        return $query->paginate($specification['pageSize'] ?? 10)->withQueryString();
    }

    public function get(array $specification = [])
    {
        $query = $this->getQuery();

        if (!empty($specification['with'])) {
            $query->with($specification['with']);
        }

        if (!empty($specification['search']['value']) && !empty($specification['search']['fields'])) {
            $keyword = $specification['search']['value'];
            $fields  = $specification['search']['fields'];

            $query->where(function ($q) use ($keyword, $fields) {
                foreach ($fields as $field) {
                    if (in_array($field, $this->getFillable())) {
                        $q->orWhere($field, 'like', '%' . $keyword . '%');
                    }
                }
            });
        }

        if (!empty($specification['filters'])) {
            if (!empty($specification['filters']['simple'])) {
                foreach ($specification['filters']['simple'] as $field => $value) {
                    if ($value !== null && in_array($field, $this->getFillable())) {
                        $query->where($field, $value);
                    }
                }
            }

            // Date filters
            if (!empty($specification['filters']['date'])) {
                foreach ($specification['filters']['date'] as $field => $dateFilter) {
                    $query->whereBeetween($field, [
                        Carbon::parse($dateFilter['from'])->startOfDay(),
                        Carbon::parse($dateFilter['to'])->endOfDay()
                    ]);
                }
            }

            if (!empty($specification['filters']['complex'])) {
                foreach ($specification['filters']['complex'] as $field => $conditions) {
                    if (is_array($conditions) && in_array($field, $this->getFillable())) {
                        foreach ($conditions as $operator => $val) {
                            $operator = strtolower(trim($operator));
                            switch ($operator) {
                                case 'gt':
                                    $query->where($field, '>', $val);
                                    break;
                                case 'lt':
                                    $query->where($field, '<', $val);
                                    break;
                                case 'gte':
                                    $query->where($field, '>=', $val);
                                    break;
                                case 'lte':
                                    $query->where($field, '<=', $val);
                                    break;
                                case 'ne':
                                    $query->where($field, '<>', $val);
                                    break;
                                case 'like':
                                    $query->where($field, 'like', "%{$val}%");
                                    break;
                                case 'between':
                                    if (is_array($val) && count($val) === 2) {
                                        $query->whereBetween($field, $val);
                                    }
                                    break;
                                default:
                                    $query->where($field, $val);
                            }
                        }
                    }
                }
            }
        }

        if (!empty($specification['sort']) && is_array($specification['sort'])) {
            foreach ($specification['sort'] as $field => $direction) {
                if (in_array($field, $this->getFillable())) {
                    $query->orderBy($field, $direction);
                }
            }
        } else {
            $query->orderBy('id', 'desc');
        }

        return $query->get();
    }

    public function getCount(array $specification = [])
    {
        $query = $this->getQuery();

        if (!empty($specification['with'])) {
            $query->with($specification['with']);
        }

        if (!empty($specification['search']['value']) && !empty($specification['search']['fields'])) {
            $keyword = $specification['search']['value'];
            $fields  = $specification['search']['fields'];

            $query->where(function ($q) use ($keyword, $fields) {
                foreach ($fields as $field) {
                    if (in_array($field, $this->getFillable())) {
                        $q->orWhere($field, 'like', '%' . $keyword . '%');
                    }
                }
            });
        }

        if (!empty($specification['filters'])) {
            if (!empty($specification['filters']['simple'])) {
                foreach ($specification['filters']['simple'] as $field => $value) {
                    if ($value !== null && in_array($field, $this->getFillable())) {
                        $query->where($field, $value);
                    }
                }
            }

            // Date filters
            if (!empty($specification['filters']['date'])) {
                foreach ($specification['filters']['date'] as $field => $dateFilter) {
                    $query->whereBetween($field, [
                        Carbon::parse($dateFilter['from'])->startOfDay(),
                        Carbon::parse($dateFilter['to'])->endOfDay()
                    ]);
                }
            }

            if (!empty($specification['filters']['complex'])) {
                foreach ($specification['filters']['complex'] as $field => $conditions) {
                    if (is_array($conditions) && in_array($field, $this->getFillable())) {
                        foreach ($conditions as $operator => $val) {
                            $operator = strtolower(trim($operator));
                            switch ($operator) {
                                case 'gt':
                                    $query->where($field, '>', $val);
                                    break;
                                case 'lt':
                                    $query->where($field, '<', $val);
                                    break;
                                case 'gte':
                                    $query->where($field, '>=', $val);
                                    break;
                                case 'lte':
                                    $query->where($field, '<=', $val);
                                    break;
                                case 'ne':
                                    $query->where($field, '<>', $val);
                                    break;
                                case 'like':
                                    $query->where($field, 'like', "%{$val}%");
                                    break;
                                case 'between':
                                    if (is_array($val) && count($val) === 2) {
                                        $query->whereBetween($field, $val);
                                    }
                                    break;

                                default:
                                    $query->where($field, $val);
                            }
                        }
                    }
                }
            }
        }

        if (!empty($specification['sort']) && is_array($specification['sort'])) {
            foreach ($specification['sort'] as $field => $direction) {
                if (in_array($field, $this->getFillable())) {
                    $query->orderBy($field, $direction);
                }
            }
        } else {
            $query->orderBy('id', 'desc');
        }

        return $query->count();
    }
}
