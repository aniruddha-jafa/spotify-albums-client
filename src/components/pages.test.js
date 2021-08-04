import React from 'react'
import { render, screen } from '@testing-library/react'

import { About } from './pages'

test.only('About component renders with correct heading', () => {
  render(<About />)
  const aboutHeader = screen.getByRole('heading')
  expect(aboutHeader).toBeInTheDocument()
  expect(aboutHeader).toHaveTextContent('About')
})