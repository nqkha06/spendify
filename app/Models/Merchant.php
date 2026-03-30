<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Merchant extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'homepage_url',
        'logo_url',
        'status',
    ];
}
