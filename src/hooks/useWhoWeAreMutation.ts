import { useMutation } from "@tanstack/react-query";
import { updateWhoWeAre } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useUpdateWhoWeAre() {
    const router = useRouter();

    return useMutation({
        mutationFn: updateWhoWeAre,
        onSuccess: () => {
            toast.success("Who We Are updated successfully");
            router.refresh(); // Optional: refresh the page to see changes
        },
        onError: (error: Error) => {
            toast.error(error.message || "Update failed");
        },
    });
}