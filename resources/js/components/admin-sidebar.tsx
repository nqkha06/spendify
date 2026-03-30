import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import adminUsers from '@/routes/admin/users';
import adminPages from '@/routes/admin/pages';
import adminRoles from '@/routes/admin/roles';
import adminPermissions from '@/routes/admin/permissions';
import adminLanguages from '@/routes/admin/settings/languages';
import adminAppearance from '@/routes/admin/settings/appearance/options';
import adminMerchants from '@/routes/admin/merchants';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Folder, Users, Settings, AlertTriangle, Languages, Shield, Key } from 'lucide-react';
import AppLogo from '@/components/app-logo';

const adminNavItems: NavItem[] = [
    {
        title: 'Access Control',
        icon: Shield,
        children: [
            {
                title: 'Users',
                href: adminUsers.index().url,
                icon: Users,
            },
            {
                title: 'Roles',
                href: adminRoles.index().url,
                icon: Shield,
            },
            {
                title: 'Permissions',
                href: adminPermissions.index().url,
                icon: Key,
            }
        ]
    },
    {
        title: 'Merchants',
        href: adminMerchants.index().url,
        icon: Folder,
    },
    {
        title: 'Appearance',
        icon: Settings,
        children: [
            {
                title: 'Theme Options',
                href: adminAppearance.index().url,
                icon: Settings,
            },
            {
                title: 'Slider',
                href: '#',
                icon: Settings,
            }
        ],
    },
    // {
    //     title: 'Pages',
    //     href: adminPages.index().url,
    //     icon: Users,
    // },
    // {
    //     title: 'Settings',
    //     icon: Settings,
    //     children: [{
    //         title: 'Languages',
    //         href: adminLanguages.index().url,
    //         icon: Languages,
    //     }],
    // },


];


export function AdminSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={adminUsers.index().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={adminNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
