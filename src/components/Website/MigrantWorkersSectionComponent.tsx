"use client"
import { motion } from "framer-motion"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export const MigrantWorkersSectionComponent = () => {
    return (
        <div>
            <div className="flex justify-around items-center">
                <div>
                    <Tabs defaultValue="government" className="w-full">
                        <TabsList className="flex flex-wrap gap-2 bg-muted p-2 rounded-xl">
                            <TabsTrigger value="government" className="flex items-center gap-2">
                                <Image src="/gov-icon.png" alt="Gov" className="w-5 h-5" width={20} height={20} />
                                Government services
                            </TabsTrigger>
                            <TabsTrigger value="brac" className="flex items-center gap-2">
                                <Image src="/brac-icon.png" alt="BRAC" className="w-5 h-5" width={20} height={20} />
                                BRAC Services
                            </TabsTrigger>
                            <TabsTrigger value="job" className="flex items-center gap-2">
                                <Image src="/job-icon.png" alt="Job" className="w-5 h-5" width={20} height={20} />
                                Job & training
                            </TabsTrigger>
                            <TabsTrigger value="career" className="flex items-center gap-2">
                                <Image src="/career-icon.png" alt="Career" className="w-5 h-5" width={20} height={20} />
                                Career Consultancy
                            </TabsTrigger>
                            <TabsTrigger value="lifestyle" className="flex items-center gap-2">
                                <Image src="/lifestyle-icon.png" alt="Lifestyle" className="w-5 h-5" width={20} height={20} />
                                Lifestyle service
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="government">
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
            </div>
        </div>
    )
}
