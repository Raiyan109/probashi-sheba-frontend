"use client"
import { motion } from "framer-motion"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { Skeleton } from "../ui/skeleton"

export const MigrantWorkersSectionComponent = () => {

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const { lang } = useLanguage();


    useEffect(() => {
        fetch('/data/fake_migrant_worker_data.json')
            .then(res => res.json())
            .then(data => {
                setData(data)
                setLoading(false)
            });
    }, []);

    console.log(data[0]);

    if (loading) {
        return (
            <div className="px-4 lg:px-52 py-10">
                <div className="flex gap-4 mb-6">
                    <Skeleton className="h-10 w-40 rounded-md" />
                    <Skeleton className="h-10 w-32 rounded-md" />
                    <Skeleton className="h-10 w-36 rounded-md" />
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="space-y-4 flex-1">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <div>
                        <Skeleton className="h-80 w-80 rounded-lg" />
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="bg-cream pt-10 pb-32">
            <div>
                <h1 className="text-2xl font-bold px-4 md:px-4 lg:px-52 mb-8">For Migrant Workers</h1>
                <Tabs defaultValue={data[0]?.for_migrant_workers_tab_name_english} className="w-full">
                    <div className="overflow-x-auto no-scrollbar">
                        <TabsList className="w-max md:w-max lg:w-full whitespace-nowrap flex gap-2 rounded-xl px-0 md:px-0 lg:px-44">
                            {
                                data?.map((tab, idx) => (
                                    <TabsTrigger key={idx} value={tab?.for_migrant_workers_tab_name_english} className="text-lg flex items-center gap-2 cursor-pointer relative font-medium border-none shadow-none transition-all duration-200 data-[state=active]:text-foreground data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 lg:data-[state=active]:after:left-7 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-darkGreen">
                                        <Image src={tab?.for_migrant_workers_tab_icon} alt="Gov" className="w-12 h-12 rounded-md" width={48} height={48} />
                                        {lang === "bn" ? tab?.for_migrant_workers_tab_name_bangla : tab?.for_migrant_workers_tab_name_english}
                                    </TabsTrigger>
                                ))
                            }
                        </TabsList>
                    </div>

                    {
                        data?.map((tab, index) => (
                            <TabsContent key={index} value={tab.for_migrant_workers_tab_name_english} className="flex flex-col-reverse md:flex-col-reverse lg:flex-row justify-evenly items-center gap-10 md:gap-10 lg:gap-0">
                                <div className="space-y-4">
                                    {
                                        tab.for_migrant_workers_tab_contents.map((content: any) => (
                                            <>
                                                <h3 className="font-semibold text-lg">{lang === "bn"
                                                    ? content?.for_migrant_workers_tab_contents_title_bangla
                                                    : content?.for_migrant_workers_tab_contents_title_english}</h3>
                                                <p className="text-muted-foreground">
                                                    {lang === "bn"
                                                        ? content?.for_migrant_workers_tab_contents_description_bangla
                                                        : content?.for_migrant_workers_tab_contents_description_english}
                                                </p>
                                                {content?.for_migrant_workers_tab_contents_link && (
                                                    <a
                                                        href={content?.for_migrant_workers_tab_contents_link}
                                                        className="text-sm text-green-700 hover:underline block mt-1"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {lang === "bn"
                                                            ? content?.for_migrant_workers_tab_contents_link_text_bangla
                                                            : content?.for_migrant_workers_tab_contents_link_text_english}
                                                    </a>
                                                )}
                                            </>
                                        ))

                                    }

                                </div>
                                <div className="mt-16">
                                    {/* Right Image with Scroll Animation */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    >
                                        <Image
                                            src={tab?.for_migrant_workers_tab_image}
                                            alt={tab?.for_migrant_workers_tab_name_english}
                                            className="w-80 max-w-full rounded-lg shadow-lg"
                                            width={320}
                                            height={320}
                                        />
                                    </motion.div>
                                </div>
                            </TabsContent>
                        ))
                    }


                    {/* Add other tab contents similarly */}
                </Tabs>
            </div>
        </div>
    )
}
