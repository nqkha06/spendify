<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPayoutAccount extends Model
{
    protected $fillable = [
        'user_id',
        'payout_method_id',
        'details',
        'is_default',
    ];

    protected function casts(): array
    {
        return [
            'details'    => 'array',
            'is_default' => 'boolean',
        ];
    }
}
