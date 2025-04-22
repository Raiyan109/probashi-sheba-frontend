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
import { AdditionalImage } from "@/types";

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
    who_we_are_image: z.union([z.instanceof(File), z.string()]).optional(),

    who_we_are_services_image: z.union([z.instanceof(File), z.string()]).optional(),
    who_we_are_services_title_english: z.string().optional(),
    who_we_are_services_title_bangla: z.string().optional(),
    who_we_are_services_unit_english: z.number().optional(),
    who_we_are_services_unit_bangla: z.string().optional(),

    who_we_are_migrants_image: z.union([z.instanceof(File), z.string()]).optional(),
    who_we_are_migrants_title_english: z.string().optional(),
    who_we_are_migrants_title_bangla: z.string().optional(),
    who_we_are_migrants_unit_english: z.number().optional(),
    who_we_are_migrants_unit_bangla: z.string().optional(),

    who_we_are_saved_image: z.union([z.instanceof(File), z.string()]).optional(),
    who_we_are_saved_title_english: z.string().optional(),
    who_we_are_saved_title_bangla: z.string().optional(),
    who_we_are_saved_unit_english: z.number().optional(),
    who_we_are_saved_unit_bangla: z.string().optional(),

    who_we_are_days_image: z.union([z.instanceof(File), z.string()]).optional(),
    who_we_are_days_title_english: z.string().optional(),
    who_we_are_days_title_bangla: z.string().optional(),
    who_we_are_days_unit_english: z.number().optional(),
    who_we_are_days_unit_bangla: z.string().optional(),

    who_we_are_employees_image: z.union([z.instanceof(File), z.string()]).optional(),
    who_we_are_employees_title_english: z.string().optional(),
    who_we_are_employees_title_bangla: z.string().optional(),
    who_we_are_employees_unit_english: z.number().optional(),
    who_we_are_employees_unit_bangla: z.string().optional(),

    who_we_are_additional_images: z.union([
        z.array(z.instanceof(File)),
        z.array(z.string()),
        z.instanceof(File),
        z.string()
    ]).optional(),
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

    const [additionalImagePreviews, setAdditionalImagePreviews] = React.useState<Array<{ url: string, file?: File }>>([]);
    const [imagePreview, setImagePreview] = React.useState<string | null>(whoWeAreData?.who_we_are_image)
    const [serviceImagePreview, setServiceImagePreview] = React.useState<string | null>(whoWeAreData?.who_we_are_services?.who_we_are_item_image)
    const [migrantsImagePreview, setMigrantsImagePreview] = React.useState<string | null>(whoWeAreData?.who_we_are_migrants?.who_we_are_item_image)
    const [savedImagePreview, setSavedImagePreview] = React.useState<string | null>(whoWeAreData?.who_we_are_saved?.who_we_are_item_image)
    const [daysImagePreview, setDaysImagePreview] = React.useState<string | null>(whoWeAreData?.who_we_are_days?.who_we_are_item_image)
    const [employeesImagePreview, setEmployeesImagePreview] = React.useState<string | null>(whoWeAreData?.who_we_are_employees?.who_we_are_item_image)

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

            // Update all image previews
            setImagePreview(whoWeAreData.who_we_are_image || null);
            setServiceImagePreview(whoWeAreData?.who_we_are_services?.who_we_are_item_image || null);
            setMigrantsImagePreview(whoWeAreData?.who_we_are_migrants?.who_we_are_item_image || null);
            setSavedImagePreview(whoWeAreData?.who_we_are_saved?.who_we_are_item_image || null);
            setDaysImagePreview(whoWeAreData?.who_we_are_days?.who_we_are_item_image || null);
            setEmployeesImagePreview(whoWeAreData?.who_we_are_employees?.who_we_are_item_image || null);

            setAdditionalImagePreviews(
                whoWeAreData?.who_we_are_additional_images?.map((img: AdditionalImage) => ({
                    url: img.additional_image,
                    key: img.additional_image_key
                })) || []
            );
            form.reset({
                who_we_are_title_english: whoWeAreData.who_we_are_title_english ?? "",
                who_we_are_title_bangla: whoWeAreData.who_we_are_title_bangla ?? "",
                who_we_are_image: whoWeAreData.who_we_are_image ?? "",
                who_we_are_additional_images: whoWeAreData?.who_we_are_additional_images ?? [],

                who_we_are_services_image: whoWeAreData?.who_we_are_services?.who_we_are_item_image ?? "",
                who_we_are_services_title_english: whoWeAreData?.who_we_are_services?.who_we_are_item_title_english ?? "",
                who_we_are_services_title_bangla: whoWeAreData?.who_we_are_services?.who_we_are_item_title_bangla ?? "",
                who_we_are_services_unit_english: whoWeAreData?.who_we_are_services?.who_we_are_item_unit_english ?? 0,
                who_we_are_services_unit_bangla: whoWeAreData?.who_we_are_services?.who_we_are_item_unit_bangla ?? 0,

                who_we_are_migrants_image: whoWeAreData?.who_we_are_migrants?.who_we_are_item_image ?? "",
                who_we_are_migrants_title_english: whoWeAreData?.who_we_are_migrants?.who_we_are_item_title_english ?? "",
                who_we_are_migrants_title_bangla: whoWeAreData?.who_we_are_migrants?.who_we_are_item_title_bangla ?? "",
                who_we_are_migrants_unit_english: whoWeAreData?.who_we_are_migrants?.who_we_are_item_unit_english ?? 0,
                who_we_are_migrants_unit_bangla: whoWeAreData?.who_we_are_migrants?.who_we_are_item_unit_bangla ?? 0,

                who_we_are_saved_image: whoWeAreData?.who_we_are_saved?.who_we_are_item_image ?? "",
                who_we_are_saved_title_english: whoWeAreData?.who_we_are_saved?.who_we_are_item_title_english ?? "",
                who_we_are_saved_title_bangla: whoWeAreData?.who_we_are_saved?.who_we_are_item_title_bangla ?? "",
                who_we_are_saved_unit_english: whoWeAreData?.who_we_are_saved?.who_we_are_item_unit_english ?? 0,
                who_we_are_saved_unit_bangla: whoWeAreData?.who_we_are_saved?.who_we_are_item_unit_bangla ?? 0,

                who_we_are_days_image: whoWeAreData?.who_we_are_days?.who_we_are_item_image ?? "",
                who_we_are_days_title_english: whoWeAreData?.who_we_are_days?.who_we_are_item_title_english ?? "",
                who_we_are_days_title_bangla: whoWeAreData?.who_we_are_days?.who_we_are_item_title_bangla ?? "",
                who_we_are_days_unit_english: whoWeAreData?.who_we_are_days?.who_we_are_item_unit_english ?? 0,
                who_we_are_days_unit_bangla: whoWeAreData?.who_we_are_days?.who_we_are_item_unit_bangla ?? 0,

                who_we_are_employees_image: whoWeAreData?.who_we_are_employees?.who_we_are_item_image ?? "",
                who_we_are_employees_title_english: whoWeAreData?.who_we_are_employees?.who_we_are_item_title_english ?? "",
                who_we_are_employees_title_bangla: whoWeAreData?.who_we_are_employees?.who_we_are_item_title_bangla ?? "",
                who_we_are_employees_unit_english: whoWeAreData?.who_we_are_employees?.who_we_are_item_unit_english ?? 0,
                who_we_are_employees_unit_bangla: whoWeAreData?.who_we_are_employees?.who_we_are_item_unit_bangla ?? 0,

            });
        }
    }, [whoWeAreData]);


    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: whoWeAreData
            ? {
                who_we_are_title_english: whoWeAreData?.who_we_are_title_english ?? '',
                who_we_are_title_bangla: whoWeAreData?.who_we_are_title_bangla ?? '',

                who_we_are_additional_images: whoWeAreData?.who_we_are_additional_images ?? [],
                // who_we_are_services_title_english: whoWeAreData?.who_we_are_services_title_english ?? "",
                // who_we_are_services_title_bangla: whoWeAreData?.who_we_are_services_title_bangla ?? "",
                // who_we_are_services_unit_english: whoWeAreData?.who_we_are_services_unit_english ?? 0,
                // who_we_are_services_unit_bangla: whoWeAreData?.who_we_are_services_unit_bangla ?? 0,

                // who_we_are_migrants_title_english: whoWeAreData?.who_we_are_migrants?.who_we_are_item_title_english ?? "",
                // who_we_are_migrants_title_bangla: whoWeAreData?.who_we_are_migrants?.who_we_are_item_title_bangla ?? "",
                // who_we_are_migrants_unit_english: whoWeAreData?.who_we_are_migrants?.who_we_are_item_unit_english ?? 0,
                // who_we_are_migrants_unit_bangla: whoWeAreData?.who_we_are_migrants?.who_we_are_item_unit_bangla ?? 0,

                // who_we_are_saved_title_english: whoWeAreData?.who_we_are_saved?.who_we_are_item_title_english ?? "",
                // who_we_are_saved_title_bangla: whoWeAreData?.who_we_are_saved?.who_we_are_item_title_bangla ?? "",
                // who_we_are_saved_unit_english: whoWeAreData?.who_we_are_saved?.who_we_are_item_unit_english ?? 0,
                // who_we_are_saved_unit_bangla: whoWeAreData?.who_we_are_saved?.who_we_are_item_unit_bangla ?? 0,

                // who_we_are_days_title_english: whoWeAreData?.who_we_are_days?.who_we_are_item_title_english ?? "",
                // who_we_are_days_title_bangla: whoWeAreData?.who_we_are_days?.who_we_are_item_title_bangla ?? "",
                // who_we_are_days_unit_english: whoWeAreData?.who_we_are_days?.who_we_are_item_unit_english ?? 0,
                // who_we_are_days_unit_bangla: whoWeAreData?.who_we_are_days?.who_we_are_item_unit_bangla ?? 0,

                // who_we_are_employees_title_english: whoWeAreData?.who_we_are_employees?.who_we_are_item_title_english ?? "",
                // who_we_are_employees_title_bangla: whoWeAreData?.who_we_are_employees?.who_we_are_item_title_bangla ?? "",
                // who_we_are_employees_unit_english: whoWeAreData?.who_we_are_employees?.who_we_are_item_unit_english ?? 0,
                // who_we_are_employees_unit_bangla: whoWeAreData?.who_we_are_employees?.who_we_are_item_unit_bangla ?? 0,

                who_we_are_services_image: whoWeAreData?.who_we_are_services?.who_we_are_item_image ?? "",
                who_we_are_services_title_english: whoWeAreData?.who_we_are_services?.who_we_are_item_title_english ?? "",
                who_we_are_services_title_bangla: whoWeAreData?.who_we_are_services?.who_we_are_item_title_bangla ?? "",
                who_we_are_services_unit_english: whoWeAreData?.who_we_are_services?.who_we_are_item_unit_english ?? 0,
                who_we_are_services_unit_bangla: whoWeAreData?.who_we_are_services?.who_we_are_item_unit_bangla ?? 0,

                who_we_are_migrants_image: whoWeAreData?.who_we_are_migrants?.who_we_are_item_image ?? "",
                who_we_are_migrants_title_english: whoWeAreData?.who_we_are_migrants?.who_we_are_item_title_english ?? "",
                who_we_are_migrants_title_bangla: whoWeAreData?.who_we_are_migrants?.who_we_are_item_title_bangla ?? "",
                who_we_are_migrants_unit_english: whoWeAreData?.who_we_are_migrants?.who_we_are_item_unit_english ?? 0,
                who_we_are_migrants_unit_bangla: whoWeAreData?.who_we_are_migrants?.who_we_are_item_unit_bangla ?? 0,

                who_we_are_saved_image: whoWeAreData?.who_we_are_saved?.who_we_are_item_image ?? "",
                who_we_are_saved_title_english: whoWeAreData?.who_we_are_saved?.who_we_are_item_title_english ?? "",
                who_we_are_saved_title_bangla: whoWeAreData?.who_we_are_saved?.who_we_are_item_title_bangla ?? "",
                who_we_are_saved_unit_english: whoWeAreData?.who_we_are_saved?.who_we_are_item_unit_english ?? 0,
                who_we_are_saved_unit_bangla: whoWeAreData?.who_we_are_saved?.who_we_are_item_unit_bangla ?? 0,

                who_we_are_days_image: whoWeAreData?.who_we_are_days?.who_we_are_item_image ?? "",
                who_we_are_days_title_english: whoWeAreData?.who_we_are_days?.who_we_are_item_title_english ?? "",
                who_we_are_days_title_bangla: whoWeAreData?.who_we_are_days?.who_we_are_item_title_bangla ?? "",
                who_we_are_days_unit_english: whoWeAreData?.who_we_are_days?.who_we_are_item_unit_english ?? 0,
                who_we_are_days_unit_bangla: whoWeAreData?.who_we_are_days?.who_we_are_item_unit_bangla ?? 0,

                who_we_are_employees_image: whoWeAreData?.who_we_are_employees?.who_we_are_item_image ?? "",
                who_we_are_employees_title_english: whoWeAreData?.who_we_are_employees?.who_we_are_item_title_english ?? "",
                who_we_are_employees_title_bangla: whoWeAreData?.who_we_are_employees?.who_we_are_item_title_bangla ?? "",
                who_we_are_employees_unit_english: whoWeAreData?.who_we_are_employees?.who_we_are_item_unit_english ?? 0,
                who_we_are_employees_unit_bangla: whoWeAreData?.who_we_are_employees?.who_we_are_item_unit_bangla ?? 0,
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
        console.log(data, 'data from onSubmit');

        setLoading(true);
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

            // Append migrants data
            if (data.who_we_are_migrants_title_english) {
                formData.append("who_we_are_migrants_title_english", data.who_we_are_migrants_title_english);
            }
            if (data.who_we_are_migrants_title_bangla) {
                formData.append("who_we_are_migrants_title_bangla", data.who_we_are_migrants_title_bangla);
            }
            if (data.who_we_are_migrants_unit_english) {
                formData.append("who_we_are_migrants_unit_english", data.who_we_are_migrants_unit_english.toString());
            }
            if (data.who_we_are_migrants_unit_bangla) {
                formData.append("who_we_are_migrants_unit_bangla", data.who_we_are_migrants_unit_bangla.toString());
            }

            // Append saved data
            if (data.who_we_are_saved_title_english) {
                formData.append("who_we_are_saved_title_english", data.who_we_are_saved_title_english);
            }
            if (data.who_we_are_saved_title_bangla) {
                formData.append("who_we_are_saved_title_bangla", data.who_we_are_saved_title_bangla);
            }
            if (data.who_we_are_saved_unit_english) {
                formData.append("who_we_are_saved_unit_english", data.who_we_are_saved_unit_english.toString());
            }
            if (data.who_we_are_saved_unit_bangla) {
                formData.append("who_we_are_saved_unit_bangla", data.who_we_are_saved_unit_bangla.toString());
            }

            // Append days data
            if (data.who_we_are_days_title_english) {
                formData.append("who_we_are_days_title_english", data.who_we_are_days_title_english);
            }
            if (data.who_we_are_days_title_bangla) {
                formData.append("who_we_are_days_title_bangla", data.who_we_are_days_title_bangla);
            }
            if (data.who_we_are_days_unit_english) {
                formData.append("who_we_are_days_unit_english", data.who_we_are_days_unit_english.toString());
            }
            if (data.who_we_are_days_unit_bangla) {
                formData.append("who_we_are_days_unit_bangla", data.who_we_are_days_unit_bangla.toString());
            }

            // Append employees data
            if (data.who_we_are_employees_title_english) {
                formData.append("who_we_are_employees_title_english", data.who_we_are_employees_title_english);
            }
            if (data.who_we_are_employees_title_bangla) {
                formData.append("who_we_are_employees_title_bangla", data.who_we_are_employees_title_bangla);
            }
            if (data.who_we_are_employees_unit_english) {
                formData.append("who_we_are_employees_unit_english", data.who_we_are_employees_unit_english.toString());
            }
            if (data.who_we_are_employees_unit_bangla) {
                formData.append("who_we_are_employees_unit_bangla", data.who_we_are_employees_unit_bangla.toString());
            }

            // Append image files if they exist
            if (data.who_we_are_image) {
                formData.append("who_we_are_image", data.who_we_are_image);
            }
            if (data.who_we_are_services_image) {
                formData.append("who_we_are_services_image", data.who_we_are_services_image);
            }
            if (data.who_we_are_migrants_image) {
                formData.append("who_we_are_migrants_image", data.who_we_are_migrants_image);
            }
            if (data.who_we_are_saved_image) {
                formData.append("who_we_are_saved_image", data.who_we_are_saved_image);
            }
            if (data.who_we_are_days_image) {
                formData.append("who_we_are_days_image", data.who_we_are_days_image);
            }
            if (data.who_we_are_employees_image) {
                formData.append("who_we_are_employees_image", data.who_we_are_employees_image);
            }

            // Handle additional images
            if (data.who_we_are_additional_images) {
                const additionalImages = Array.isArray(data.who_we_are_additional_images)
                    ? data.who_we_are_additional_images
                    : [data.who_we_are_additional_images];

                additionalImages.forEach((file, index) => {
                    if (file instanceof File) {
                        formData.append(`who_we_are_additional_images`, file);
                    }
                });
            }
            // for (const pair of formData.entries()) {
            //     console.log(pair[0], pair[1]);
            // }
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
                                                    const url = URL.createObjectURL(file);
                                                    setImagePreview(url);
                                                    field.onChange(file);
                                                } else {
                                                    // Keep the existing value if no new file is selected
                                                    field.onChange(whoWeAreData?.who_we_are_image || "");
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

                        {/* Services */}
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
                                                placeholder="Enter unit"
                                                {...field}
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
                                                        setServiceImagePreview(url)
                                                        field.onChange(file)
                                                    } else {
                                                        field.onChange(whoWeAreData?.who_we_are_services?.who_we_are_item_image)
                                                    }
                                                }}
                                            />
                                        </FormControl>

                                        {serviceImagePreview && (
                                            <img
                                                src={serviceImagePreview}
                                                alt="Preview"
                                                className="mt-2 w-32 h-32 object-cover rounded border shadow"
                                            />
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Migrants */}
                        <div className="space-y-4 border rounded p-4">
                            <h3 className="text-xl font-semibold">Migrants</h3>

                            <FormField
                                control={form.control}
                                name='who_we_are_migrants_title_english'
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
                                name='who_we_are_migrants_title_bangla'
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
                                name='who_we_are_migrants_unit_english'
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
                                name='who_we_are_migrants_unit_bangla'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit (Bangla)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter unit"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="who_we_are_migrants_image"
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
                                                        setMigrantsImagePreview(url) // your own preview state
                                                        field.onChange(file) // pass the file to react-hook-form
                                                    } else {
                                                        field.onChange(whoWeAreData?.who_we_are_migrants?.who_we_are_item_image)
                                                    }
                                                }}
                                            />
                                        </FormControl>

                                        {migrantsImagePreview && (
                                            <img
                                                src={migrantsImagePreview}
                                                alt="Preview"
                                                className="mt-2 w-32 h-32 object-cover rounded border shadow"
                                            />
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Saved */}
                        <div className="space-y-4 border rounded p-4">
                            <h3 className="text-xl font-semibold">Saved</h3>

                            <FormField
                                control={form.control}
                                name='who_we_are_saved_title_english'
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
                                name='who_we_are_saved_title_bangla'
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
                                name='who_we_are_saved_unit_english'
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
                                name='who_we_are_saved_unit_bangla'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit (Bangla)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter unit"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="who_we_are_saved_image"
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
                                                        setSavedImagePreview(url) // your own preview state
                                                        field.onChange(file) // pass the file to react-hook-form
                                                    } else {
                                                        field.onChange(whoWeAreData?.who_we_are_saved?.who_we_are_item_image)
                                                    }
                                                }}
                                            />
                                        </FormControl>

                                        {savedImagePreview && (
                                            <img
                                                src={savedImagePreview}
                                                alt="Preview"
                                                className="mt-2 w-32 h-32 object-cover rounded border shadow"
                                            />
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Days */}
                        <div className="space-y-4 border rounded p-4">
                            <h3 className="text-xl font-semibold">Days</h3>

                            <FormField
                                control={form.control}
                                name='who_we_are_days_title_english'
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
                                name='who_we_are_days_title_bangla'
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
                                name='who_we_are_days_unit_english'
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
                                name='who_we_are_days_unit_bangla'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit (Bangla)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter unit"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="who_we_are_days_image"
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
                                                        setDaysImagePreview(url) // your own preview state
                                                        field.onChange(file) // pass the file to react-hook-form
                                                    } else {
                                                        field.onChange(whoWeAreData?.who_we_are_days?.who_we_are_item_image)
                                                    }
                                                }}
                                            />
                                        </FormControl>

                                        {daysImagePreview && (
                                            <img
                                                src={daysImagePreview}
                                                alt="Preview"
                                                className="mt-2 w-32 h-32 object-cover rounded border shadow"
                                            />
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Employees */}
                        <div className="space-y-4 border rounded p-4">
                            <h3 className="text-xl font-semibold">Employees</h3>

                            <FormField
                                control={form.control}
                                name='who_we_are_employees_title_english'
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
                                name='who_we_are_employees_title_bangla'
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
                                name='who_we_are_employees_unit_english'
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
                                name='who_we_are_employees_unit_bangla'
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
                                name="who_we_are_employees_image"
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
                                                        setEmployeesImagePreview(url) // your own preview state
                                                        field.onChange(file) // pass the file to react-hook-form
                                                    } else {
                                                        field.onChange(whoWeAreData?.who_we_are_employees?.who_we_are_item_image)
                                                    }
                                                }}
                                            />
                                        </FormControl>

                                        {employeesImagePreview && (
                                            <img
                                                src={employeesImagePreview}
                                                alt="Preview"
                                                className="mt-2 w-32 h-32 object-cover rounded border shadow"
                                            />
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Additional Images */}
                        <div className="space-y-4 border rounded p-4">
                            <h3 className="text-xl font-semibold">Additional Images</h3>

                            <FormItem>
                                <FormLabel>Upload Additional Images</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files || []);
                                            if (files.length > 0) {
                                                // Create preview URLs for new files
                                                const newPreviews = files.map(file => ({
                                                    file,
                                                    url: URL.createObjectURL(file)
                                                }));

                                                // Combine with existing previews
                                                setAdditionalImagePreviews(prev => [...prev, ...newPreviews]);

                                                // Update form value
                                                form.setValue(
                                                    "who_we_are_additional_images",
                                                    [...additionalImagePreviews.map((p) => p.file).filter(Boolean), ...files] as File[]
                                                );
                                            }
                                        }}
                                    />
                                </FormControl>

                                {/* Display all previews */}
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {additionalImagePreviews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={preview.url}
                                                alt={`Preview ${index}`}
                                                className="w-32 h-32 object-cover rounded border shadow"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                onClick={() => {
                                                    // Remove the preview
                                                    setAdditionalImagePreviews(prev =>
                                                        prev.filter((_, i) => i !== index)
                                                    );
                                                    // Update form value
                                                    form.setValue(
                                                        "who_we_are_additional_images",
                                                        additionalImagePreviews
                                                            .filter((_, i) => i !== index)
                                                            .filter(p => p.file)
                                                            .map(p => p.file!)
                                                    );
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </FormItem>
                        </div>

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
