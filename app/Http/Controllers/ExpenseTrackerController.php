<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ExpenseTrackerController extends Controller
{
    public function app(): Response
    {
        return Inertia::render('ExpenseTracker/App');
    }
}
