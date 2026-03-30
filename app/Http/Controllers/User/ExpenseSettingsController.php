<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ExpenseSettingsController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('ExpenseTracker/App');
    }
}
