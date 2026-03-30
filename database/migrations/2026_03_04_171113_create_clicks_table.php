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
        Schema::create('clicks', function (Blueprint $table) {
            $table->id();
            $table->string('click_id')->unique();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('merchant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('offer_id')->nullable()->constrained('merchant_offers')->nullOnDelete();
            $table->foreignId('network_id')->constrained('affiliate_networks')->cascadeOnDelete();
            $table->text('landing_page')->nullable();
            $table->text('out_url')->nullable();
            $table->string('ip', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->text('referrer')->nullable();
            $table->string('country', 2)->nullable();
            $table->string('device_type')->nullable(); // desktop, mobile, tablet
            $table->string('utm_source')->nullable();
            $table->string('utm_medium')->nullable();
            $table->string('utm_campaign')->nullable();
            $table->string('utm_content')->nullable();
            $table->string('utm_term')->nullable();
            $table->string('session_id')->nullable();
            $table->timestamps();

            // Additional indexes
            $table->index(['user_id', 'created_at']);
            $table->index(['merchant_id', 'created_at']);
            $table->index(['network_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clicks');
    }
};
