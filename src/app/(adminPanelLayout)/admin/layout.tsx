import { ReactNode } from "react";

const AdminPanelLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row">
                admin
                <div className="md:ml-64 md:flex-1 md:h-screen mt-24">{children}</div>
            </div>
        </>
    );
};

export default AdminPanelLayout;