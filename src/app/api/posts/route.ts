import { posts } from './data'
import { globalConfig } from '../../../config'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const lastPostId = parseInt(url.searchParams.get('lastPostId') || '0', 10)
  const limit = parseInt(url.searchParams.get('limit') ?? '', 10) || globalConfig.postLimitSize

  const startIndex = posts.findIndex(post => post.id === lastPostId) + 1
  const endIndex = startIndex + limit

  const paginatedPosts = posts.slice(startIndex, endIndex)

  // Introduce a 1-second delay using setTimeout
  await new Promise(resolve => {
    setTimeout(resolve, 1000)
  })

  return Response.json(paginatedPosts)
}