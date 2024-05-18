import * as React from 'react'
import { useRef } from 'react'

import { fireEvent, render, screen } from '@testing-library/react'

import { useInfiniteScroll } from '../useInfiniteScroll'

const mockMethod = jest.fn()

let isIntersecting = false

class IntersectionObserverMock {
  constructor(callback, options) {
    this.callback = callback
    this.options = options
  }

  observe(element) {
    this.callback([{ isIntersecting }])
  }

  unobserve() {
  }
}

global.IntersectionObserver = IntersectionObserverMock

function TestComponent() {
  const ref = useRef()
  const { isLoading, hasMore } = useInfiniteScroll(ref, mockMethod)
  return (
    <div>
      <div data-testid='isLoading'>{isLoading.toString()}</div>
      <div data-testid='hasMore'>{hasMore.toString()}</div>
      <div ref={ref} />
    </div>
  )
}

describe('useInfiniteScroll', () => {
  it('should initialize with isLoading as false and hasMore as true', () => {
    render(<TestComponent />)
    const isLoadingElement = screen.getByTestId('isLoading')
    const hasMoreElement = screen.getByTestId('hasMore')

    expect(isLoadingElement).toHaveTextContent('false')
    expect(hasMoreElement).toHaveTextContent('true')
  })

  it('should call the method when scrolled into view', () => {
    isIntersecting = true
    render(<TestComponent />)
    fireEvent.scroll(window, { target: { scrollY: 1000 } })
    expect(mockMethod).toHaveBeenCalled()
  })
})
