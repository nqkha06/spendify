<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class UserSettingsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(): Response
    {
        $user = request()->user();

        return Inertia::render('User/Setting', [
            'preferences' => [
                'currency' => $user?->getMeta('currency', 'VND') ?? 'VND',
            ],
            'currencyOptions' => [
                ['code' => 'VND', 'label' => 'VND (₫)'],
                ['code' => 'USD', 'label' => 'USD ($)'],
                ['code' => 'EUR', 'label' => 'EUR (€)'],
                ['code' => 'GBP', 'label' => 'GBP (£)'],
            ],
        ]);
    }
}
