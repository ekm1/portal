import React from 'react'
import * as nextNavigation from 'next/navigation'
import { render } from '@/test-utils'
import { PostDetails } from '../index'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: jest.fn()
}))

describe('<PostDetails />', () => {
  test('renders post details correctly when post exists', async () => {
    const postId = '1'
    const mockPost = {
      id: postId,
      title: 'Test Title',
      content: 'Test Content',
      userId: '1'
    }

    nextNavigation.useParams.mockReturnValue({ id: postId })

    const [{ getByText, getByAltText }] = render(
      <PostDetails />, {
        initialState: {
          posts: {
            data: [mockPost]
          }
        }
      }
    )

    expect(getByText('Test Content')).toBeInTheDocument()
    expect(getByAltText('Avatar')).toBeInTheDocument()
  })
})
