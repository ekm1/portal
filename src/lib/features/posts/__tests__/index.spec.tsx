import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import {
  fetchPosts,
  fetchMorePosts,
  fetchPostById,
  postsSlice
} from '../postsSlice'
import { fetchPostsService, fetchPostByIdService } from '@/lib/features/posts/postsAPI'
import { setReceivedPost } from '@/lib/features/posts/postsSlice'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('@/lib/features/posts/postsAPI', () => ({
  fetchPostsService: jest.fn(),
  fetchPostByIdService: jest.fn()
}))

describe('postsSlice async actions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch posts', async () => {
    const store = mockStore({})
    const fakePosts = [{ id: 1, title: 'Post 1' }]
    fetchPostsService.mockResolvedValue(fakePosts)

    await store.dispatch(fetchPosts())

    const actions = store.getActions()
    expect(actions[0].type).toEqual(fetchPosts.pending.type)
    expect(actions[1].type).toEqual(fetchPosts.fulfilled.type)
    expect(actions[1].payload).toEqual(fakePosts)
  })

  it('should fetch more posts', async () => {
    const store = mockStore({})
    const lastPostId = 1
    const limit = 10
    const fakePosts = [{ id: 2, title: 'Post 2' }]
    fetchPostsService.mockResolvedValue(fakePosts)

    await store.dispatch(fetchMorePosts({ lastPostId, limit }))

    const actions = store.getActions()
    expect(actions[0].type).toEqual(fetchMorePosts.pending.type)
    expect(actions[1].type).toEqual(fetchMorePosts.fulfilled.type)
    expect(actions[1].payload).toEqual(fakePosts)
  })

  it('should fetch post by id', async () => {
    const store = mockStore({})
    const postId = '1'
    const fakePost = { id: 1, title: 'Post 1' }
    fetchPostByIdService.mockResolvedValue(fakePost)

    await store.dispatch(fetchPostById(postId))

    const actions = store.getActions()
    expect(actions[0].type).toEqual(fetchPostById.pending.type)
    expect(actions[1].type).toEqual(fetchPostById.fulfilled.type)
    expect(actions[1].payload).toEqual(fakePost)
  })
})

describe('postsSlice reducers', () => {
  it('should handle setReceivedPost reducer', () => {
    const initialState = {
      data: []
    }
    const newState = postsSlice.reducer(initialState, {
      type: setReceivedPost.type,
      payload: { id: 1, title: 'New Post' }
    })
    expect(newState.data).toEqual([{ id: 1, title: 'New Post' }])
  })
})
