<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserBalance extends Model
{
    protected $primaryKey = 'user_id';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'available_balance',
        'pending_balance',
        'lifetime_earned',
    ];

    protected function casts(): array
    {
        return [
            'available_balance' => 'decimal:2',
            'pending_balance'   => 'decimal:2',
            'lifetime_earned'   => 'decimal:2',
        ];
    }
}
