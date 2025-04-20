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


const KeyImpactsPage = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1>Key Impacts</h1>
                <Link href={'/admin/keyImpacts/add-keyImpacts'} className="addButton">Add Key Impact</Link>
            </div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead className="w-[100px]">Title (English)</TableHead>
                        <TableHead>Title (Bangla)</TableHead>
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

export default KeyImpactsPage