<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Merchant;
use App\Services\MerchantService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MerchantController extends Controller
{
    protected $service;

    public function __construct(MerchantService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sortBy        = $request->get('sort_by', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');

        $merchants = $this->service->paginate([
            'keyword' => $request->get('search', null),
        ]);

        return Inertia::render('Admin/merchants/list', [
            'merchants'  => $merchants->items(),
            'pagination' => [
                'current_page' => $merchants->currentPage(),
                'last_page'    => $merchants->lastPage(),
                'per_page'     => $merchants->perPage(),
                'total'        => $merchants->total(),
                'from'         => $merchants->firstItem(),
                'to'           => $merchants->lastItem(),
            ],
            'filters' => [
                'search'         => $request->search,
                'sort_by'        => $sortBy,
                'sort_direction' => $sortDirection,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/merchants/add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'slug'         => ['required', 'string', 'max:255', 'unique:merchants'],
            'homepage_url' => ['nullable', 'url', 'max:500'],
            'logo_url'     => ['nullable', 'url', 'max:500'],
            'status'       => ['required', 'in:active,inactive'],
        ]);

        Merchant::create($validated);

        return redirect()->route('admin.merchants.index')->with('success', 'Merchant created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Merchant $merchant)
    {
        return Inertia::render('Admin/merchants/edit', [
            'merchant' => $merchant,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Merchant $merchant)
    {
        $validated = $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'slug'         => ['required', 'string', 'max:255', 'unique:merchants,slug,' . $merchant->id],
            'homepage_url' => ['nullable', 'url', 'max:500'],
            'logo_url'     => ['nullable', 'url', 'max:500'],
            'status'       => ['required', 'in:active,inactive'],
        ]);

        $merchant->update($validated);

        return redirect()->route('admin.merchants.index')->with('success', 'Merchant updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Merchant $merchant)
    {
        $merchant->delete();

        return redirect()->route('admin.merchants.index')->with('success', 'Merchant deleted successfully.');
    }
}
