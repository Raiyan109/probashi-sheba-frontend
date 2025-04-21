
"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { ChevronDown, QrCode } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLanguage } from '@/context/LanguageContext';
const Navbar = () => {

    const [open, setOpen] = useState(false);

    const { lang, setLang } = useLanguage(); // Use context
    


    return (
        <div>
            {/* Navbar */}
            <header className="bg-white shadow-md fixed w-full top-0 z-50 flex">
                <div className="container mx-auto px-4 py-4 flex items-center">
                    <div className="flex items-center space-x-2">
                        <Image src="https://cit-node.blr1.cdn.digitaloceanspaces.com/shoe-pos/a96523d8-1c16-474e-a8b2-9aadf5e23d9d-SPARX%20Flip%20flops%20for%20Gents.webp" alt="Logo" width={40} height={40} className='rounded-full' />
                        <span className="font-bold text-lg text-green-700">Probashi Sheba</span>
                    </div>
                    <nav className="hidden md:flex items-center text-sm text-gray-700 ml-2">
                        <a href="#" className="hover:text-green-600 p-3 font-bold">Home</a>
                        <Popover open={open} onOpenChange={setOpen}>
                            <div onMouseEnter={() => setOpen(true)}
                                onMouseLeave={() => setOpen(false)}
                                className="relative">
                                <PopoverTrigger className="flex items-center gap-1 hover:text-green-600 hover:cursor-pointer p-3 font-bold">
                                    Services <ChevronDown className="w-4 h-4" />
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-6 grid grid-cols-4 gap-6" onMouseEnter={() => setOpen(true)}
                                    onMouseLeave={() => setOpen(false)}>
                                    <div>
                                        <h4 className="text-green-700 font-semibold mb-2">Government</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li><a href="#" className="hover:text-green-600">BMET Registration</a></li>
                                            <li><a href="#" className="hover:text-green-600">PDO (Pre-Departure Orientation)</a></li>
                                            <li><a href="#" className="hover:text-green-600">General Training</a></li>
                                            <li><a href="#" className="hover:text-green-600">BMET Clearance (Smart Card)</a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-green-700 font-semibold mb-2">Job</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li><a href="#" className="hover:text-green-600">Find Job</a></li>
                                            <li><a href="#" className="hover:text-green-600">Make CV</a></li>
                                            <li><a href="#" className="hover:text-green-600">Take Career Consultancy</a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-green-700 font-semibold mb-2">Life Style</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li><a href="#" className="hover:text-green-600">Online Doctor (Probashi Health)</a></li>
                                            <li><a href="#" className="hover:text-green-600">Entertainment (Coming Soon)</a></li>
                                            <li><a href="#" className="hover:text-green-600">e-Learning (Coming Soon)</a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-green-700 font-semibold mb-2">BRAC</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li><a href="#" className="hover:text-green-600">Returnee Migrants</a></li>
                                            <li><a href="#" className="hover:text-green-600">Skill Training</a></li>
                                            <li><a href="#" className="hover:text-green-600">Overseas Employment</a></li>
                                        </ul>
                                    </div>
                                </PopoverContent>
                            </div>
                        </Popover>
                        <a href="#" className="hover:text-green-600 p-3 font-bold">Recruitment</a>
                        <a href="#" className="hover:text-green-600 p-3 font-bold">Government</a>
                        <a href="#" className="hover:text-green-600 p-3 font-bold">Portals</a>
                        <a href="#" className="hover:text-green-600 p-3 font-bold">Download Cards</a>
                    </nav>
                </div>
                <div className="flex items-center mr-6 gap-2">
                    <div>
                        <Button className='py-4 border rounded-full border-darkGreen bg-white hover:bg-white text-darkGreen text-sm w-[150px] text-left whitespace-normal leading-tight'><QrCode className='!w-6 !h-6'/>Get Probashi Sheba App</Button>
                    </div>
                    <div className='border-r-2 border-r-darkGreen h-6 '>
                    </div>
                    <div className="flex py-1 bg-white border px-1 rounded-full border-darkGreen overflow-hidden">
                        <button
                            onClick={() => setLang('en')}
                            className={`px-4 py-1 text-sm font-semibold rounded-full cursor-pointer transition-all ${lang === 'en' ? 'bg-[#16827A] text-white' : 'text-[#0F172A]'
                                }`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLang('bn')}
                            className={`px-4 py-1 text-sm font-semibold rounded-full cursor-pointer transition-all ${lang === 'bn' ? 'bg-[#16827A] text-white' : 'text-[#0F172A]'
                                }`}
                        >
                            বাংলা
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;