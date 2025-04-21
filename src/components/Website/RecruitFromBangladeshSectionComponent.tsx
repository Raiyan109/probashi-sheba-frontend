"use client"
import React from 'react';
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';


const RecruitFromBangladeshSectionComponent = () => {

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false })
    );

    const carouselItems = [
        {
            title: "Find Top Talent",
            description: "Access verified candidates from Bangladesh's growing talent pool"
        },
        {
            title: "Streamlined Process",
            description: "Complete government processes online with our platform"
        },
        {
            title: "End-to-End Solution",
            description: "From job posting to hiring, we've got you covered"
        }
    ];

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold px-4 md:px-4 lg:px-52 my-8">Recruit from Bangladesh</h1>
                <Tabs defaultValue="government" className="w-full">
                    <div className="overflow-x-auto no-scrollbar">
                        <TabsList className="bg-white w-max md:w-max lg:w-full whitespace-nowrap flex gap-2 rounded-xl px-0 md:px-0 lg:px-52">
                            <TabsTrigger value="government" className="flex items-center gap-2 cursor-pointer relative px-3 py-2 text-sm font-medium border-none shadow-none transition-all duration-200 data-[state=active]:text-foreground data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-darkGreen">
                                <Image src="/gov-icon.png" alt="Gov" className="w-5 h-5" width={20} height={20} />
                                Local Employers
                            </TabsTrigger>
                            <TabsTrigger value="brac" className="flex items-center gap-2 cursor-pointer relative px-3 py-2 text-sm font-medium border-none shadow-none transition-all duration-200 data-[state=active]:text-foreground data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-darkGreen">
                                <Image src="/brac-icon.png" alt="BRAC" className="w-5 h-5" width={20} height={20} />
                                Foreign Employers
                            </TabsTrigger>
                            <TabsTrigger value="job" className="flex items-center gap-2 cursor-pointer">
                                <Image src="/job-icon.png" alt="Job" className="w-5 h-5" width={20} height={20} />
                                Training Institute
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className='pl-0 md:pl-0 lg:pl-4'>
                        <TabsContent value="government" className="w-full md:w-full lg:w-4/5 mx-auto bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-md flex flex-col md:flex-col lg:flex-row items-center mt-5">
                            <div className='w-3/4 md:w-3/4 lg:w-1/2 py-4 pl-4'>
                                {/* Right Image with Scroll Animation */}
                                <motion.div
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                    <div>
                                        <Carousel
                                            plugins={[plugin.current]}
                                            className="w-full rounded-xl shadow-lg"
                                            onMouseEnter={plugin.current.stop}
                                            onMouseLeave={plugin.current.reset}
                                        >
                                            <CarouselContent>
                                                {carouselItems.map((item, index) => (
                                                    <CarouselItem key={index}>
                                                        <div className="p-8 h-80 flex flex-col justify-center">
                                                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                                            <p className="text-lg">{item.description}</p>
                                                        </div>
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                        </Carousel>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="w-full p-6">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">
                                        Recruiting Agency Portal
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p>
                                        Our full-stack recruitment ERP empowers your agency with end-to-end solutions.
                                        Post jobs, source verified candidates, complete government processes online,
                                        and gain complete recruitment visibility.
                                    </p>
                                </CardContent>
                                <CardFooter className="flex flex-col sm:flex-row gap-3 mt-6">
                                    <Button className="bg-white text-darkGreen w-full rounded-full sm:w-auto">
                                        Sign up now
                                    </Button>
                                </CardFooter>
                            </div>
                        </TabsContent>
                    </div>
                    <TabsContent value="brac">
                        <div className="mt-6 space-y-4">
                            <h3 className="font-semibold text-lg">Brac</h3>
                            <p className="text-muted-foreground">
                                Skip queues and securely register into Bangladesh’s migrant database...
                            </p>

                            <h3 className="font-semibold text-lg">Pre-departure orientation</h3>
                            <p className="text-muted-foreground">
                                Enroll into PDO classes, attend via biometric verification...
                            </p>

                            <h3 className="font-semibold text-lg">General training</h3>
                            <p className="text-muted-foreground">
                                Advance your career and enroll into hundreds of skill-based courses...
                            </p>

                            <h3 className="font-semibold text-lg">Emigration Clearance</h3>
                            <p className="text-muted-foreground">
                                Apply for Emigration clearance digitally and avoid queues...
                            </p>
                        </div>
                    </TabsContent>

                    {/* Add other tab contents similarly */}
                </Tabs>
            </div>
        </div>
    );
};

export default RecruitFromBangladeshSectionComponent;