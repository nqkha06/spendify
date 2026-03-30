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
        Schema::create('conversions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('network_id')->constrained('affiliate_networks')->cascadeOnDelete();
            $table->foreignId('merchant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('offer_id')->nullable()->constrained('merchant_offers')->nullOnDelete();
            $table->string('click_id')->nullable(); // Maps to clicks.click_id
            $table->string('network_txn_id');
            $table->string('order_id')->nullable();
            $table->string('event_type'); // pending, approved, rejected, paid, chargeback
            $table->decimal('sale_amount', 12, 2)->default(0);
            $table->string('currency', 3)->default('USD');
            $table->decimal('commission_amount', 12, 2)->default(0);
            $table->string('commission_currency', 3)->default('USD');
            $table->timestamp('occurred_at')->nullable();
            $table->timestamp('reported_at')->nullable();
            $table->json('raw_payload')->nullable();
            $table->timestamps();

            // Constraints and Indexes
            $table->unique(['network_id', 'network_txn_id']);
            $table->index('click_id');
            $table->index(['merchant_id', 'occurred_at']);
            $table->index(['event_type', 'reported_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conversions');
    }
};
