import { Head, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin';
import adminPages from '@/routes/admin/pages';
import type { BreadcrumbItem } from '@/types';

const STATUS_OPTIONS = [
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'pending', label: 'Pending' },
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pages', href: adminPages.index().url },
    { title: 'Create', href: adminPages.create().url },
];

export default function CreatePage() {
    const { data, setData, post, processing, errors } = useForm({
        status: 'draft',
        title: '',
        slug: '',
        image: '',
        content: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        tags: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(adminPages.store().url);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Page" />
            <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6">
                <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Create Page</h2>
                        <p className="text-muted-foreground">Add a new page.</p>
                    </div>
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
                                            {STATUS_OPTIONS.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-sm text-destructive">{errors.status as string}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                    {errors.title && <p className="text-sm text-destructive">{errors.title as string}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="my-awesome-page"
                                    />
                                    {errors.slug && <p className="text-sm text-destructive">{errors.slug as string}</p>}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="image">Image URL</Label>
                                    <Input
                                        id="image"
                                        value={data.image}
                                        onChange={(e) => setData('image', e.target.value)}
                                        placeholder="https://..."
                                    />
                                    {errors.image && <p className="text-sm text-destructive">{errors.image as string}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="tags">Tags (comma separated)</Label>
                                    <Input
                                        id="tags"
                                        value={data.tags}
                                        onChange={(e) => setData('tags', e.target.value)}
                                        placeholder="news, releases"
                                    />
                                    {errors.tags && <p className="text-sm text-destructive">{errors.tags as string}</p>}
                                </div>

                                <div className="md:col-span-2 grid gap-2">
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        rows={6}
                                    />
                                    {errors.content && <p className="text-sm text-destructive">{errors.content as string}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="meta_title">Meta Title</Label>
                                    <Input
                                        id="meta_title"
                                        value={data.meta_title}
                                        onChange={(e) => setData('meta_title', e.target.value)}
                                    />
                                    {errors.meta_title && <p className="text-sm text-destructive">{errors.meta_title as string}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="meta_keywords">Meta Keywords</Label>
                                    <Input
                                        id="meta_keywords"
                                        value={data.meta_keywords}
                                        onChange={(e) => setData('meta_keywords', e.target.value)}
                                        placeholder="seo, marketing"
                                    />
                                    {errors.meta_keywords && <p className="text-sm text-destructive">{errors.meta_keywords as string}</p>}
                                </div>

                                <div className="md:col-span-2 grid gap-2">
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Textarea
                                        id="meta_description"
                                        value={data.meta_description}
                                        onChange={(e) => setData('meta_description', e.target.value)}
                                        rows={4}
                                    />
                                    {errors.meta_description && (
                                        <p className="text-sm text-destructive">{errors.meta_description as string}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    Create Page
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
