"use client"

import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ArrowUpCircleIcon, Calendar, CircleHelp, Home, Inbox, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Menu items.
const items = [
    {
        title: "Home",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Website Settings",
        url: "/admin/siteSettings",
        icon: Settings,
    },
    {
        title: "Who We Are",
        url: "/admin/whoWeAre",
        icon: CircleHelp,
    },
]

const DashboardSidebar = () => {

    const pathname = usePathname();

    return (
        <div>
            <Sidebar>
                <SidebarHeader />
                <SidebarContent>
                    <SidebarGroup>
                        <Link href={`/admin`}>
                            <SidebarGroupLabel className='flex gap-2 items-center justify-center'>
                                <ArrowUpCircleIcon className="!h-6 !w-6 text-black" />
                                <span className="text-xl font-semibold text-black">Probashi Sheba</span>
                            </SidebarGroupLabel>
                        </Link>
                        <hr className='my-5 h-0.5 bg-slate-400' />
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => {
                                    const isActive = pathname === item.url;

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild={false}
                                                className={`my-1 py-5
                                                ${isActive
                                                        ? 'bg-darkGreen text-white hover:bg-darkGreen hover:text-lightGreen'
                                                        : 'hover:bg-darkGreen hover:text-lightGreen dark:hover:bg-darkGreen'
                                                    }`}
                                            >
                                                <Link href={item.url} className="w-full flex items-center gap-2">
                                                    <item.icon className='!w-6 !h-6' />
                                                    <span className='text-xl'>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup >
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
        </div>
    );
};

export default DashboardSidebar;