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
import { ArrowUpCircleIcon, ChevronUp, FileSliders, Home, KeyRound, ListChecks, MessageCircleQuestionIcon, ProjectorIcon, Settings, ShieldUser, Star, User2, UsersRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useLogout } from '@/hooks/useLoginMutation';

// Menu items.
const items = [
    {
        title: "Home",
        url: "/admin",
        icon: Home,
    },
    {
        title: "BMET Registrations",
        url: "/admin/bmet-registrations",
        icon: FileSliders,
    },
    {
        title: "Website Settings",
        url: "/admin/siteSettings",
        icon: Settings,
    },
    {
        title: "About",
        url: "/admin/whoWeAre",
        icon: UsersRound,
    },
    {
        title: "Staff",
        url: "/admin/staff",
        icon: ShieldUser ,
    },
    {
        title: "Testimonial",
        url: "/admin/testimonial",
        icon: Star,
    },
    {
        title: "Banner",
        url: "/admin/banner",
        icon: ProjectorIcon,
    },
    {
        title: "Key Impacts",
        url: "/admin/keyImpacts",
        icon: KeyRound,
    },
    {
        title: "Checklist",
        url: "/admin/checklist",
        icon: ListChecks,
    },
    {
        title: "FAQ",
        url: "/admin/faq",
        icon: MessageCircleQuestionIcon,
    },
]

const DashboardSidebar = () => {
    const { mutate: logout, isPending } = useLogout();
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
                                    const isActive = pathname === item.url

                                    // const isActive =
                                    // item.url === '/'
                                    //     ? pathname === '/'
                                    //     : pathname.startsWith(`${item.url}/`) || pathname === item.url;

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

                            {/* <div className='mb-auto'>
                                <SidebarMenu >
                                    Logout
                                </SidebarMenu>
                            </div> */}
                        </SidebarGroupContent>
                    </SidebarGroup >
                </SidebarContent>
                {/* Footer */}
                <SidebarFooter className='mb-2'>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        <User2 /> Username
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="w-[--radix-popper-anchor-width]"
                                >

                                    <DropdownMenuItem
                                        onClick={() => logout()}
                                        disabled={isPending}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md">
                                        <span>{isPending ? "Logging out..." : "Logout"}</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </div>
    );
};

export default DashboardSidebar;