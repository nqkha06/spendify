<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Click extends Model
{
    protected $fillable = [
        'click_id',
        'user_id',
        'merchant_id',
        'offer_id',
        'network_id',
        'landing_page',
        'out_url',
        'ip',
        'user_agent',
        'referrer',
        'country',
        'device_type',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_content',
        'utm_term',
        'session_id',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
