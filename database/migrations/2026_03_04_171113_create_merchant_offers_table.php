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
        Schema::create('merchant_offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('merchant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('network_id')->constrained('affiliate_networks')->cascadeOnDelete();
            $table->string('name');
            $table->string('tracking_type')->default('cps'); // cps/cpa/cpl
            $table->string('default_rate_type')->default('percent'); // percent/fixed
            $table->decimal('default_rate_value', 10, 2)->default(0);
            $table->integer('cookie_days')->default(30);
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchant_offers');
    }
};
