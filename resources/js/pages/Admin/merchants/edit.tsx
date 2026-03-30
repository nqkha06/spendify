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

interface Merchant {
    id: number;
    name: string;
    slug: string;
    homepage_url: string | null;
    logo_url: string | null;
    status: string;
}

interface Props {
    merchant: Merchant;
}

export default function MerchantEdit({ merchant }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Merchants',
            href: adminMerchants.index().url,
        },
        {
            title: merchant.name,
            href: adminMerchants.edit(merchant.id).url,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: merchant.name,
        slug: merchant.slug,
        homepage_url: merchant.homepage_url ?? '',
        logo_url: merchant.logo_url ?? '',
        status: merchant.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(adminMerchants.update(merchant.id).url);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${merchant.name}`} />
            <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Edit Merchant</h2>
                    <p className="text-muted-foreground">
                        Update merchant information.
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
                                        onChange={(e) => setData('name', e.target.value)}
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
                                    Save Changes
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
