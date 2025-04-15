import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2 className='text-green-600'>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/"> Return Home </Link>
    </div>
  )
}