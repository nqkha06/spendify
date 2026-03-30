<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait HasSpecificationBuilder
{
    protected $with = [];
    protected $searchable = [];
    protected $filterable = [];
    protected $sortable = [];
    protected $defaultPageSize = 10;
    protected $dateFilterable = ['created_at', 'updated_at'];

    // Allowed operators for filtering
    protected $allowedOperators = [
        'eq', '=', 'ne', '!=', 'gt', '>', 'gte', '>=',
        'lt', '<', 'lte', '<=', 'like', 'starts_with',
        'ends_with', 'in', 'not_in', 'between', 'null',
        'not_null', 'exists', 'not_exists', 'date_range', 'date_preset'
    ];

    protected function buildSpecification(Request $request): array
    {
        $keyword = $request->input('keyword');
        $parsedFilters = $this->parseFilters($request);
        $dateFilters = $this->parseDateFilters($request);
        $sortField = $request->input('sort_field');
        $sortOrder = $request->input('sort_order', 'asc');

        $status = $request->input('status', null);
        if ($status !== null && in_array('status', $this->filterable)) {
            $parsedFilters['simple']['status'] = $status;
        }

        return [
            'with' => $this->with,
            'search' => $keyword ? [
                'value'  => $keyword,
                'fields' => $this->searchable,
            ] : null,
            'filters' => [
                'simple' => array_filter($parsedFilters['simple'] ?? []),
                'complex' => array_filter($parsedFilters['complex'] ?? []),
                'date' => array_filter($dateFilters ?? [])
            ],
            'sort' => (in_array($sortField, $this->sortable))
                ? [$sortField, $sortOrder]
                : null,
            'pageSize' => (int) $request->input('per_page', $this->defaultPageSize),
        ];
    }

    /**
     * Parse complex filters from request
     * Handles formats like: user[gt]=1, date[gte]=2023-01-01, status[in]=active,pending
     */
    protected function parseFilters(Request $request): array
    {
        $filters = [
            'simple' => [],
            'complex' => []
        ];
        $allInputs = $request->all();
        foreach ($allInputs as $field => $value) {
            if (is_array($value) && !is_null($value) && $value !== '') {
                foreach ($value as $operator => $val) {
                    if (in_array($operator, $this->allowedOperators)) {
                        if (in_array($field, $this->filterable, true)) {
                            $filters['complex'][$field][$operator] = $val;
                        }
                    }
                }
            } else {
                if (in_array($field, $this->filterable, true) && !in_array($field, ['keyword', 'sort_field', 'sort_order', 'page', 'page_size'])) {
                    $filters['simple'][$field] = $value;
                }
            }
        }
        return $filters;
    }

    /**
     * Parse date filters from request
     * Supports formats like:
     * - date_range[created_at]=today
     * - date_range[created_at][preset]=this_week
     * - date_range[created_at][range][]=2024-01-01&date_range[created_at][range][]=2024-01-31
     */
    protected function parseDateFilters(Request $request): array
    {
        $dateFilters = [];
        foreach ($this->dateFilterable as $field) {
            $start = $request->input($field."_from");
            $end = $request->input($field."_to");
            if ($start || $end) {
                $dateFilters[$field] = [
                    'from' => $start,
                    'to' => $end
                ];
            }
        }
        return $dateFilters;
    }

    /**
     * Check if operator is valid
     */
    protected function isValidOperator(string $operator): bool
    {
        return in_array($operator, $this->allowedOperators, true) || is_numeric($operator);
    }
}
