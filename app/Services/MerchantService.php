<?php

namespace App\Services;

use App\Repositories\Contracts\MerchantRepositoryInterface as MerchantRepository;
use App\Services\BaseService;

class MerchantService extends BaseService
{
    protected $repository;

    protected $searchable = ['name', 'slug', 'id'];
    protected $filterable = ['status'];
    protected $sortable   = ['id', 'name', 'slug', 'status', 'created_at'];
    protected $with       = [];

    public function __construct(MerchantRepository $repository)
    {
        $this->repository = $repository;
        parent::__construct($repository);
    }
}
