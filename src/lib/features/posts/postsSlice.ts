import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPostByIdService, fetchPostsService } from '@/lib/features/posts/postsAPI'
import { Post } from '@/types'
import { globalConfig } from '../../../config'

type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface Pagination {
  lastPostId?: number;
  limit: number
}

interface StoryResponse {
  data?: Post[];
  loadingStatus: LoadingStatus;
  error: string;
  limit: number;
}

export const initialState: StoryResponse = {
  loadingStatus: 'idle',
  error: '',
  limit: globalConfig.postLimitSize
}


export const fetchPosts = createAsyncThunk(
  'jobs/fetchPosts',
  async () =>
    fetchPostsService()
)

export const fetchMorePosts = createAsyncThunk(
  'jobs/fetchMorePosts',
  async ({ lastPostId, limit }: Pagination) =>
    fetchPostsService(lastPostId, limit)
)

export const fetchPostById = createAsyncThunk(
  'jobs/fetchPostById',
  async (id: string) =>
    fetchPostByIdService(id)
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setReceivedPost: (state, action: PayloadAction<Post>) => {
      state.data = [action.payload, ...state.data ?? []]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loadingStatus = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded'
        state.data = [...action.payload]
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loadingStatus = 'failed'
        state.data = []
        state.error = action.error.message!
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.data = [action.payload]
      })
      .addCase(fetchMorePosts.fulfilled, (state, action) => {
        state.data = [...state.data ?? [], ...action.payload]
      })
  }
})

export const { setReceivedPost } = postsSlice.actions