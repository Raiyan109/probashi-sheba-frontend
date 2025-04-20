"use client"
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const WhoWeAreSectionComponent = () => {
    return (
        <div>
            {/* Who We Are Section */}
            <section className="bg-white text-black py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8 text-green-600">Who we are</h2>
                    <p className="mb-12 max-w-sm sm:max-w-full">
                        Ami Probashi is a comprehensive digital platform designed to bring
                        transparency, reduce migration costs, and speed up migration processes
                        through convenient online services available right at your doorstep.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dolor itaque fuga eius possimus voluptatibus non quas voluptas dolorem. Dolor quasi autem suscipit dolore. Ipsum tempora ad quisquam consequatur rerum.
                    </p>

                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="w-full md:w-1/2 border border-red-500">
                            <Card className="h-3/4">
                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold text-green-600">7 million+</h3>
                                    <p className="text-sm mt-2">Unique services taken from our platform</p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid grid-cols-2 gap-6 max-w-sm sm:max-w-full mx-auto border border-red-500 h-3/4">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold text-green-600">5 million</h3>
                                    <p className="text-sm mt-2">Aspiring migrants on our database</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold text-green-600">12 days</h3>
                                    <p className="text-sm mt-2">Quicker to migrate using our platform</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold text-green-600">$500 saved</h3>
                                    <p className="text-sm mt-2">On average per migrant</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold text-green-600">2,500+</h3>
                                    <p className="text-sm mt-2">Employers use our platform</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>


                </div>
            </section>
        </div>
    );
};

export default WhoWeAreSectionComponent;