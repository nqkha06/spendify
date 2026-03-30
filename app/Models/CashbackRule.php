<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CashbackRule extends Model
{
    protected $fillable = [
        'merchant_id',
        'offer_id',
        'user_tier_id',
        'rate_type',
        'rate_value',
        'cap_amount',
        'min_sale_amount',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'rate_value'      => 'decimal:2',
            'cap_amount'      => 'decimal:2',
            'min_sale_amount' => 'decimal:2',
        ];
    }
}
