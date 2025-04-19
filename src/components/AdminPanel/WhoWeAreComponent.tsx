"use client";

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

// Item schema
const whoWeAreItemSchema = z.object({
    whoWeAreItemImage: z.any().optional(),
    whoWeAreItemTitle: z.string().min(1, "Title is required"),
    whoWeAreItemUnit: z.number().optional(),
});

// Full form schema
const formSchema = z.object({
    whoWeAreTitle: z.string().min(1, "Title is required"),
    whoWeAreDescription: z.string().optional(),
    whoWeAreServices: whoWeAreItemSchema,
    whoWeAreMigrants: whoWeAreItemSchema,
    whoWeAreSaved: whoWeAreItemSchema,
    whoWeAreDays: whoWeAreItemSchema,
    whoWeAreEmployers: whoWeAreItemSchema,
});

type FormData = z.infer<typeof formSchema>;

const WhoWeAreComponent = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            whoWeAreTitle: "",
            whoWeAreDescription: "",
            whoWeAreServices: { whoWeAreItemTitle: "", whoWeAreItemUnit: 0 },
            whoWeAreMigrants: { whoWeAreItemTitle: "", whoWeAreItemUnit: 0 },
            whoWeAreSaved: { whoWeAreItemTitle: "", whoWeAreItemUnit: 0 },
            whoWeAreDays: { whoWeAreItemTitle: "", whoWeAreItemUnit: 0 },
            whoWeAreEmployers: { whoWeAreItemTitle: "", whoWeAreItemUnit: 0 },
        },
    });

    const [imagePreviews, setImagePreviews] = React.useState<Record<string, string | null>>({});
    const [loading, setLoading] = React.useState(false);

    const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue(`${fieldName}.whoWeAreItemImage` as any, file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews((prev) => ({
                    ...prev,
                    [fieldName]: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    console.log(imagePreviews);
    
    
    

    const renderWhoWeAreItem = (fieldName: keyof FormData, label: string) => (
        <div className="space-y-4 border rounded p-4">
            <h3 className="text-xl font-semibold">{label}</h3>

            <FormField
                control={form.control}
                name={`${fieldName}.whoWeAreItemTitle` as any}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter title" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`${fieldName}.whoWeAreItemUnit` as any}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Enter unit" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImagePreview(e, fieldName)}
                    />
                </FormControl>
                {imagePreviews[fieldName] && (
                    <img
                        src={imagePreviews[fieldName] ?? ""}
                        alt="Preview"
                        className="w-32 h-32 object-contain mt-1 rounded"
                    />
                )}
            </FormItem>
        </div>
    );

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            // const formData = new FormData();

            // console.log("Raw form data:", data);

            // formData.append("whoWeAreTitle", data.whoWeAreTitle);
            // formData.append("whoWeAreDescription", data.whoWeAreDescription || "");

            // const items = [
            //     "whoWeAreServices",
            //     "whoWeAreMigrants",
            //     "whoWeAreSaved",
            //     "whoWeAreDays",
            //     "whoWeAreEmployers",
            // ] as const;

            // for (const key of items) {
            //     formData.append(`${key}[title]`, data[key].whoWeAreItemTitle);
            //     formData.append(`${key}[unit]`, data[key].whoWeAreItemUnit || "");
            //     if (data[key].whoWeAreItemImage) {
            //         formData.append(`${key}[image]`, data[key].whoWeAreItemImage);
            //     }
            // }
            

            const body = {
                who_we_are_title: data.whoWeAreTitle,
                who_we_are_description: data.whoWeAreDescription,
                who_we_are_services: {
                    who_we_are_item_title: data.whoWeAreServices?.whoWeAreItemTitle,
                    who_we_are_item_unit: data.whoWeAreServices?.whoWeAreItemUnit,
                    who_we_are_item_image: data.whoWeAreServices?.whoWeAreItemImage,
                },
                who_we_are_migrants: {
                    who_we_are_item_title: data.whoWeAreMigrants?.whoWeAreItemTitle,
                    who_we_are_item_unit: data.whoWeAreMigrants?.whoWeAreItemUnit,
                    who_we_are_item_image: data.whoWeAreMigrants?.whoWeAreItemImage,
                },
                who_we_are_saved: {
                    who_we_are_item_title: data.whoWeAreSaved?.whoWeAreItemTitle,
                    who_we_are_item_unit: data.whoWeAreSaved?.whoWeAreItemUnit,
                    who_we_are_item_image: data.whoWeAreSaved?.whoWeAreItemImage,
                },
                who_we_are_days: {
                    who_we_are_item_title: data.whoWeAreDays?.whoWeAreItemTitle,
                    who_we_are_item_unit: data.whoWeAreDays?.whoWeAreItemUnit,
                    who_we_are_item_image: data.whoWeAreDays?.whoWeAreItemImage,
                },
                who_we_are_employers: {
                    who_we_are_item_title: data.whoWeAreEmployers?.whoWeAreItemTitle,
                    who_we_are_item_unit: data.whoWeAreEmployers?.whoWeAreItemUnit,
                    who_we_are_item_image: data.whoWeAreEmployers?.whoWeAreItemImage,
                },
            };

            console.log(body);
            


            // const res = await fetch("/api/site-settings", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(body),
            // });

            // if (res.ok) {
            //     alert("Settings saved!");
            //     form.reset();
            //     setImagePreviews({});
            // } else {
            //     alert("Failed to save settings.");
            // }
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
                <CardTitle className="text-3xl font-bold">Who We Are</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="whoWeAreTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Main Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter main title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Dynamic Items */}
                        {renderWhoWeAreItem("whoWeAreServices", "Services")}
                        {renderWhoWeAreItem("whoWeAreMigrants", "Migrants")}
                        {renderWhoWeAreItem("whoWeAreSaved", "Saved")}
                        {renderWhoWeAreItem("whoWeAreDays", "Days")}
                        {renderWhoWeAreItem("whoWeAreEmployers", "Employers")}

                        <FormField
                            control={form.control}
                            name="whoWeAreDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Description</FormLabel>
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
                        />

                        <div>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Saving..." : "Save Info"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default WhoWeAreComponent;
