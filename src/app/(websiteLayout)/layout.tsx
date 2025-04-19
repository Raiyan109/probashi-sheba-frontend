import DashboardSidebar from "@/components/DashboardSidebar/DashboardSidebar";
import Navbar from "@/components/Navbar/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { WebsiteSidebar, WebsiteSidebarProvider, WebsiteSidebarTrigger } from "@/components/WebsiteSidebar/WebsiteSidebar";
import { ReactNode } from "react";

const WebsiteLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="">
                <div className="hidden md:hidden lg:block">
                    <Navbar />
                    <div className="">{children}</div>
                </div>
                <div className="block md:block lg:hidden">
                    <WebsiteSidebarProvider>
                        <WebsiteSidebar />
                        <div className="flex justify-center">
                            <WebsiteSidebarTrigger />
                        </div>
                        <div>
                            <div>
                                {children}
                            </div>
                        </div>
                    </WebsiteSidebarProvider>
                </div>
            </div>
        </>
    );
};

export default WebsiteLayout;