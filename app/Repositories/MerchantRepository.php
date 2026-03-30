<?php

namespace App\Repositories;

use App\Repositories\Contracts\MerchantRepositoryInterface;
use App\Repositories\BaseRepository;
use App\Models\Merchant;

class MerchantRepository extends BaseRepository implements MerchantRepositoryInterface
{
    protected $model;

    public function __construct(Merchant $model)
    {
        $this->model = $model;
    }
}
