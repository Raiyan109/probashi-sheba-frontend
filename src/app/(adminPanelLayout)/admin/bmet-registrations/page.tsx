import { BMETTAble } from "@/components/AdminPanel/BMETRegistration/BMETTable"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getBMET } from "@/lib/api"
import { getQueryClient } from "@/lib/get-query-client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import Link from "next/link"


export default async function BMETRegistrationsPage() {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['bmet'],
        queryFn: getBMET
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex items-center justify-between mb-5">
                <h1>BMET Registrations</h1>
                {/* <Link href={'/admin/faq/add-faq'} className="addButton">Add FAQ</Link> */}
            </div>

            {/* Table */}
            {/* <div className="overflow-x-auto max-w-[320px] sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-full mx-auto shadow-xl">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Name (English)</TableHead>
                            <TableHead>Name (Bangla)</TableHead>
                            <TableHead>Occupation (English)</TableHead>
                            <TableHead>Occupation (Bangla)</TableHead>
                            <TableHead>Comment (English)</TableHead>
                            <TableHead>Comment (Bangla)</TableHead>
                            <TableHead>Rating</TableHead>
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
            </div> */}

            <BMETTAble />

        </HydrationBoundary>
    )
}

