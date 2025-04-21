'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getBanner } from "@/lib/api"
import Image from "next/image"
import { IBanner } from "@/types"
import BannerTable from "./BannerTable"

const BannerPreview = () => {
    const { data } = useQuery({
        queryKey: ['banner'],
        queryFn: getBanner
    })
    const bannerData = data?.data
    console.log(bannerData);

    return (
        <div>
            <div className="mb-10">
                <h1 className="mb-5">Banner Preview</h1>
                <div className="flex items-center pl-6">
                    <Carousel className="w-full">
                        <CarouselContent>
                            {bannerData.map((b: IBanner) => (
                                <CarouselItem key={b?._id}>
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-4/2 items-center justify-center p-6">
                                                {b?.banner_image && (
                                                    <Image
                                                        src={b.banner_image}
                                                        width={100}
                                                        height={100}
                                                        alt="Banner preview"
                                                    />
                                                )}

                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>

            {/* Banner list */}
            <div className="flex items-center justify-between mb-5">
                <h1>Banner list</h1>
                <Link href={'/admin/banner/add-banner'} className="addButton">Add Banner</Link>
            </div>

            <BannerTable bannerData={data} />
            {/* <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead className="w-[100px]">Title (English)</TableHead>
                        <TableHead>Title (Bangla)</TableHead>
                        <TableHead>Description (English)</TableHead>
                        <TableHead>Description (Bangla)</TableHead>
                        <TableHead>Play store link</TableHead>
                        <TableHead>App store link</TableHead>
                        <TableHead className="text-right">Category</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table> */}

        </div>
    )
}

export default BannerPreview