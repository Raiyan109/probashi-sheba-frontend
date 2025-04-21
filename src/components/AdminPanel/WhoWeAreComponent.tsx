"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
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
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getWhoWeAre } from "@/lib/api";
import { useUpdateWhoWeAre } from "@/hooks/useWhoWeAreMutation";
import { toast } from "sonner";

// Item schema
const whoWeAreItemSchema = z.object({
    who_we_are_item_image: z.union([z.string(), z.instanceof(File)]).optional(),

    // who_we_are_item_image: z.string().optional(),
    who_we_are_item_unit_english: z.number().optional(),
    who_we_are_item_unit_bangla: z.number().optional(),
    who_we_are_item_title_english: z.string().optional(),
    who_we_are_item_title_bangla: z.string().optional(),
});

// Full form schema
const formSchema = z.object({
    who_we_are_title_english: z.string().min(1, "Title is required"),
    who_we_are_title_bangla: z.string().min(1, "Title is required"),
    who_we_are_image: z.instanceof(File).optional(),

    who_we_are_services_image: z.instanceof(File).optional(),
    who_we_are_services_title_english: z.string().optional(),
    who_we_are_services_title_bangla: z.string().optional(),
    who_we_are_services_unit_english: z.number().optional(),
    who_we_are_services_unit_bangla: z.string().optional(),


    // whoWeAreServices: whoWeAreItemSchema,
    // whoWeAreMigrants: whoWeAreItemSchema,
    // whoWeAreSaved: whoWeAreItemSchema,
    // whoWeAreDays: whoWeAreItemSchema,
    // whoWeAreEmployers: whoWeAreItemSchema,
});

type FormData = z.infer<typeof formSchema>;

const WhoWeAreComponent = () => {
    const { data } = useQuery({
        queryKey: ['who-we-are'],
        queryFn: getWhoWeAre
    })
    const whoWeAreData = data?.data

    const [imagePreviews, setImagePreviews] = React.useState<Record<string, string | null>>({});
    const [imagePreview, setImagePreview] = React.useState<string | null>(null)

    const [loading, setLoading] = React.useState(false);
    const [descEnglish, setDescEnglish] = React.useState(whoWeAreData?.who_we_are_description_english || "");
    const [descBangla, setDescBangla] = React.useState(whoWeAreData?.who_we_are_description_bangla || "");
    const [detailsEnglish, setDetailsEnglish] = React.useState(whoWeAreData?.who_we_are_details_english || "");
    const [detailsBangla, setDetailsBangla] = React.useState(whoWeAreData?.who_we_are_details_bangla || "");

    const { mutate, isPending } = useUpdateWhoWeAre();

    console.log(whoWeAreData);


    React.useEffect(() => {
        if (whoWeAreData) {
            setDescEnglish(whoWeAreData.who_we_are_description_english || "");
            setDescBangla(whoWeAreData.who_we_are_description_bangla || "");
            setDetailsEnglish(whoWeAreData.who_we_are_details_english || "");
            setDetailsBangla(whoWeAreData.who_we_are_details_bangla || "");
            form.reset({
                who_we_are_title_english: whoWeAreData.who_we_are_title_english ?? "",
                who_we_are_title_bangla: whoWeAreData.who_we_are_title_bangla ?? "",

                who_we_are_services_title_english: whoWeAreData?.who_we_are_services?.who_we_are_item_title_english ?? "",
                who_we_are_services_title_bangla: whoWeAreData?.who_we_are_services?.who_we_are_item_title_bangla ?? "",
                who_we_are_services_unit_english: whoWeAreData?.who_we_are_services?.who_we_are_item_unit_english ?? 0,
                who_we_are_services_unit_bangla: whoWeAreData?.who_we_are_services?.who_we_are_item_unit_bangla ?? 0,
                // whoWeAreServices: {
                //     who_we_are_item_title_english: whoWeAreData.who_we_are_services?.who_we_are_item_title_english ?? "",
                //     who_we_are_item_title_bangla: whoWeAreData.who_we_are_services?.who_we_are_item_title_bangla ?? "",
                //     who_we_are_item_unit_english: whoWeAreData.who_we_are_services?.who_we_are_item_unit_english ?? 0,
                //     who_we_are_item_unit_bangla: whoWeAreData.who_we_are_services?.who_we_are_item_unit_bangla ?? 0,
                // },
                // whoWeAreMigrants: {
                //     who_we_are_item_title: whoWeAreData.who_we_are_migrants?.who_we_are_item_title_english ?? "",
                //     who_we_are_item_unit: whoWeAreData.who_we_are_migrants?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreSaved: {
                //     who_we_are_item_title: whoWeAreData.who_we_are_saved?.who_we_are_item_title_english ?? "",
                //     who_we_are_item_unit: whoWeAreData.who_we_are_saved?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreDays: {
                //     who_we_are_item_title: whoWeAreData.who_we_are_days?.who_we_are_item_title_english ?? "",
                //     who_we_are_item_unit: whoWeAreData.who_we_are_days?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreEmployers: {
                //     who_we_are_item_title: whoWeAreData.who_we_are_employers?.who_we_are_item_title_english ?? "",
                //     who_we_are_item_unit: whoWeAreData.who_we_are_employers?.who_we_are_item_unit_english ?? 0,
                // },
            });
        }
    }, [whoWeAreData]);


    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: whoWeAreData
            ? {
                who_we_are_title_english: whoWeAreData?.who_we_are_title_english ?? '',
                who_we_are_title_bangla: whoWeAreData?.who_we_are_title_bangla ?? '',

                who_we_are_services_title_english: whoWeAreData?.who_we_are_services_title_english ?? "",
                who_we_are_services_title_bangla: whoWeAreData?.who_we_are_services_title_bangla ?? "",
                who_we_are_services_unit_english: whoWeAreData?.who_we_are_services_unit_english ?? 0,
                who_we_are_services_unit_bangla: whoWeAreData?.who_we_are_services_unit_bangla ?? 0,
                // whoWeAreMigrants: {
                //     who_we_are_item_title: whoWeAreData.who_we_are_migrants?.who_we_are_item_title_english ?? "",
                //     who_we_are_item_unit: whoWeAreData.who_we_are_migrants?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreSaved: {
                //     who_we_are_item_title: whoWeAreData.who_we_are_saved?.who_we_are_item_title_english ?? "",
                //     who_we_are_item_unit: whoWeAreData.who_we_are_saved?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreDays: {
                //     who_we_are_item_title: whoWeAreData.who_we_are_days?.who_we_are_item_title_english ?? "",
                //     who_we_are_item_unit: whoWeAreData.who_we_are_days?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreEmployers: {
                //     who_we_are_item_title: whoWeAreData.who_we_are_employers?.who_we_are_item_title_english ?? "",
                //     who_we_are_item_unit: whoWeAreData.who_we_are_employers?.who_we_are_item_unit_english ?? 0,
                // },
            }
            : undefined,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImagePreview(URL.createObjectURL(file))
        }
    }

    // const handleImagePreview = <
    //     T extends keyof Pick<
    //         FormData,
    //         | "whoWeAreServices"
    //     // | "whoWeAreMigrants"
    //     // | "whoWeAreSaved"
    //     // | "whoWeAreDays"
    //     // | "whoWeAreEmployers"
    //     >
    // >(
    //     e: React.ChangeEvent<HTMLInputElement>,
    //     fieldName: T
    // ) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         // Type-safe path
    //         form.setValue(`${fieldName}.who_we_are_item_image` as `${T}.who_we_are_item_image`, file as any);

    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setImagePreviews((prev) => ({
    //                 ...prev,
    //                 [fieldName]: reader.result as string,
    //             }));
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    // const renderWhoWeAreItem = <
    //     T extends keyof Pick<
    //         FormData,
    //         | "whoWeAreServices"
    //     // | "whoWeAreMigrants"
    //     // | "whoWeAreSaved"
    //     // | "whoWeAreDays"
    //     // | "whoWeAreEmployers"
    //     >
    // >(
    //     fieldName: T,
    //     label: string
    // ) => (
    //     <div className="space-y-4 border rounded p-4">
    //         <h3 className="text-xl font-semibold">{label}</h3>

    //         <FormField
    //             control={form.control}
    //             name={`${fieldName}.who_we_are_item_title` as const}
    //             render={({ field }) => (
    //                 <FormItem>
    //                     <FormLabel>Title</FormLabel>
    //                     <FormControl>
    //                         <Input placeholder="Enter title" {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                 </FormItem>
    //             )}
    //         />

    //         <FormField
    //             control={form.control}
    //             name={`${fieldName}.who_we_are_item_unit` as const}
    //             render={({ field }) => (
    //                 <FormItem>
    //                     <FormLabel>Unit</FormLabel>
    //                     <FormControl>
    //                         <Input
    //                             type="number"
    //                             placeholder="Enter unit"
    //                             {...field}
    //                             onChange={event => field.onChange(+event.target.value)}
    //                         />
    //                     </FormControl>
    //                     <FormMessage />
    //                 </FormItem>
    //             )}
    //         />

    //         <FormItem>
    //             <FormLabel>Image</FormLabel>
    //             <FormControl>
    //                 <Input
    //                     type="file"
    //                     accept="image/*"
    //                     onChange={(e) => handleImagePreview(e, fieldName)}
    //                 />
    //             </FormControl>
    //             {imagePreviews[fieldName] && (
    //                 <Image
    //                     width={100}
    //                     height={100}
    //                     src={imagePreviews[fieldName] ?? ""}
    //                     alt="Preview"
    //                     className="w-32 h-32 object-contain mt-1 rounded"
    //                 />
    //             )}
    //         </FormItem>
    //     </div>
    // );


    const onSubmit = async (data: FormData) => {
        // setLoading(true);
        console.log('Uploaded file:', data?.who_we_are_image)
        const payload = {
            ...data,
            who_we_are_description_english: descEnglish,
            who_we_are_description_bangla: descBangla,
            who_we_are_details_english: detailsEnglish,
            who_we_are_details_bangla: detailsBangla,
        };
        console.log(payload);
        console.log('ok');
        try {
            const formData = new FormData();

            // Append all text fields
            formData.append("who_we_are_title_english", data.who_we_are_title_english);
            formData.append("who_we_are_title_bangla", data.who_we_are_title_bangla);

            // Append the rich text editor content
            formData.append("who_we_are_description_english", descEnglish);
            formData.append("who_we_are_description_bangla", descBangla);
            formData.append("who_we_are_details_english", detailsEnglish);
            formData.append("who_we_are_details_bangla", detailsBangla);

            // Append services data
            if (data.who_we_are_services_title_english) {
                formData.append("who_we_are_services_title_english", data.who_we_are_services_title_english);
            }
            if (data.who_we_are_services_title_bangla) {
                formData.append("who_we_are_services_title_bangla", data.who_we_are_services_title_bangla);
            }
            if (data.who_we_are_services_unit_english) {
                formData.append("who_we_are_services_unit_english", data.who_we_are_services_unit_english.toString());
            }
            if (data.who_we_are_services_unit_bangla) {
                formData.append("who_we_are_services_unit_bangla", data.who_we_are_services_unit_bangla.toString());
            }

            // Append image files if they exist
            if (data.who_we_are_image instanceof File) {
                formData.append("who_we_are_image", data.who_we_are_image);
            }
            if (data.who_we_are_services_image instanceof File) {
                formData.append("who_we_are_services_image", data.who_we_are_services_image);
            }

            // Use the mutation
            mutate(formData);

        } catch (error) {
            console.error("Error preparing form data:", error);
            toast.error("Failed to prepare form data");
        } finally {
            setLoading(false);
        }

        // try {
        //     const formData = new FormData();

        //     console.log("Raw form data:", data);

        //     formData.append("who_we_are_title_english", data.who_we_are_title_english);
        //     formData.append("whoWeAreDescription", data.whoWeAreDescription || "");




        //     const res = await fetch("/api/site-settings", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(body),
        //     });

        //     if (res.ok) {
        //         alert("Settings saved!");
        //         form.reset();
        //         setImagePreviews({});
        //     } else {
        //         alert("Failed to save settings.");
        //     }
        // } catch (error) {
        //     console.error(error);
        //     alert("Something went wrong.");
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <Card className="w-[400px] md:w-[500px] lg:w-[700px]">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">About us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6">

                        {/* Image */}
                        <FormField
                            control={form.control}
                            name="who_we_are_image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) {
                                                    const url = URL.createObjectURL(file)
                                                    setImagePreview(url) // your own preview state
                                                    field.onChange(file) // pass the file to react-hook-form
                                                }
                                            }}
                                        />
                                    </FormControl>

                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="mt-2 w-32 h-32 object-cover rounded border shadow"
                                        />
                                    )}
                                </FormItem>
                            )}
                        />


                        {/* Title en */}
                        <FormField
                            control={form.control}
                            name="who_we_are_title_english"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Title (English)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter main title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Title bn */}
                        <FormField
                            control={form.control}
                            name="who_we_are_title_bangla"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Title (Bangla)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter main title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Desc english */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Description (English)</h2>
                            <SunEditor
                                setContents={descEnglish}
                                onChange={(content) => setDescEnglish(content)}
                                height="200px"
                                setOptions={{
                                    buttonList: [
                                        ['undo', 'redo'],
                                        ['formatBlock'],
                                        ['bold', 'italic', 'underline'],
                                        ['list', 'align'],
                                        ['link'],
                                        ['removeFormat'],
                                        ['preview', 'codeView'],
                                    ],
                                }}
                            />
                        </div>

                        {/* Desc bangla */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Description (Bangla)</h2>
                            <SunEditor
                                setContents={descBangla}
                                onChange={(content) => setDescBangla(content)}
                                height="200px"
                                setOptions={{
                                    buttonList: [
                                        ['undo', 'redo'],
                                        ['formatBlock'],
                                        ['bold', 'italic', 'underline'],
                                        ['list', 'align'],
                                        ['link'],
                                        ['removeFormat'],
                                        ['preview', 'codeView'],
                                    ],
                                }}
                            />
                        </div>

                        {/* Details english */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Details (English)</h2>
                            <SunEditor
                                setContents={detailsEnglish}
                                onChange={(content) => setDetailsEnglish(content)}
                                height="200px"
                                setOptions={{
                                    buttonList: [
                                        ['undo', 'redo'],
                                        ['formatBlock'],
                                        ['bold', 'italic', 'underline'],
                                        ['list', 'align'],
                                        ['link'],
                                        ['removeFormat'],
                                        ['preview', 'codeView'],
                                    ],
                                }}
                            />
                        </div>

                        {/* Details bangla */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Details (Bangla)</h2>
                            <SunEditor
                                setContents={detailsBangla}
                                onChange={(content) => setDetailsBangla(content)}
                                height="200px"
                                setOptions={{
                                    buttonList: [
                                        ['undo', 'redo'],
                                        ['formatBlock'],
                                        ['bold', 'italic', 'underline'],
                                        ['list', 'align'],
                                        ['link'],
                                        ['removeFormat'],
                                        ['preview', 'codeView'],
                                    ],
                                }}
                            />
                        </div>


                        {/* <FormField
                            control={form.control}
                            name="who_we_are_description_english"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Description (English)</FormLabel>
                                    <FormControl>
                                        <SunEditor
                                            // key={field.value}
                                            // setContents={whoWeAreData?.who_we_are_description_english}
                                            // onChange={field.onChange}
                                            key="who_we_are_description_english" // Helps avoid hydration issues
                                            // value={field.value || ""} // Always a string
                                            onChange={(content) => field.onChange(content)}
                                            height="200px"
                                            setOptions={{
                                                buttonList: [
                                                    ['undo', 'redo'],
                                                    ['formatBlock'],
                                                    ['bold', 'underline', 'italic', 'strike'],
                                                    ['fontColor', 'hiliteColor'],
                                                    ['align', 'list', 'indent'],
                                                    ['link'],
                                                    ['removeFormat'],
                                                    ['preview', 'codeView', 'fullScreen']
                                                ],
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                        {/* <FormField
                            control={form.control}
                            name="who_we_are_description_bangla"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Description (Bangla)</FormLabel>
                                    <FormControl>
                                        <SunEditor
                                        key={field.value}
                                            setContents={whoWeAreData?.who_we_are_description_bangla}
                                            onChange={field.onChange}
                                            height="200px"
                                            setOptions={{
                                                buttonList: [
                                                    ['undo', 'redo'],
                                                    ['formatBlock'],
                                                    ['bold', 'underline', 'italic', 'strike'],
                                                    ['fontColor', 'hiliteColor'],
                                                    ['align', 'list', 'indent'],
                                                    ['link'],
                                                    ['removeFormat'],
                                                    ['preview', 'codeView', 'fullScreen']
                                                ],
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="who_we_are_details_english"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Details (English)</FormLabel>
                                    <FormControl>
                                        <SunEditor
                                        key={field.value}
                                            setContents={whoWeAreData?.who_we_are_details_english}
                                            onChange={field.onChange}
                                            height="200px"
                                            setOptions={{
                                                buttonList: [
                                                    ['undo', 'redo'],
                                                    ['formatBlock'],
                                                    ['bold', 'underline', 'italic', 'strike'],
                                                    ['fontColor', 'hiliteColor'],
                                                    ['align', 'list', 'indent'],
                                                    ['link'],
                                                    ['removeFormat'],
                                                    ['preview', 'codeView', 'fullScreen']
                                                ],
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="who_we_are_details_bangla"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Details (Bangla)</FormLabel>
                                    <FormControl>
                                        <SunEditor
                                        key={field.value}
                                            setContents={field.value}
                                            onChange={field.onChange}
                                            height="200px"
                                            setOptions={{
                                                buttonList: [
                                                    ['undo', 'redo'],
                                                    ['formatBlock'],
                                                    ['bold', 'underline', 'italic', 'strike'],
                                                    ['fontColor', 'hiliteColor'],
                                                    ['align', 'list', 'indent'],
                                                    ['link'],
                                                    ['removeFormat'],
                                                    ['preview', 'codeView', 'fullScreen']
                                                ],
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}


                        <div className="space-y-4 border rounded p-4">
                            <h3 className="text-xl font-semibold">Services</h3>

                            <FormField
                                control={form.control}
                                name='who_we_are_services_title_english'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title (English)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='who_we_are_services_title_bangla'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title (Bangla)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name='who_we_are_services_unit_english'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit (English)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter unit"
                                                {...field}
                                                onChange={event => field.onChange(+event.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='who_we_are_services_unit_bangla'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit (Bangla)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="string"
                                                placeholder="Enter unit"
                                                {...field}
                                                onChange={event => field.onChange(+event.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="who_we_are_services_image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xl">Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) {
                                                        const url = URL.createObjectURL(file)
                                                        setImagePreview(url) // your own preview state
                                                        field.onChange(file) // pass the file to react-hook-form
                                                    }
                                                }}
                                            />
                                        </FormControl>

                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="mt-2 w-32 h-32 object-cover rounded border shadow"
                                            />
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Dynamic Items */}
                        {/* {renderWhoWeAreItem("whoWeAreServices", "Services")} */}
                        {/* {renderWhoWeAreItem("whoWeAreMigrants", "Migrants")}
                        {renderWhoWeAreItem("whoWeAreSaved", "Saved")}
                        {renderWhoWeAreItem("whoWeAreDays", "Days")}
                        {renderWhoWeAreItem("whoWeAreEmployers", "Employers")} */}



                        <div>
                            <Button type="submit" className="cursor-pointer bg-darkGreen hover:bg-darkGreen/90 w-full" disabled={isPending || loading}>
                                {isPending || loading ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default WhoWeAreComponent;
