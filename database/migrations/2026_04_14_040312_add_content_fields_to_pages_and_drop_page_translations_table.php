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
        Schema::table('pages', function (Blueprint $table) {
            $table->string('title')->nullable()->after('user_id');
            $table->longText('content')->nullable()->after('image');
            $table->string('meta_title')->nullable()->after('content');
            $table->text('meta_description')->nullable()->after('meta_title');
            $table->text('meta_keywords')->nullable()->after('meta_description');
        });

        if (Schema::hasTable('page_translations')) {
            $translations = DB::table('page_translations')
                ->orderBy('id')
                ->get()
                ->groupBy('page_id')
                ->map(static fn ($rows) => $rows->first());

            foreach ($translations as $translation) {
                DB::table('pages')
                    ->where('id', $translation->page_id)
                    ->update([
                        'title' => $translation->title,
                        'content' => $translation->content,
                        'meta_title' => $translation->meta_title,
                        'meta_description' => $translation->meta_description,
                        'meta_keywords' => $translation->meta_keywords,
                        'slug' => $translation->slug ?: DB::raw('slug'),
                    ]);
            }

            Schema::drop('page_translations');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('page_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained('pages')->cascadeOnDelete();
            $table->string('lang_code', 10);
            $table->string('title');
            $table->string('slug')->nullable();
            $table->longText('content')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->unique(['page_id', 'lang_code']);
            $table->unique(['lang_code', 'slug']);
        });

        Schema::table('pages', function (Blueprint $table) {
            $table->dropColumn([
                'title',
                'content',
                'meta_title',
                'meta_description',
                'meta_keywords',
            ]);
        });
    }
};
