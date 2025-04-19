"use client"

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

// Schema with Zod
const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    favicon: z.any().refine(val => val !== undefined && val !== null, {
        message: "Favicon is required",
    }),
    logo: z.any().refine(val => val !== undefined && val !== null, {
        message: "Logo is required",
    }),
    // aboutUs: z.string().optional(),
    // returnPolicy: z.string().optional(),
    // refundPolicy: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const SiteSettingsComponent = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            // aboutUs: "",
            // returnPolicy: "",
            // refundPolicy: "",
        },
    });

    const [faviconPreview, setFaviconPreview] = React.useState<string | null>(null);
    const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const handleImagePreview = (
        e: React.ChangeEvent<HTMLInputElement>,
        setPreview: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: FormData) => {
        setLoading(true);

        try {
            const body = {
                ...data,
                favicon: faviconPreview,
                logo: logoPreview,
            };

            console.log(body);


            const res = await fetch("/api/site-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                alert("Settings saved!");
                form.reset();
                setFaviconPreview(null);
                setLogoPreview(null);
            } else {
                alert("Failed to save settings.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Site Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Website Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter website title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Favicon + Logo Upload */}
                        <div className="flex gap-6  items-start">
                            <FormItem>
                                <FormLabel>Favicon</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            form.setValue("favicon", e.target.files?.[0]);
                                            // Clear error message if a valid file is selected
                                            if (e.target.files?.[0]) {
                                                form.clearErrors("favicon");
                                            }
                                            handleImagePreview(e, setFaviconPreview);
                                        }}
                                    />
                                </FormControl>
                                {faviconPreview && (
                                    <img src={faviconPreview} alt="Favicon Preview" className="w-96 h-36 md:h-52 lg:h-96 mt-2 rounded object-contain" />
                                )}

                                {/* Manual error message display */}
                                {form.formState.errors.favicon && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.favicon.message as string}
                                    </p>
                                )}
                            </FormItem>

                            <FormItem>
                                <FormLabel>Website Logo</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            form.setValue("logo", e.target.files?.[0]);
                                            if (e.target.files?.[0]) {
                                                form.clearErrors("logo");
                                            }
                                            handleImagePreview(e, setLogoPreview);
                                        }}
                                    />
                                </FormControl>
                                {logoPreview && (
                                    <img src={logoPreview} alt="Logo Preview" className="w-96 h-36 md:h-52 lg:h-96 mt-2 rounded object-contain" />
                                )}

                                {/* Manual error message display */}
                                {form.formState.errors.logo && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.logo.message as string}
                                    </p>
                                )}

                            </FormItem>
                        </div>

                        {/* About Us */}
                        {/* <FormField
                            control={form.control}
                            name="aboutUs"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>About Us</FormLabel>
                                    <FormControl>
                                        <SunEditor
                                            setContents={field.value}
                                            onChange={field.onChange}
                                            height="200px"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                        {/* Return Policy */}
                        {/* <FormField
                            control={form.control}
                            name="returnPolicy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Return Policy</FormLabel>
                                    <FormControl>
                                        <SunEditor
                                            setContents={field.value}
                                            onChange={field.onChange}
                                            height="200px"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                        {/* Refund Policy */}
                        {/* <FormField
                            control={form.control}
                            name="refundPolicy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Refund Policy</FormLabel>
                                    <FormControl>
                                        <SunEditor
                                            setContents={field.value}
                                            onChange={field.onChange}
                                            height="200px"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                        {/* Submit */}
                        <div>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Saving..." : "Save Settings"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SiteSettingsComponent;
