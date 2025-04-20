import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useLogin() {
    return useMutation({
        mutationFn: loginAdmin,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            toast.success("Login successful");
        },
        onError: (error: any) => {
            toast.error(error.message || "Login failed");
        },
    });
}

export function useLogout() {
    const router = useRouter();

    return useMutation({
        mutationFn: async () => {
            // if needed, you can call a logout API here
            // await fetch("/api/logout", { method: "POST" });
            return true;
        },
        onSuccess: () => {
            localStorage.removeItem("token");
            toast.success("Logout successful");
            router.push("/admin-auth/sign-in"); // or wherever your login page is
        },
        onError: (error: any) => {
            toast.error(error.message || "Logout failed");
        },
    });
}