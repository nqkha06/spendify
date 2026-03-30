<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AffiliateNetwork extends Model
{
    protected $fillable = [
        'name',
        'postback_secret',
        'timezone',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'status' => 'string',
        ];
    }
}
