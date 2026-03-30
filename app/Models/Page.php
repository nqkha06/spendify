<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;
use App\Enums\BaseStatusEnum;

class Page extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'user_id',
        'image',
        'slug',
        'category_id',
        'tags',
        'status'
    ];
    protected $translatable = [
        'title',
        'content',
        'slug',
        'meta_title',
        'meta_description',
        'meta_keywords',
    ];
    protected $attributes = [
        'status' => BaseStatusEnum::DRAFT,
    ];
    protected $casts = [
        'status' => BaseStatusEnum::class,
        'tags' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function views()
    {
        return $this->hasMany(PageView::class, 'page_id');
    }
}
