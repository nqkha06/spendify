<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CashbackController extends Controller
{
    public function index()
    {
        return Inertia::render('Member/Cashback', [
            'trendingStores' => [],
        ]);
    }
}
