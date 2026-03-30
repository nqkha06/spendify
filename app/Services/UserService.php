<?php

namespace App\Services;

use App\Repositories\Contracts\UserRepositoryInterface as UserRepository;
use App\Services\BaseService;
/**
 * Class UserService
 * @package App\Services
 */
class UserService extends BaseService {
    protected $repository;

    protected $searchable = ['name', 'email', 'id'];
    protected $filterable = ['status'];
    protected $sortable = ['id', 'name', 'email', 'created_at'];
    protected $with = [];

    public function __construct(UserRepository $repository) {
        $this->repository = $repository;
        parent::__construct($repository);
    }
}
