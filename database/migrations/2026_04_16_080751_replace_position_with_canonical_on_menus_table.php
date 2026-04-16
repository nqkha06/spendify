<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasColumn('menus', 'canonical')) {
            Schema::table('menus', function (Blueprint $table) {
                $table->string('canonical', 80)->nullable()->after('parent_id');
            });
        }

        if (Schema::hasColumn('menus', 'position')) {
            DB::table('menus')
                ->where('position', 'header')
                ->update(['canonical' => 'home.header']);

            DB::table('menus')
                ->where('position', 'footer')
                ->update(['canonical' => 'home.footer']);

            try {
                Schema::table('menus', function (Blueprint $table) {
                    $table->dropIndex(['position', 'status']);
                });
            } catch (\Throwable $throwable) {
                // Index may not exist depending on historical schema state.
            }

            Schema::table('menus', function (Blueprint $table) {
                $table->dropColumn('position');
            });
        }

        DB::table('menus')
            ->whereNull('canonical')
            ->update(['canonical' => 'home.header']);

        try {
            Schema::table('menus', function (Blueprint $table) {
                $table->index(['canonical', 'status']);
            });
        } catch (\Throwable $throwable) {
            // Index already exists.
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasColumn('menus', 'position')) {
            Schema::table('menus', function (Blueprint $table) {
                $table->enum('position', ['header', 'footer'])->default('header')->after('parent_id');
            });
        }

        if (Schema::hasColumn('menus', 'canonical')) {
            DB::table('menus')
                ->where('canonical', 'home.footer')
                ->update(['position' => 'footer']);

            DB::table('menus')
                ->whereIn('canonical', ['home.header', 'user.header'])
                ->update(['position' => 'header']);

            try {
                Schema::table('menus', function (Blueprint $table) {
                    $table->dropIndex(['canonical', 'status']);
                });
            } catch (\Throwable $throwable) {
                // Index may not exist.
            }

            Schema::table('menus', function (Blueprint $table) {
                $table->dropColumn('canonical');
            });
        }

        DB::table('menus')
            ->whereNull('position')
            ->update(['position' => 'header']);

        try {
            Schema::table('menus', function (Blueprint $table) {
                $table->index(['position', 'status']);
            });
        } catch (\Throwable $throwable) {
            // Index already exists.
        }
    }
};
