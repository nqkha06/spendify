<?php

use App\Http\Controllers\Admin\Appearance\OptionController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\MerchantController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\Settings\LanguageController;
use App\Http\Controllers\Admin\SlideController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\User\CategoryListController;
use App\Http\Controllers\User\ExpenseBudgetsController;
use App\Http\Controllers\User\ExpenseDashboardController;
use App\Http\Controllers\User\ExpenseHomeController;
use App\Http\Controllers\User\ExpenseSettingsController;
use App\Http\Controllers\User\ExpenseTransactionsController;
use App\Http\Controllers\User\ExpenseWalletsController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'Index', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::prefix('user')->name('expense.')->group(function () {
    Route::get('/', ExpenseHomeController::class)->name('home');
    Route::get('/dashboard', ExpenseDashboardController::class)->name('dashboard');
    Route::get('/transactions', ExpenseTransactionsController::class)->name('transactions');
    Route::get('/budgets', ExpenseBudgetsController::class)->name('budgets');
    Route::get('/wallets', ExpenseWalletsController::class)->name('wallets');
    Route::get('/settings', ExpenseSettingsController::class)->name('settings');
    Route::get('/categories', CategoryListController::class)->name('categories.index');
});

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('pages', PageController::class);
    Route::resource('users', UserController::class);
    Route::resource('merchants', MerchantController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('permissions', PermissionController::class);
    Route::resource('posts', PostController::class);
    Route::resource('slides', SlideController::class);

    Route::prefix('settings')->name('settings.')->group(function () {
        Route::resource('languages', LanguageController::class);
        Route::get('appearance/options', [OptionController::class, 'index'])->name('appearance.options.index');
        Route::post('appearance/options', [OptionController::class, 'store'])->name('appearance.options.store');
    });
});

require __DIR__.'/settings.php';
