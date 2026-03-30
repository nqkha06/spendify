import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AdminSidebar } from '@/components/admin-sidebar';
import { AdminHeader } from '@/components/admin-header';
import { Toaster } from '@/components/ui/sonner';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

interface AdminSidebarLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
}

export default function AdminSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<AdminSidebarLayoutProps>) {
    return (
        <AppShell variant="sidebar">
            <AdminSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AdminHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
            <Toaster />
        </AppShell>
    );
}
