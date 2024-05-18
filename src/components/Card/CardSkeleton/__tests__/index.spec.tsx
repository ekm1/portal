import React from 'react'
import { render } from '@testing-library/react'
import { CardSkeleton } from '../index'

describe('<CardSkeleton />', () => {
  test('renders loading skeleton', () => {
    const { getByText, getByTestId } = render(<CardSkeleton />)

    const loadingText = getByText('Loading...')
    expect(loadingText).toBeInTheDocument()

    const skeletonElements = getByTestId('skeleton')
    expect(skeletonElements).toBeInTheDocument()
    expect(skeletonElements.children.length).toBe(1)

  })
})
