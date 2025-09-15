// User types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

// Content types
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: any; // This will be structured JSON for the page builder
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  email?: string;
  linkedin?: string;
  order: number;
  isActive: boolean;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  order: number;
  isActive: boolean;
}

export interface MediaItem {
  id: string;
  type: 'video' | 'article' | 'interview';
  title: string;
  description: string;
  url?: string;
  embedCode?: string;
  thumbnail?: string;
  publishedAt: Date;
  isActive: boolean;
}

export interface Financial {
  id: string;
  year: string;
  quarter?: string;
  imageUrl: string;
  description?: string;
  order: number;
  isActive: boolean;
}

// Blog types
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  categoryId?: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  isVirtual: boolean;
  virtualLink?: string;
  maxAttendees?: number;
  currentAttendees: number;
  image?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  registeredAt: Date;
}

// Form submissions
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  submittedAt: Date;
}

// Settings
export interface SiteSettings {
  siteName: string;
  tagline: string;
  logo?: string;
  favicon?: string;
  ein?: string;
  irsLink?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  headerFont: string;
  customCSS?: string;
}