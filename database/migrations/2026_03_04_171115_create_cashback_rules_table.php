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
        Schema::create('cashback_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('merchant_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('offer_id')->nullable()->constrained('merchant_offers')->cascadeOnDelete();
            $table->unsignedBigInteger('user_tier_id')->nullable(); // Can be constrained later if UserTier model exists
            $table->string('rate_type')->default('percent'); // percent/fixed
            $table->decimal('rate_value', 10, 2)->default(0);
            $table->decimal('cap_amount', 12, 2)->nullable();
            $table->decimal('min_sale_amount', 12, 2)->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cashback_rules');
    }
};
