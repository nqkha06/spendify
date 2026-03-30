<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayoutRequest extends Model
{
    protected $fillable = [
        'user_id',
        'payout_account_id',
        'amount',
        'currency',
        'fee',
        'net_amount',
        'status',
        'approved_at',
        'paid_at',
        'admin_note',
    ];

    protected function casts(): array
    {
        return [
            'amount'      => 'decimal:2',
            'fee'         => 'decimal:2',
            'net_amount'  => 'decimal:2',
            'approved_at' => 'datetime',
            'paid_at'     => 'datetime',
        ];
    }
}
