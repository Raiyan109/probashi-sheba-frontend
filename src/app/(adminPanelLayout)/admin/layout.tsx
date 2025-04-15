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
                    <div className="md:ml-32 mt-20">
                        {children}
                    </div>
                </SidebarProvider>
            </div>
        </>
    );
};

export default AdminPanelLayout;