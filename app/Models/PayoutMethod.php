<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayoutMethod extends Model
{
    protected $fillable = [
        'code',
        'name',
        'fields_schema',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'fields_schema' => 'array',
        ];
    }
}
