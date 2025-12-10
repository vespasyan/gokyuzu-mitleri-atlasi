'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Gökyüzü Haritası', href: '/' },
  { name: 'Mitoloji Hikayeleri', href: '/stories' },
  { name: 'Çağdaş Sanat', href: '/art' },
  { name: 'Hakkında', href: '/about' },
  { name: 'İletişim', href: '/contact' },
  { name: 'Analitik', href: '/analytics' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 panel-backdrop border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 focus-ring rounded-lg px-2 py-1"
            >
              <Image 
                src="/images/logo.png" 
                alt="Gökyüzü Mitleri Atlası Logo" 
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-bold text-lg text-white">
                Gökyüzü Mitleri Atlası
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-ring
                  ${pathname === item.href
                    ? 'text-star-400 bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus-ring"
              aria-expanded="false"
            >
              <span className="sr-only">Ana menüyü aç</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-400/95 backdrop-blur-lg border-t border-white/10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus-ring
                  ${pathname === item.href
                    ? 'text-star-400 bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}