
import { FaqTable } from "@/components/AdminPanel/Faq/FaqTable"
import { getFaq } from "@/lib/api"
import { getQueryClient } from "@/lib/get-query-client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import Link from "next/link"


const FaqPage = async () => {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['faq'],
        queryFn: getFaq
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex items-center justify-between mb-5">
                <h1>FAQ</h1>
                <Link href={'/admin/faq/add-faq'} className="addButton">Add FAQ</Link>
            </div>

            <FaqTable />
            {/* <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Qustion (English)</TableHead>
                        <TableHead>Qustion (Bangla)</TableHead>
                        <TableHead>Answer (English)</TableHead>
                        <TableHead>Answer (Bangla)</TableHead>
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

        </HydrationBoundary>
    )
}

export default FaqPage