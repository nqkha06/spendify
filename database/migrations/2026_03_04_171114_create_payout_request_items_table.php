<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payout_request_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payout_request_id')->constrained()->cascadeOnDelete();
            $table->foreignId('ledger_id')->constrained('cashback_ledgers')->cascadeOnDelete();
            $table->decimal('amount', 12, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payout_request_items');
    }
};
