<?php

use App\Attributes\ListQueryConfig;
use App\Services\BaseService;
use Illuminate\Http\Request;

it('normalizes legacy list request keys for backward compatibility', function () {
    $repository = new class
    {
        public function get(array $specification = []): array
        {
            return $specification;
        }

        public function getCount(array $specification = []): int
        {
            return 0;
        }

        public function pagination(array $specification = []): array
        {
            return $specification;
        }

        public function getFillable(): array
        {
            return ['id', 'name', 'email', 'created_at'];
        }

        public function getTranslatable(): array
        {
            return [];
        }
    };

    $service = new #[ListQueryConfig(alias: 'users', searchable: ['name', 'email'], filterable: ['status'], sortable: ['name', 'created_at'], selectable: ['id', 'name', 'email', 'created_at'], relations: ['profile'], defaultSort: [['field' => 'created_at', 'direction' => 'desc']], dateField: 'created_at', maxLimit: 40, )] class($repository) extends BaseService
    {
        public function __construct($repository)
        {
            parent::__construct($repository);
        }
    };

    $request = new Request([
        'keyword' => 'john',
        'sort_by' => 'name',
        'sort_direction' => 'desc',
        'per_page' => 25,
        'include' => ['profile', 'invalid'],
        'fields' => ['id', 'name', 'not_allowed'],
    ]);

    $specification = $service->paginate($request);

    expect($specification['search']['value'])->toBe('john')
        ->and($specification['sort'])->toBe([
            ['field' => 'name', 'direction' => 'desc'],
        ])
        ->and($specification['pageSize'])->toBe(25)
        ->and($specification['with'])->toBe(['profile'])
        ->and($specification['select'])->toBe(['id', 'name']);
});
