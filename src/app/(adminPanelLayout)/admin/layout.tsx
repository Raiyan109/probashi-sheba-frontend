import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSidebar from "@/components/DashboardSidebar/DashboardSidebar";


const AdminPanelLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div>
                <SidebarProvider>
                    <DashboardSidebar />
                    <SidebarTrigger />
                    <div className="mx-auto">
                        <div className="mr-7 md:mr-10 lg:mr-0 mt-20">
                            {children}
                        </div>
                    </div>
                </SidebarProvider>
            </div>
        </>
    );
};

export default AdminPanelLayout;