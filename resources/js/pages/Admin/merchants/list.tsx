import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/layouts/admin';
import adminMerchants from '@/routes/admin/merchants';
import type {BreadcrumbItem} from '@/types';
import { DeleteMerchantDialog } from './components/merchants-dialogs';
import { MerchantsPrimaryButtons } from './components/merchants-primary-buttons';

interface Merchant {
    id: number;
    name: string;
    slug: string;
    homepage_url: string | null;
    logo_url: string | null;
    status: string;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Merchants',
        href: adminMerchants.index().url,
    },
];

interface Props {
    merchants: Merchant[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: {
        search?: string;
        sort_by?: string;
        sort_direction?: 'asc' | 'desc';
    };
}

export default function MerchantList({ merchants = [], pagination, filters }: Props) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);

    const columns = [
        { id: 'name', label: 'Name', sortable: true },
        { id: 'slug', label: 'Slug', sortable: true },
        {
            id: 'status',
            label: 'Status',
            sortable: true,
            render: (merchant: Merchant) => (
                <Badge variant={merchant.status === 'active' ? 'default' : 'secondary'}>
                    {merchant.status}
                </Badge>
            ),
        },
        { id: 'created_at', label: 'Created At', sortable: true },
    ];

    const handleAdd = () => {
        router.visit(adminMerchants.create().url);
    };

    const handleEdit = (merchant: Merchant) => {
        router.visit(adminMerchants.edit(merchant.id).url);
    };

    const handleDelete = (merchant: Merchant) => {
        setSelectedMerchant(merchant);
        setIsDeleteOpen(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={breadcrumbs[0].title} />
            <div className='flex flex-1 flex-col gap-4 sm:gap-6 p-4'>
                <div className='flex flex-wrap items-end justify-between gap-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Merchants</h2>
                        <p className='text-muted-foreground'>
                            Manage your merchants and their settings here.
                        </p>
                    </div>
                    <MerchantsPrimaryButtons onAdd={handleAdd} />
                </div>

                <DataTable
                    data={merchants}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    pagination={pagination}
                    filters={filters}
                    baseUrl={adminMerchants.index().url}
                    advancedFilters={[
                        {
                            key: 'status',
                            label: 'Status',
                            type: 'select',
                            placeholder: 'All Statuses',
                            options: [
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                            ],
                        },
                    ]}
                />
            </div>

            <DeleteMerchantDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                merchant={selectedMerchant}
            />
        </AdminLayout>
    );
}
