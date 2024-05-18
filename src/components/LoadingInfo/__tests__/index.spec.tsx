import React from 'react'
import { render } from '@testing-library/react'
import { LoadingInfo } from '../index'

describe('<LoadingInfo />', () => {
  test('renders children when status is true', () => {
    const { getByText } = render(
      <LoadingInfo status error=''>
        <div>Content</div>
      </LoadingInfo>
    )

    expect(getByText('Content')).toBeInTheDocument()
  })

  test('renders error message when error is present', () => {
    const { getByText } = render(
      <LoadingInfo status={false} error='Error message'>
        <div>Content</div>
      </LoadingInfo>
    )

    expect(getByText('Something went wrong')).toBeInTheDocument()
  })

  test('does not render children when status is false and no error', () => {
    const { queryByText } = render(
      <LoadingInfo status={false} error=''>
        <div>Content</div>
      </LoadingInfo>
    )

    expect(queryByText('Content')).not.toBeInTheDocument()
  })
})
