"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLoginMutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
    admin_phone: z.string().min(1, "Phone number is required"),
    admin_password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function Signin() {
    const { mutate, isPending } = useLogin();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: FormData) => {
        mutate(data, {
            onSuccess: () => {
                router.push("/"); // or whatever route
            },
        });
    };

    return (
        <div className="flex h-screen items-center justify-center bg-slate-100">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Sign in</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <Label htmlFor="admin_phone">Phone Number</Label>
                        <Input
                            id="admin_phone"
                            type="tel"
                            {...register("admin_phone")}
                            placeholder="Enter phone number"
                        />
                        {errors.admin_phone && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.admin_phone.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="admin_password">Password</Label>
                        <Input
                            id="admin_password"
                            type="password"
                            {...register("admin_password")}
                            placeholder="Enter password"
                        />
                        {errors.admin_password && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.admin_password.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full addButton" disabled={isPending}>
                        {isPending ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
