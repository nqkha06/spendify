<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageTranslation extends Model
{
    public $timestamps = false;
    protected $table = 'page_translations';
    protected $fillable = [
        'lang_code',
        'page_id',
        'title',
        'content',
        'slug',
        'meta_title',
        'meta_description',
        'meta_keywords',
    ];

    public function page()
    {
        return $this->belongsTo(Page::class, 'page_id');
    }

}
