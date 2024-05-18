'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { useFetchPosts } from '@/hooks/useFetchPosts'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { setReceivedPost } from '@/lib/features/posts/postsSlice'
import { LoadingInfo } from '@/components/LoadingInfo'
import { getAvatarUrl } from '@/utils'
import { Card } from '@/components/Card'
import { CardSkeleton } from '@/components/Card/CardSkeleton'
import { Post } from '@/types'
import { socket } from '../../socket'
import { globalConfig } from '../../config'

export const Posts = () => {
  const { posts, postsLoading, postsError, dispatchFetchMorePosts } = useFetchPosts()
  const dispatch = useDispatch()
  const [highlightedPostId, setHighlightedPostId] = useState<number | null>(null)
  const targetEl = useRef<HTMLDivElement>(null)
  const { isLoading } = useInfiniteScroll<Post | undefined>(targetEl, dispatchFetchMorePosts)

  useEffect(() => {
    let highlightTimeout: ReturnType<typeof setTimeout> | null = null

    const handleNewPost = (post: Post) => {
      dispatch(setReceivedPost(post))
      setHighlightedPostId(post.id)
      highlightTimeout && clearTimeout(highlightTimeout)
      highlightTimeout = setTimeout(() => {
        setHighlightedPostId(null)
      }, 10000)
    }

    socket.on('newPost', handleNewPost)

    return () => {
      socket.off('newPost', handleNewPost)
      highlightTimeout && clearTimeout(highlightTimeout)
    }
  }, [dispatch])

  return (
    <div className='container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col gap-4'>
      <LoadingInfo status={postsLoading} error={postsError}>
        {Array.from({ length: globalConfig.postLimitSize }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CardSkeleton key={index} />
        ))}
      </LoadingInfo>
      {posts?.map((post) => (
        <Link key={post.id} href={`posts/${post.id}`}>
          <Card
            title={post.title}
            description={post.content}
            avatarUrl={getAvatarUrl(post.userId)}
            highlighted={post.id === highlightedPostId}
          />
        </Link>
      ))}
      {isLoading && <CardSkeleton />}
      <div ref={targetEl} />
    </div>
  )
}
