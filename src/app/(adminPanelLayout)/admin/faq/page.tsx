import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"


const FaqPage = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1>FAQ</h1>
                <Link href={'/admin/faq/add-faq'} className="addButton">Add FAQ</Link>
            </div>
            <Table>
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
            </Table>

        </div>
    )
}

export default FaqPage