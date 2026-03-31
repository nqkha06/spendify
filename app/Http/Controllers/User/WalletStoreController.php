<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreWalletRequest;
use Illuminate\Http\RedirectResponse;

class WalletStoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreWalletRequest $request): RedirectResponse
    {
        $user = $request->user();

        $data = $request->validated();
        $isDefault = (bool) ($data['is_default'] ?? false);

        if ($user->wallets()->doesntExist()) {
            $isDefault = true;
        }

        if ($isDefault) {
            $user->wallets()->update(['is_default' => false]);
        }

        $user->wallets()->create([
            'name' => $data['name'],
            'currency' => strtoupper($data['currency']),
            'opening_balance' => (float) ($data['opening_balance'] ?? 0),
            'is_default' => $isDefault,
        ]);

        return redirect()->route('expense.wallets')
            ->with('success', 'Wallet created successfully.');
    }
}
