import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "@/lib/api";
import { toast } from "sonner";

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
