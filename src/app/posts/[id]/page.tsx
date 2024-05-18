import type { Metadata } from 'next'

import { PostDetails } from '@/components/PostDetails'

export default async function PostDetailsPage() {
  return <PostDetails />
}

export const metadata: Metadata = {
  title: 'Post'
}
