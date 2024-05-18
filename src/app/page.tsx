import type { Metadata } from 'next'
import { Posts } from '@/components/Posts'

export default async function IndexPage() {

  return <Posts />
}

export const metadata: Metadata = {
  title: 'Portal Posts'
}
