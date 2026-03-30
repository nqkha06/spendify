<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Merchant;
use Inertia\Inertia;

class CashbackController extends Controller
{
    public function index()
    {
        $trendingStores = Merchant::where('status', 'active')
            ->latest()
            ->limit(8)
            ->get(['id', 'name', 'slug', 'logo_url', 'homepage_url']);

        return Inertia::render('Member/Cashback', [
            'trendingStores' => $trendingStores,
        ]);
    }
}
