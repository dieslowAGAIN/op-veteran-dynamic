'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  MessageSquare,
  Image,
  Settings,
  BarChart,
  Shield,
  ChevronLeft,
  ChevronRight,
  Palette,
  Globe,
  DollarSign,
  Briefcase,
  Menu,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Content',
    icon: FileText,
    submenu: [
      { title: 'Pages', href: '/admin/pages' },
      { title: 'Blog Posts', href: '/admin/posts' },
      { title: 'Hero Section', href: '/admin/hero' },
      { title: 'Pillars', href: '/admin/pillars' },
    ],
  },
  {
    title: 'Events',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    title: 'People',
    icon: Users,
    submenu: [
      { title: 'Team Members', href: '/admin/team' },
      { title: 'Partners', href: '/admin/partners' },
      { title: 'Admin Users', href: '/admin/users' },
    ],
  },
  {
    title: 'Messages',
    href: '/admin/contacts',
    icon: MessageSquare,
  },
  {
    title: 'Media',
    icon: Image,
    submenu: [
      { title: 'Library', href: '/admin/media' },
      { title: 'Press/Media', href: '/admin/media-items' },
    ],
  },
  {
    title: 'Financials',
    href: '/admin/financials',
    icon: DollarSign,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart,
  },
  {
    title: 'Settings',
    icon: Settings,
    submenu: [
      { title: 'Site Settings', href: '/admin/settings' },
      { title: 'Theme', href: '/admin/theme' },
      { title: 'SEO', href: '/admin/seo' },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-veteran-navy text-white p-3 rounded-full shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'bg-white shadow-lg transition-all duration-300 h-[calc(100vh-64px)] sticky top-16',
          collapsed ? 'w-20' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          'fixed lg:relative z-40'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center p-4 hover:bg-gray-100 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                        isActive(item.href)
                          ? 'bg-veteran-gold/10 text-veteran-gold'
                          : 'hover:bg-gray-100 text-gray-700'
                      )}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleExpanded(item.title)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                          'hover:bg-gray-100 text-gray-700'
                        )}
                        title={collapsed ? item.title : undefined}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 text-left">{item.title}</span>
                            <ChevronRight
                              className={cn(
                                'w-4 h-4 transition-transform',
                                expandedItems.includes(item.title) && 'rotate-90'
                              )}
                            />
                          </>
                        )}
                      </button>
                      {!collapsed && expandedItems.includes(item.title) && item.submenu && (
                        <ul className="mt-2 ml-4 space-y-1">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.href}>
                              <Link
                                href={subitem.href}
                                className={cn(
                                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                                  isActive(subitem.href)
                                    ? 'bg-veteran-gold/10 text-veteran-gold'
                                    : 'hover:bg-gray-100 text-gray-600'
                                )}
                              >
                                <span className="w-1 h-1 bg-gray-400 rounded-full" />
                                {subitem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          {!collapsed && (
            <div className="p-4 border-t">
              <div className="text-xs text-gray-500">
                <p>O.P. Veteran Admin</p>
                <p className="mt-1">v1.0.0</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}