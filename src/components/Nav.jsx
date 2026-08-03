'use client'

import { useState, useEffect, useCallback } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { List, X } from '@phosphor-icons/react'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
]

export default function Nav({ active, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 8)
  })

  useEffect(() => {
    setIsMenuOpen(false)
  }, [active])

  const handleNavigate = useCallback(
    (id) => {
      onNavigate(id)
      setIsMenuOpen(false)
    },
    [onNavigate]
  )

  useEffect(() => {
    if (!isMenuOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/80 backdrop-blur-lg border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavigate('home')
            }}
            className="font-mono text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-200"
          >
            CN
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigate(link.id)
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active === link.id
                      ? 'text-accent bg-accent-muted'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors duration-200 cursor-pointer"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-surface/95 backdrop-blur-md"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="relative flex flex-col items-center justify-center min-h-dvh gap-6 px-6">
            {links.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate(link.id)
                }}
                className={`text-2xl font-medium transition-all duration-200 ${
                  active === link.id
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
