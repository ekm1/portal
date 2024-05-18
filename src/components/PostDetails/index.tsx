'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchPostById } from '@/lib/features/posts/postsSlice'
import { useParams } from 'next/navigation'
import { getAvatarUrl } from '@/utils'
import { selectPostById } from '@/lib/features/posts/selectors'
import Image from 'next/image'

export const PostDetails = () => {
  const params = useParams<{ id: string; }>()
  const dispatch = useAppDispatch()
  const post = useAppSelector((state) => selectPostById(state, params.id))
  const postExists = !!post

  useEffect(() => {
    if (params.id && !postExists) {
      dispatch(fetchPostById(params.id))
    }
  }, [dispatch, params.id, postExists])

  const avatarUrl = getAvatarUrl(post?.userId)

  return <div className='container mx-auto py-8'>
    <div className='bg-base-200 rounded-lg shadow-lg p-8'>
      <div className='flex items-center mb-8'>
        <div className='avatar mr-4'>
          <div className='w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            {avatarUrl && <Image width={90} height={90} src={avatarUrl} alt='Avatar' />}
          </div>
        </div>
        <div>
          <h2 className='text-2xl font-bold'>{post?.title}</h2>
        </div>
      </div>
      <div className='prose max-w-none'>
        <h1>{post?.title}</h1>
        <p>
          {post?.content}
        </p>
      </div>
    </div>
  </div>
}
