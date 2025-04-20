import Navbar from "@/components/Navbar/Navbar";
import { WebsiteSidebarProvider, WebsiteSidebarTrigger } from "@/components/WebsiteSidebar/WebsiteSidebar";
import WebsiteSidebarItem from "@/components/WebsiteSidebarItem/WebsiteSidebarItem";
import { ReactNode } from "react";

const WebsiteLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen">
            {/* Desktop View (lg and up) */}
            <div className="hidden lg:block">
                <Navbar />
                <div>{children}</div>
            </div>

            {/* Mobile/Tablet View (md and below) */}
            <div className="block lg:hidden overflow-x-hidden">
                <WebsiteSidebarProvider>
                    <WebsiteSidebarItem />

                    {/* Fixed header with perfect alignment */}
                    <header className="fixed top-0 w-full z-40 bg-white h-14 flex items-center justify-between px-4 border-b">
                       
                        <div className="flex items-center">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-7 w-auto"
                            />
                        </div>


                        {/* sidebar trigger */}
                        <WebsiteSidebarTrigger />
                    </header>

                    {/* Main content */}
                    <main className="w-full">
                        <div>
                            {children}
                        </div>
                    </main>
                </WebsiteSidebarProvider>
            </div>
        </div>
    );
};

export default WebsiteLayout;