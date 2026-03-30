<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CashbackLedger extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'meta' => 'array',
        ];
    }
}
