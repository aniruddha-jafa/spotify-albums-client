import React from 'react'
import { render, screen, getByRole } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'


describe('Navbar & navigation tests', () => {

  beforeEach(() => {
    render(<App />)
  })

  test('Has navbar', () => {
    const navbar = screen.getByRole('navigation')
    expect(navbar).toBeInTheDocument()
    expect(navbar).toHaveTextContent(/spotify/i)
  })

  test('Navbar has link to /about', () => {
    const navbar = screen.getByRole('navigation')
    const aboutLink = getByRole(navbar, 'link', { name: 'About' })
    expect(aboutLink).toBeInTheDocument()
    expect(aboutLink).toHaveAttribute('href', '/about')
  
  })
 
  test('Clicking on About takes us to About page', () => {
    userEvent.click(screen.getByRole('link', { name: 'About' }))
    const aboutPageHeading = screen.getByRole('heading', { name: 'About' })
    expect(aboutPageHeading).toBeInTheDocument()
    expect(screen.getByText(/this app uses spotify's api/i)).toBeInTheDocument()
  })
})