import { useMemo, useState, type FormEventHandler } from 'react';
import AdminLayout from '@/layouts/admin';
import adminPages from '@/routes/admin/pages';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Language {
    id: number;
    name: string;
    code: string;
    locale: string;
    is_default: boolean;
}

interface PageTranslation {
    title?: string;
    slug?: string;
    content?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
}

interface PagePayload {
    id: number;
    slug?: string;
    image?: string | null;
    category_id?: number | null;
    tags?: string[] | string | null;
    status?: string;
    translations?: Record<string, PageTranslation>;
}

interface Props {
    page: PagePayload;
    languages: Language[];
    default_locale?: string;
}

const STATUS_OPTIONS = [
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'pending', label: 'Pending' },
];

export default function EditPage({ page, languages, default_locale }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pages', href: adminPages.index().url },
        { title: 'Edit', href: adminPages.edit(page.id).url },
    ];

    const fallbackLocale = useMemo(
        () => default_locale || languages.find((l) => l.is_default)?.code || languages[0]?.code || 'en',
        [default_locale, languages]
    );

    const emptyTranslations = useMemo(() => {
        const base: Record<string, PageTranslation> = {};
        languages.forEach((lang) => {
            base[lang.code] = {
                title: '',
                slug: '',
                content: '',
                meta_title: '',
                meta_description: '',
                meta_keywords: '',
            };
        });
        return base;
    }, [languages]);

    const initialTags = useMemo(() => {
        if (Array.isArray(page.tags)) return page.tags.join(', ');
        if (typeof page.tags === 'string') return page.tags;
        return '';
    }, [page.tags]);

    const { data, setData, put, processing, errors } = useForm({
        status: page.status || 'draft',
        image: page.image || '',
        tags: initialTags,
        translations: { ...emptyTranslations, ...(page.translations || {}) },
    });

    const [activeLocale, setActiveLocale] = useState<string>(fallbackLocale);

    const updateTranslation = (locale: string, field: keyof PageTranslation, value: string) => {
        setData('translations', {
            ...(data.translations || {}),
            [locale]: {
                ...(data.translations?.[locale] || emptyTranslations[locale]),
                [field]: value,
            },
        });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(adminPages.update(page.id).url);
    };

    const tErrors = (field: keyof PageTranslation) =>
        errors[`translations.${activeLocale}.${field}` as keyof typeof errors] as string | undefined;

    const current = data.translations?.[activeLocale] || emptyTranslations[activeLocale];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Page #${page.id}`} />
            <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Edit Page</h2>
                    <p className="text-muted-foreground">Update content, metadata, and status.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Page Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="grid gap-2">
                                    <Label>Status</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {STATUS_OPTIONS.map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-destructive">{errors.status as string}</p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="image">Image URL</Label>
                                    <Input
                                        id="image"
                                        value={data.image}
                                        onChange={(e) => setData('image', e.target.value)}
                                        placeholder="https://..."
                                    />
                                    {errors.image && (
                                        <p className="text-sm text-destructive">{errors.image as string}</p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="tags">Tags (comma separated)</Label>
                                    <Input
                                        id="tags"
                                        value={data.tags}
                                        onChange={(e) => setData('tags', e.target.value)}
                                    />
                                    {errors.tags && (
                                        <p className="text-sm text-destructive">{errors.tags as string}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                    <Label className="text-sm font-medium">Language</Label>
                                    <Select value={activeLocale} onValueChange={setActiveLocale}>
                                        <SelectTrigger className="w-full sm:w-60">
                                            <SelectValue placeholder="Choose language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {languages.map((lang) => (
                                                <SelectItem key={lang.code} value={lang.code}>
                                                    {lang.name} ({lang.code})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            value={current.title || ''}
                                            onChange={(e) => updateTranslation(activeLocale, 'title', e.target.value)}
                                            required
                                        />
                                        {tErrors('title') && (
                                            <p className="text-sm text-destructive">{tErrors('title')}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input
                                            id="slug"
                                            value={current.slug || ''}
                                            onChange={(e) => updateTranslation(activeLocale, 'slug', e.target.value)}
                                            placeholder="my-awesome-page"
                                        />
                                        {tErrors('slug') && (
                                            <p className="text-sm text-destructive">{tErrors('slug')}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2 grid gap-2">
                                        <Label htmlFor="content">Content</Label>
                                        <Textarea
                                            id="content"
                                            value={current.content || ''}
                                            onChange={(e) => updateTranslation(activeLocale, 'content', e.target.value)}
                                            rows={6}
                                        />
                                        {tErrors('content') && (
                                            <p className="text-sm text-destructive">{tErrors('content')}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="meta_title">Meta Title</Label>
                                        <Input
                                            id="meta_title"
                                            value={current.meta_title || ''}
                                            onChange={(e) => updateTranslation(activeLocale, 'meta_title', e.target.value)}
                                        />
                                        {tErrors('meta_title') && (
                                            <p className="text-sm text-destructive">{tErrors('meta_title')}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="meta_keywords">Meta Keywords</Label>
                                        <Input
                                            id="meta_keywords"
                                            value={current.meta_keywords || ''}
                                            onChange={(e) => updateTranslation(activeLocale, 'meta_keywords', e.target.value)}
                                        />
                                        {tErrors('meta_keywords') && (
                                            <p className="text-sm text-destructive">{tErrors('meta_keywords')}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2 grid gap-2">
                                        <Label htmlFor="meta_description">Meta Description</Label>
                                        <Textarea
                                            id="meta_description"
                                            value={current.meta_description || ''}
                                            onChange={(e) => updateTranslation(activeLocale, 'meta_description', e.target.value)}
                                            rows={4}
                                        />
                                        {tErrors('meta_description') && (
                                            <p className="text-sm text-destructive">{tErrors('meta_description')}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    Save Changes
                                </Button>
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
