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
import { ArrowUpCircleIcon, Calendar, Home, Inbox, Settings } from 'lucide-react';
import Link from 'next/link';

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
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
]

const DashboardSidebar = () => {
    return (
        <div>
            <Sidebar>
                <SidebarHeader />
                <SidebarContent>
                    <SidebarGroup>
                        <Link href={`/`}>
                            <SidebarGroupLabel className='flex gap-2 items-center justify-center'>
                                <ArrowUpCircleIcon className="!h-6 !w-6" />
                                <span className="text-xl font-semibold">Acme Inc.</span>
                            </SidebarGroupLabel>
                        </Link>
                        <hr className='my-5 h-0.5 bg-slate-400' />
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url} className='my-1'>
                                                <item.icon className='!w-6 !h-6'/>
                                                <span className='text-xl'>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
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