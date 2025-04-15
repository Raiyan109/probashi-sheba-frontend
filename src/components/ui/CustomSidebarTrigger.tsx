"use client"

import { Menu, X } from "lucide-react";
import { Button } from "./button";
import { useSidebar } from "./sidebar";

// Custom trigger button
const CustomSidebarTrigger = () => {
    const { open, toggleSidebar } = useSidebar();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 md:hidden"
        >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
    );
};

export default CustomSidebarTrigger