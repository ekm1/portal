import { posts } from '../data'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const post = posts.find((p) => p.id === parseInt(id, 10))

  if (!post) {
    return new Response('Post not found', { status: 404 })
  }

  return Response.json(post)
}