"use client"

import React, { useState } from 'react';
import {
    WebsiteSidebar,
    WebsiteSidebarContent,
    WebsiteSidebarFooter,
    WebsiteSidebarGroup,
    WebsiteSidebarHeader,
    WebsiteSidebarGroupContent,
    WebsiteSidebarGroupLabel,
    WebsiteSidebarMenu,
    WebsiteSidebarMenuButton,
    WebsiteSidebarMenuItem,
} from "@/components/WebsiteSidebar/WebsiteSidebar"
import { ArrowUpCircleIcon, ChevronDown, ChevronUp, Home, User2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Services",
        url: "#services",
        subItems: [
            {
                title: "Recruitment",
                url: "#recruitment"
            },
            {
                title: "Foreign Employers",
                url: "#foreign-employers"
            },
            {
                title: "Local Employers",
                url: "#local-employers"
            },
            {
                title: "Training Institute",
                url: "#training-institute"
            }
        ]
    },
    {
        title: "Government",
        url: "#government",
    },
    {
        title: "Portals",
        url: "#portals",
    },
    {
        title: "Download Cards",
        url: "#download-cards",
    },
]

const WebsiteSidebarItem = () => {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleItem = (title: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    const isSubItemActive = (subItems: any[]) => {
        return subItems.some(subItem => pathname.includes(subItem.url));
    };

    return (
        <div>
            <WebsiteSidebar className="bg-white text-black">
                <WebsiteSidebarHeader />
                <WebsiteSidebarContent>
                    <WebsiteSidebarGroup>
                        <Link href={`/admin`}>
                            <WebsiteSidebarGroupLabel className='flex gap-2 items-center justify-center py-4'>
                                <ArrowUpCircleIcon className="!h-6 !w-6 text-black" />
                                <span className="text-xl font-semibold text-black">Probashi Sheba</span>
                            </WebsiteSidebarGroupLabel>
                        </Link>
                        <hr className='my-2 h-0.5 bg-gray-200' />
                        <WebsiteSidebarGroupContent>
                            <WebsiteSidebarMenu>
                                {items.map((item) => {
                                    const isActive = pathname.includes(item.url);
                                    //const Icon = item.icon;
                                    const hasSubItems = item.subItems && item.subItems.length > 0;
                                    const isExpanded = expandedItems[item.title];
                                    const isSubActive = hasSubItems && isSubItemActive(item.subItems);

                                    return (
                                        <React.Fragment key={item.title}>
                                            <WebsiteSidebarMenuItem>
                                                {hasSubItems ? (
                                                    <button
                                                        onClick={() => toggleItem(item.title)}
                                                        className={`w-full px-4 py-3 rounded-none flex items-center gap-3
                                                            ${isActive || isSubActive || isExpanded
                                                                ? 'text-darkGreen text-xl'
                                                                : 'hover:bg-gray-100 text-base'
                                                            }`}
                                                    >
                                                        {/* {Icon && <Icon className='!w-5 !h-5' />} */}
                                                        <span className='flex-1 text-left'>{item.title}</span>
                                                        {isExpanded ? (
                                                            <ChevronUp className="!w-5 !h-5" />
                                                        ) : (
                                                            <ChevronDown className="!w-5 !h-5" />
                                                        )}
                                                    </button>
                                                ) : (
                                                    <WebsiteSidebarMenuButton
                                                        asChild={false}
                                                        className={`px-4 py-3 rounded-none
                                                            ${isActive
                                                                ? 'text-darkGreen'
                                                                : 'hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        <Link href={item.url} className="w-full flex items-center gap-3">
                                                            {/* {Icon && <Icon className='!w-5 !h-5' />} */}
                                                            <span className='text-base'>{item.title}</span>
                                                        </Link>
                                                    </WebsiteSidebarMenuButton>
                                                )}
                                            </WebsiteSidebarMenuItem>

                                            {hasSubItems && isExpanded && (
                                                <div className="ml-8 pl-4 border-l-2 border-gray-200">
                                                    {item.subItems.map((subItem) => (
                                                        <WebsiteSidebarMenuItem key={subItem.title}>
                                                            <WebsiteSidebarMenuButton
                                                                asChild={false}
                                                                className={`px-4 py-2 rounded-none hover:bg-gray-100 text-sm
                                                                    ${pathname.includes(subItem.url)
                                                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                                        : ''
                                                                    }`}
                                                            >
                                                                <Link href={subItem.url} className="w-full flex items-center gap-3">
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                            </WebsiteSidebarMenuButton>
                                                        </WebsiteSidebarMenuItem>
                                                    ))}
                                                </div>
                                            )}
                                        </React.Fragment>
                                    )
                                })}
                            </WebsiteSidebarMenu>
                        </WebsiteSidebarGroupContent>
                    </WebsiteSidebarGroup>
                </WebsiteSidebarContent>
                <WebsiteSidebarFooter className='mb-2'>
                    <WebsiteSidebarMenu>
                        <WebsiteSidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <WebsiteSidebarMenuButton className="hover:bg-gray-100">
                                        <User2 className="!w-5 !h-5" />
                                        <span className="text-base">Username</span>
                                        <ChevronUp className="ml-auto !w-5 !h-5" />
                                    </WebsiteSidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="w-[--radix-popper-anchor-width]"
                                >
                                    <DropdownMenuItem>
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </WebsiteSidebarMenuItem>
                    </WebsiteSidebarMenu>
                </WebsiteSidebarFooter>
            </WebsiteSidebar>
        </div>
    );
};

export default WebsiteSidebarItem;