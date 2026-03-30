<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayoutRequestItem extends Model
{
    protected $fillable = [
        'payout_request_id',
        'ledger_id',
        'amount',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
        ];
    }
}
