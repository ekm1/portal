import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchMorePosts, fetchPosts } from '@/lib/features/posts/postsSlice'
import { selectPosts } from '@/lib/features/posts/selectors'
import { Post } from '@/types'

export function useFetchPosts() {
  const dispatch = useAppDispatch()
  const { data: posts, loadingStatus, error: postsError, limit: postsLimit } = useAppSelector(selectPosts)

  const postPagination = useCallback(() => ({
    lastPostId: posts?.length ? posts[posts.length - 1].id : undefined,
    limit: postsLimit
  }), [posts, postsLimit])

  const dispatchPostStories = useCallback(() => dispatch(fetchPosts()), [dispatch])

  const dispatchFetchMorePosts = useCallback(() => {
    const pagination = postPagination()
    if (pagination.lastPostId) {
      return dispatch(fetchMorePosts(pagination)).then(action => action.payload as Post[] | undefined)
    }
    return undefined
  }, [dispatch, postPagination])

  useEffect(() => {
    if (loadingStatus === 'idle') {
      dispatchPostStories()
    }
  }, [loadingStatus, dispatchPostStories])

  const postsLoading = loadingStatus === 'loading' || !posts

  return {
    posts,
    postsLoading,
    postsError,
    postsLimit,
    dispatchPostStories,
    dispatchFetchMorePosts
  }
}
