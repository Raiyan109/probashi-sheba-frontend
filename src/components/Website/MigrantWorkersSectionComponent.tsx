"use client"
import { motion } from "framer-motion"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export const MigrantWorkersSectionComponent = () => {
    return (
        <div className="bg-cream pt-10 pb-32">
            <div>
                <Tabs defaultValue="government" className="w-full">
                    <TabsList className="flex flex-wrap gap-2 rounded-xl px-52">
                        <TabsTrigger value="government" className="flex items-center gap-2 cursor-pointer relative px-3 py-2 text-sm font-medium border-none shadow-none transition-all duration-200 data-[state=active]:text-foreground data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-darkGreen">
                            <Image src="/gov-icon.png" alt="Gov" className="w-5 h-5" width={20} height={20} />
                            Government services
                        </TabsTrigger>
                        <TabsTrigger value="brac" className="flex items-center gap-2 cursor-pointer relative px-3 py-2 text-sm font-medium border-none shadow-none transition-all duration-200 data-[state=active]:text-foreground data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-darkGreen">
                            <Image src="/brac-icon.png" alt="BRAC" className="w-5 h-5" width={20} height={20} />
                            BRAC Services
                        </TabsTrigger>
                        <TabsTrigger value="job" className="flex items-center gap-2 cursor-pointer">
                            <Image src="/job-icon.png" alt="Job" className="w-5 h-5" width={20} height={20} />
                            Job & training
                        </TabsTrigger>
                        <TabsTrigger value="career" className="flex items-center gap-2 cursor-pointer">
                            <Image src="/career-icon.png" alt="Career" className="w-5 h-5" width={20} height={20} />
                            Career Consultancy
                        </TabsTrigger>
                        <TabsTrigger value="lifestyle" className="flex items-center gap-2 cursor-pointer">
                            <Image src="/lifestyle-icon.png" alt="Lifestyle" className="w-5 h-5" width={20} height={20} />
                            Lifestyle service
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="government" className="flex justify-around gap-56 items-center mt-10">
                        <div className="mt-6 space-y-4">
                            <h3 className="font-semibold text-lg">BMET registration</h3>
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
                        <div>
                            {/* Right Image with Scroll Animation */}
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <Image
                                    src="https://cit-node.blr1.cdn.digitaloceanspaces.com/shoe-pos/a96523d8-1c16-474e-a8b2-9aadf5e23d9d-SPARX%20Flip%20flops%20for%20Gents.webp"
                                    alt="Mobile App"
                                    className="w-80 max-w-full rounded-lg shadow-lg"
                                    width={320}
                                    height={320}
                                />
                            </motion.div>
                        </div>
                    </TabsContent>
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
    )
}
