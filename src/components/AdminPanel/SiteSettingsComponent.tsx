"use client"

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SiteSettingsComponent = () => {
    const [title, setTitle] = useState("");
    const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        setPreview: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async () => {

        console.log(title, faviconPreview, logoPreview);


        setLoading(true);
        try {
            const res = await fetch("/api/site-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    favicon: faviconPreview,
                    logo: logoPreview,
                }),
            });

            if (res.ok) {
                alert("Site settings saved!");
                setTitle("");
                setFaviconPreview(null);
                setLogoPreview(null);
            } else {
                alert("Failed to save settings");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            {/* favicon and website logo, title upload */}
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">Site Settings</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Website Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Website Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter website title"
                                value={title}
                                required
                                className="peer"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <p className="mt-1 text-sm text-red-500 invisible peer-invalid:visible">
                                ** Website title is required **
                            </p>
                        </div>

                        <div className='flex gap-6'>
                            {/* Favicon Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="favicon">Favicon</Label>
                                <Input
                                    id="favicon"
                                    type="file"
                                    accept="image/*"
                                    required
                                    className='peer'
                                    onChange={(e) => handleImageUpload(e, setFaviconPreview)}
                                />
                                <p className="mt-1 text-sm text-red-500 invisible peer-invalid:visible">
                                    ** Upload an image**
                                </p>
                                {faviconPreview && (
                                    <img
                                        src={faviconPreview}
                                        alt="Favicon Preview"
                                        className="w-96 h-36 md:h-52 lg:h-96 mt-2 rounded border"
                                    />
                                )}
                            </div>

                            {/* Logo Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="logo">Website Logo</Label>
                                <Input
                                    id="logo"
                                    type="file"
                                    accept="image/*"
                                    required
                                    className='peer'
                                    onChange={(e) => handleImageUpload(e, setLogoPreview)}
                                />
                                <p className="mt-1 text-sm text-red-500 invisible peer-invalid:visible">
                                    ** Upload an image**
                                </p>
                                {logoPreview && (
                                    <img
                                        src={logoPreview}
                                        alt="Logo Preview"
                                        className="w-96 h-36 md:h-52 lg:h-96 mt-2 border rounded"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-4">
                            <Button onClick={handleSubmit}>{loading ? "Saving..." : "Save Settings"}</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

export default SiteSettingsComponent;