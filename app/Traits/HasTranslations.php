<?php

namespace App\Traits;

trait HasTranslations
{
    public function __get($key)
    {
        // Nếu model gốc có mutator hoặc attribute khác null → lấy luôn
        if ($this->hasGetMutator($key) || $this->getAttributeValue($key) !== null) {
            return parent::__get($key);
        }

        // Lấy từ translation
        $translation = $this->translation();
        if ($translation && $translation->getAttribute($key) !== null) {

            return $translation->getAttribute($key);
        }

        return parent::__get($key);
    }

    public function translations()
    {
        $baseName = class_basename($this);
        $translationClass = 'App\\Models\\' . $baseName . 'Translation';

        return $this->hasMany($translationClass);
    }

    public function translation($locale = null)
    {
        $locale = $locale ?: app()->getLocale();

        $translations = $this->getRelationValue('translations');

        $record = null;

        if ($translations !== null) {
            $record = $translations->firstWhere('lang_code', $locale)
                ?? $translations->firstWhere('lang_code', 'vi');
        }

        if ($record) {
            return $record;
        } else {
            return null;
        }

        $fields = $this->getTranslatable();

        return ((object)array_fill_keys($fields, 12));
    }
    public function translate($locale = null)
    {
        $locale = $locale ?: app()->getLocale();

        $translations = $this->getRelationValue('translations');

        if ($translations !== null) {
            return $translations->firstWhere('lang_code', $locale)
                ?? $translations->firstWhere('lang_code', 'en');
        }

        // nếu chưa eager load thì trả null, không query thêm
        return null;
    }

    public function getTranslatable()
    {
        return property_exists($this, 'translatable') ? $this->translatable : [];
    }
}
