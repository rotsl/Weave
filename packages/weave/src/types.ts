// Copyright 2026 Rohan R
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

// Weave Language Types
// Inspired by Wisp: zero-config, semantic-first, content-aware

export interface WeaveAST {
  type: 'page';
  name: string;
  children: WeaveNode[];
  theme?: string;
  darkMode?: boolean;
  metadata?: PageMetadata;
}

export interface PageMetadata {
  title?: string;
  description?: string;
  author?: string;
  favicon?: string;
}

export type WeaveNode = 
  | HeaderNode
  | FooterNode
  | NavigationNode
  | HeroNode
  | SectionNode
  | CardsNode
  | FormNode
  | ButtonNode
  | TextNode
  | ImageNode
  | GridNode
  | ListNode
  | DividerNode
  | SpacerNode
  | ContactNode
  | TestimonialsNode
  | PricingNode
  | FeaturesNode
  | GalleryNode
  | VideoNode
  | MapNode
  | SocialNode
  | NewsletterNode
  | FooterLinksNode;

export interface HeaderNode {
  type: 'header';
  title?: string;
  logo?: string;
  navigation?: NavigationItem[];
  sticky?: boolean;
  children?: WeaveNode[];
}

export interface FooterNode {
  type: 'footer';
  copyright?: string;
  links?: FooterLink[];
  social?: SocialLink[];
  children?: WeaveNode[];
}

export interface NavigationNode {
  type: 'navigation';
  items: NavigationItem[];
  style?: 'horizontal' | 'vertical' | 'sidebar';
}

export interface NavigationItem {
  label: string;
  link?: string;
  children?: NavigationItem[];
}

export interface HeroNode {
  type: 'hero';
  title: string;
  subtitle?: string;
  background?: string;
  backgroundImage?: string;
  buttons?: ButtonConfig[];
  alignment?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large' | 'full';
}

export interface SectionNode {
  type: 'section';
  title?: string;
  subtitle?: string;
  id?: string;
  background?: string;
  children?: WeaveNode[];
  layout?: 'stack' | 'grid' | 'flex';
}

export interface CardsNode {
  type: 'cards';
  columns?: number;
  cards: CardItem[];
  style?: 'default' | 'bordered' | 'elevated' | 'flat';
}

export interface CardItem {
  title?: string;
  description?: string;
  image?: string;
  icon?: string;
  price?: string;
  button?: ButtonConfig;
  badge?: string;
}

export interface FormNode {
  type: 'form';
  fields: FormField[];
  submitText?: string;
  action?: string;
  method?: 'GET' | 'POST';
  style?: 'stacked' | 'inline' | 'grid';
}

export interface FormField {
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'tel' | 'number' | 'date';
  label: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface ButtonNode {
  type: 'button';
  text: string;
  link?: string;
  style?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
}

export interface ButtonConfig {
  text: string;
  link?: string;
  style?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: string;
}

export interface TextNode {
  type: 'text';
  content: string;
  style?: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'quote' | 'lead' | 'small';
}

export interface ImageNode {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
  shadow?: boolean;
}

export interface GridNode {
  type: 'grid';
  columns: number;
  gap?: string;
  children: WeaveNode[];
}

export interface ListNode {
  type: 'list';
  items: string[];
  ordered?: boolean;
  style?: 'default' | 'checkmarks' | 'icons';
}

export interface DividerNode {
  type: 'divider';
  style?: 'solid' | 'dashed' | 'dotted' | 'gradient';
}

export interface SpacerNode {
  type: 'spacer';
  size?: 'small' | 'medium' | 'large';
}

export interface ContactNode {
  type: 'contact';
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  map?: boolean;
}

export interface TestimonialsNode {
  type: 'testimonials';
  testimonials: Testimonial[];
  style?: 'cards' | 'carousel' | 'simple';
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

export interface PricingNode {
  type: 'pricing';
  plans: PricingPlan[];
  highlight?: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  features: string[];
  button?: ButtonConfig;
  popular?: boolean;
}

export interface FeaturesNode {
  type: 'features';
  features: Feature[];
  columns?: number;
  style?: 'cards' | 'list' | 'grid';
}

export interface Feature {
  title: string;
  description?: string;
  icon?: string;
}

export interface GalleryNode {
  type: 'gallery';
  images: GalleryImage[];
  columns?: number;
  style?: 'grid' | 'masonry' | 'carousel';
}

export interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

export interface VideoNode {
  type: 'video';
  src: string;
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
  muted?: boolean;
}

export interface MapNode {
  type: 'map';
  address?: string;
  coordinates?: { lat: number; lng: number };
  zoom?: number;
}

export interface SocialNode {
  type: 'social';
  links: SocialLink[];
  style?: 'icons' | 'buttons' | 'minimal';
}

export interface SocialLink {
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'github' | 'youtube' | 'tiktok';
  url: string;
}

export interface NewsletterNode {
  type: 'newsletter';
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
}

export interface FooterLinksNode {
  type: 'footer-links';
  columns: FooterLinkColumn[];
}

export interface FooterLinkColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  url?: string;
}

// Theme types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseSize: string;
    lineHeight: string;
  };
  spacing: {
    unit: string;
    sectionGap: string;
    elementGap: string;
  };
  radius: {
    small: string;
    medium: string;
    large: string;
    full: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  darkColors?: Theme['colors'];
}

export interface CompilerOptions {
  minify?: boolean;
  embedImages?: boolean;
  includeMeta?: boolean;
  customTheme?: Partial<Theme>;
}
