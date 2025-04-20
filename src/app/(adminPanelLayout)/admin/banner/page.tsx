import {
    Table,
    TableBody,
    TableCaption,
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


const BannerPage = () => {
    return (
        <div>
            {/* Banner preview */}
            <div className="mb-10">
                <h1 className="mb-5">Banner Preview</h1>
                <div className="flex items-center justify-center">
                    <Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <span className="text-4xl font-semibold">{index + 1}</span>
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
            <Table>

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
            </Table>

        </div>
    )
}

export default BannerPage