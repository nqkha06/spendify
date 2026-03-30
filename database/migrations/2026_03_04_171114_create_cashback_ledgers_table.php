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
        Schema::create('cashback_ledgers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('conversion_id')->nullable()->constrained()->nullOnDelete();
            $table->string('type'); // pending, approve, reject, adjust_plus, adjust_minus, payout_hold, payout_release, payout_paid, referral_bonus
            $table->decimal('amount', 12, 2)->default(0); // Absolute positive value
            $table->string('currency', 3)->default('USD');
            $table->string('direction'); // credit or debit
            $table->string('status')->default('valid'); // valid or void
            $table->text('note')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'created_at']);
            $table->index('conversion_id');
            $table->index(['type', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cashback_ledgers');
    }
};
