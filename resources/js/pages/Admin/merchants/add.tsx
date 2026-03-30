import AdminLayout from '@/layouts/admin';
import adminMerchants from '@/routes/admin/merchants';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Merchants',
        href: adminMerchants.index().url,
    },
    {
        title: 'Create',
        href: adminMerchants.create().url,
    },
];

export default function MerchantAdd() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        homepage_url: '',
        logo_url: '',
        status: 'active',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(adminMerchants.store().url);
    };

    // Auto-generate slug from name
    const handleNameChange = (value: string) => {
        setData('name', value);
        if (!data.slug || data.slug === data.name.toLowerCase().replace(/\s+/g, '-')) {
            setData('slug', value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
        }
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Merchant" />
            <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Create Merchant</h2>
                    <p className="text-muted-foreground">
                        Add a new merchant to the system.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Merchant Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                        placeholder="e.g. Shopee"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="e.g. shopee"
                                        required
                                    />
                                    {errors.slug && (
                                        <p className="text-sm text-destructive">{errors.slug}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="homepage_url">Homepage URL</Label>
                                    <Input
                                        id="homepage_url"
                                        type="url"
                                        value={data.homepage_url}
                                        onChange={(e) => setData('homepage_url', e.target.value)}
                                        placeholder="https://example.com"
                                    />
                                    {errors.homepage_url && (
                                        <p className="text-sm text-destructive">{errors.homepage_url}</p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="logo_url">Logo URL</Label>
                                    <Input
                                        id="logo_url"
                                        type="url"
                                        value={data.logo_url}
                                        onChange={(e) => setData('logo_url', e.target.value)}
                                        placeholder="https://example.com/logo.png"
                                    />
                                    {errors.logo_url && (
                                        <p className="text-sm text-destructive">{errors.logo_url}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-2 max-w-xs">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) => setData('status', value)}
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-destructive">{errors.status}</p>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    Create Merchant
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
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
