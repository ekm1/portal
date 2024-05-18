import { Post } from '@/types'

const BASE_URL = 'http://localhost:3000/api/posts'
export const fetchPostsService = async (lastPostId?: number, limit?: number) => {
  const url = new URL(BASE_URL)
  const params = new URLSearchParams()

  if (lastPostId) {
    params.append('lastPostId', lastPostId.toString())
  }
  if (limit) {
    params.append('limit', limit.toString())
  }
  url.search = params.toString()

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const result: Post[] = await response.json()

  return result
}

export const fetchPostByIdService = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const result: Post = await response.json()

  return result
}

