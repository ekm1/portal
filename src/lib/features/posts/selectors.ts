import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/lib/store'

export const selectPosts = (state: RootState) => state.posts

export const selectPostById = createSelector(
  [(state: RootState) => state.posts.data, (_: RootState, id: string) => id],
  (posts, id) => posts?.find(post => String(post.id) === id)
)