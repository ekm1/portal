import { render } from '@testing-library/react'
import { Card, CardProps } from '../index'


describe('<Card />', () => {
  const defaultProps: CardProps = {
    title: 'Test Title',
    description: 'Test Description',
    highlighted: false
  }

  test('renders card with default props', () => {
    const { getByText } = render(<Card {...defaultProps} />)
    expect(getByText('Test Title')).toBeInTheDocument()
    expect(getByText('Test Description')).toBeInTheDocument()
  })

  test('renders card with highlighted class', () => {
    const { container } = render(<Card {...defaultProps} highlighted />)
    expect(container.firstChild).toHaveClass('animate-pulse')
    expect(container.firstChild).toHaveClass('duration-600')
  })

  test('truncates description if longer than 100 characters', () => {
    const longDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    const { getByText } = render(<Card {...defaultProps} description={longDescription} />)
    expect(getByText(`${'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'.slice(0, 100)}...`)).toBeInTheDocument()
  })
})
