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
        Schema::create('payout_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('payout_account_id')->constrained('user_payout_accounts')->cascadeOnDelete();
            $table->decimal('amount', 12, 2);
            $table->string('currency', 3)->default('USD');
            $table->decimal('fee', 12, 2)->default(0);
            $table->decimal('net_amount', 12, 2);
            $table->string('status')->default('pending'); // pending, approved, rejected, paid, canceled
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->text('admin_note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payout_requests');
    }
};
