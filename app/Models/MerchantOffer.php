<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MerchantOffer extends Model
{
    protected $fillable = [
        'merchant_id',
        'network_id',
        'name',
        'tracking_type',
        'default_rate_type',
        'default_rate_value',
        'cookie_days',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'default_rate_value' => 'decimal:2',
            'cookie_days'        => 'integer',
        ];
    }
}
