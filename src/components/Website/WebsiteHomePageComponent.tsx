import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import Image from "next/image";

const WebsiteHomePageComponent = () => {

    return (
        <div className="w-full">

            {/* Hero Section */}
            <section className="w-full bg-gradient-to-r from-green-600 to-teal-500 text-white">
                <div className="container mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center justify-between">
                    <div className="max-w-xl space-y-6">
                        <h1 className="text-4xl font-bold leading-tight">
                            Recruitment Re-imagined
                        </h1>
                        <p className="text-lg">
                            Recruit top talent from Bangladesh with our all-in-one platform
                        </p>
                        <Button className="bg-white text-black font-semibold">
                            <LogIn className="mr-2 h-4 w-4" /> Login/Sign up to recruitment portal
                        </Button>
                        <div className="flex space-x-4 pt-4">
                            <Image
                                src="/app-store-badge.png"
                                alt="App Store"
                                width={120}
                                height={40}
                            />
                            <Image
                                src="/google-play-badge.png"
                                alt="Google Play"
                                width={120}
                                height={40}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center mb-10 lg:mb-0">
                        <Image
                            src="/recruitment-dashboard.png"
                            alt="Recruitment Dashboard"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="bg-white text-black py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8 text-green-600">Who we are</h2>
                    <p className="mb-12">
                        Ami Probashi is a comprehensive digital platform designed to bring
                        transparency, reduce migration costs, and speed up migration processes
                        through convenient online services available right at your doorstep.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dolor itaque fuga eius possimus voluptatibus non quas voluptas dolorem. Dolor quasi autem suscipit dolore. Ipsum tempora ad quisquam consequatur rerum.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-2xl font-bold text-green-600">7 million+</h3>
                                <p className="text-sm mt-2">Unique services taken from our platform</p>
                            </CardContent>
                        </Card>
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
            </section>
        </div>
    );
}

export default WebsiteHomePageComponent;
