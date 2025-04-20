"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import Image from "next/image"

const HeroSliderSectionComponent = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    const heroSlides = [
        {
            title: "Recruitment Re-imagined",
            description: "Recruit top talent from Bangladesh with our all-in-one platform",
            image: "/recruitment-dashboard.png"
        },
        {
            title: "Connect with Top Employers",
            description: "Our recruitment portal bridges the gap between job seekers and top employers.",
            image: "/recruitment-dashboard.png"
        },
        {
            title: "Launch Your Career",
            description: "Find the perfect job and take your career to the next level with ease.",
            image: "/recruitment-dashboard.png"
        }
    ];

    return (
        <section className="bg-gradient-to-r from-green-600 to-teal-500 text-white">
            <Carousel
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                className="w-full"
            >
                <CarouselContent>
                    {heroSlides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <div className="container mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center justify-between">
                                <div className="max-w-xl space-y-6 text-center lg:text-left">
                                    <h1 className="text-4xl font-bold leading-tight">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg">
                                        {slide.description}
                                    </p>
                                    <Button className="bg-white text-black font-semibold">
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Login/Sign up to recruitment portal
                                    </Button>
                                    <div className="flex justify-center lg:justify-start space-x-4 pt-4">
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
                                        src={slide.image}
                                        alt="Recruitment Dashboard"
                                        width={600}
                                        height={400}
                                        className="rounded-lg shadow-xl"
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-16 opacity-100 hover:opacity-100" />
                <CarouselNext className="mr-16 opacity-100 hover:opacity-100" />
            </Carousel>
        </section>
    );
};

export default HeroSliderSectionComponent;
