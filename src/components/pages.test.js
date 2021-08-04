import React from 'react'
import { render, screen } from '@testing-library/react'

import { About } from './pages'

test('About component renders with correct heading', () => {
  render(<About />)
  const aboutHeader = screen.getByRole('heading', { name: 'About' })
  expect(aboutHeader).toBeInTheDocument()
})