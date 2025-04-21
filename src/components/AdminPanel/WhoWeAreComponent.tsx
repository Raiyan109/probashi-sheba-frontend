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

// Item schema
const whoWeAreItemSchema = z.object({
    whoWeAreItemImage: z.union([z.string(), z.instanceof(File)]).optional(),

    // whoWeAreItemImage: z.string().optional(),
    whoWeAreItemTitle: z.string().min(1, "Title is required"),
    whoWeAreItemUnit: z.number().optional(),
});

// Full form schema
const formSchema = z.object({
    who_we_are_title_english: z.string().min(1, "Title is required"),
    who_we_are_title_bangla: z.string().min(1, "Title is required"),
    who_we_are_image: z.instanceof(File).optional()

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
    const [loading, setLoading] = React.useState(false);
    const [descEnglish, setDescEnglish] = React.useState(whoWeAreData?.who_we_are_description_english || "");
    const [descBangla, setDescBangla] = React.useState(whoWeAreData?.who_we_are_description_bangla || "");
    const [detailsEnglish, setDetailsEnglish] = React.useState(whoWeAreData?.who_we_are_details_english || "");
    const [detailsBangla, setDetailsBangla] = React.useState(whoWeAreData?.who_we_are_details_bangla || "");



    React.useEffect(() => {
        if (whoWeAreData) {
            setDescEnglish(whoWeAreData.who_we_are_description_english || "");
            setDescBangla(whoWeAreData.who_we_are_description_bangla || "");
            setDetailsEnglish(whoWeAreData.who_we_are_details_english || "");
            setDetailsBangla(whoWeAreData.who_we_are_details_bangla || "");
            form.reset({
                who_we_are_title_english: whoWeAreData.who_we_are_title_english ?? "",
                who_we_are_title_bangla: whoWeAreData.who_we_are_title_bangla ?? "",


                // whoWeAreServices: {
                //     whoWeAreItemTitle: whoWeAreData.who_we_are_services?.who_we_are_item_title_english ?? "",
                //     whoWeAreItemUnit: whoWeAreData.who_we_are_services?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreMigrants: {
                //     whoWeAreItemTitle: whoWeAreData.who_we_are_migrants?.who_we_are_item_title_english ?? "",
                //     whoWeAreItemUnit: whoWeAreData.who_we_are_migrants?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreSaved: {
                //     whoWeAreItemTitle: whoWeAreData.who_we_are_saved?.who_we_are_item_title_english ?? "",
                //     whoWeAreItemUnit: whoWeAreData.who_we_are_saved?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreDays: {
                //     whoWeAreItemTitle: whoWeAreData.who_we_are_days?.who_we_are_item_title_english ?? "",
                //     whoWeAreItemUnit: whoWeAreData.who_we_are_days?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreEmployers: {
                //     whoWeAreItemTitle: whoWeAreData.who_we_are_employers?.who_we_are_item_title_english ?? "",
                //     whoWeAreItemUnit: whoWeAreData.who_we_are_employers?.who_we_are_item_unit_english ?? 0,
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

                // whoWeAreServices: {
                //     whoWeAreItemTitle: whoWeAreData.who_we_are_services?.who_we_are_item_title_english ?? "",
                //     whoWeAreItemUnit: whoWeAreData.who_we_are_services?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreMigrants: {
                //     whoWeAreItemTitle: whoWeAreData.who_we_are_migrants?.who_we_are_item_title_english ?? "",
                //     whoWeAreItemUnit: whoWeAreData.who_we_are_migrants?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreSaved: {
                //     whoWeAreItemTitle: whoWeAreData.who_we_are_saved?.who_we_are_item_title_english ?? "",
                //     whoWeAreItemUnit: whoWeAreData.who_we_are_saved?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreDays: {
                //     whoWeAreItemTitle: whoWeAreData.who_we_are_days?.who_we_are_item_title_english ?? "",
                //     whoWeAreItemUnit: whoWeAreData.who_we_are_days?.who_we_are_item_unit_english ?? 0,
                // },
                // whoWeAreEmployers: {
                //     whoWeAreItemTitle: whoWeAreData.who_we_are_employers?.who_we_are_item_title_english ?? "",
                //     whoWeAreItemUnit: whoWeAreData.who_we_are_employers?.who_we_are_item_unit_english ?? 0,
                // },
            }
            : undefined,
    });



    const handleImagePreview = <
        T extends keyof Pick<
            FormData,
            | "whoWeAreServices"
            | "whoWeAreMigrants"
            | "whoWeAreSaved"
            | "whoWeAreDays"
            | "whoWeAreEmployers"
        >
    >(
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: T
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            // Type-safe path
            form.setValue(`${fieldName}.whoWeAreItemImage` as `${T}.whoWeAreItemImage`, file as any);

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

    // const renderWhoWeAreItem = <
    //     T extends keyof Pick<
    //         FormData,
    //         | "whoWeAreServices"
    //         | "whoWeAreMigrants"
    //         | "whoWeAreSaved"
    //         | "whoWeAreDays"
    //         | "whoWeAreEmployers"
    //     >
    // >(
    //     fieldName: T,
    //     label: string
    // ) => (
    //     <div className="space-y-4 border rounded p-4">
    //         <h3 className="text-xl font-semibold">{label}</h3>

    //         <FormField
    //             control={form.control}
    //             name={`${fieldName}.whoWeAreItemTitle` as const}
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
    //             name={`${fieldName}.whoWeAreItemUnit` as const}
    //             render={({ field }) => (
    //                 <FormItem>
    //                     <FormLabel>Unit</FormLabel>
    //                     <FormControl>
    //                         <Input type="number" placeholder="Enter unit" {...field} />
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
        setLoading(true);
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
            // const formData = new FormData();

            // console.log("Raw form data:", data);

            // formData.append("who_we_are_title_english", data.who_we_are_title_english);
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
        <Card className="w-[400px] md:w-[500px] lg:w-[700px]">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">About us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormItem>
                 <FormLabel>Image</FormLabel>
                 <FormControl>
                     <Input
                        type="file"
                        accept="image/*"
                        // onChange={(e) => handleImagePreview(e, fieldName)}
                    />
                </FormControl>
                {/* {imagePreviews[fieldName] && (
                    <Image
                        width={100}
                        height={100}
                        src={imagePreviews[fieldName] ?? ""}
                        alt="Preview"
                        className="w-32 h-32 object-contain mt-1 rounded"
                    />
                )} */}
            </FormItem>

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

                        {/* Dynamic Items */}
                        {/* {renderWhoWeAreItem("whoWeAreServices", "Services")}
                        {renderWhoWeAreItem("whoWeAreMigrants", "Migrants")}
                        {renderWhoWeAreItem("whoWeAreSaved", "Saved")}
                        {renderWhoWeAreItem("whoWeAreDays", "Days")}
                        {renderWhoWeAreItem("whoWeAreEmployers", "Employers")} */}



                        <div>
                            <Button type="submit" className="cursor-pointer bg-darkGreen hover:bg-darkGreen/90 w-full" disabled={loading}>
                                {loading ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default WhoWeAreComponent;
