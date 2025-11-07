'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Sanat', path: '/art' },
    { name: 'Hikayeler', path: '/stories' },
    { name: 'Hakkında', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cosmic-dark-blue/80 backdrop-blur-md border-b border-cosmic-gold/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-cosmic-gold hover:text-cosmic-light-gold transition-colors">
            Gökyüzü Mitleri Atlası
          </Link>
          
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`text-lg transition-colors ${
                    pathname === item.path
                      ? 'text-cosmic-gold font-semibold'
                      : 'text-foreground hover:text-cosmic-light-gold'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
