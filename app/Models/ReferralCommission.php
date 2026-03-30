<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReferralCommission extends Model
{
    protected $fillable = [
        'referrer_user_id',
        'referred_user_id',
        'conversion_id',
        'amount',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
        ];
    }
}
