// Copyright 2026 Rohan R
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

// Weave Theme System
// Inspired by Wisp: CSS custom properties, content-aware, zero-config

import type { Theme } from '../types';

export const themes: Record<string, Theme> = {
  modern: {
    name: 'modern',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textMuted: '#64748b',
      border: '#e2e8f0',
      error: '#ef4444',
      success: '#22c55e',
      warning: '#f59e0b',
    },
    typography: {
      headingFont: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      bodyFont: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      baseSize: '16px',
      lineHeight: '1.6',
    },
    spacing: {
      unit: '1rem',
      sectionGap: '5rem',
      elementGap: '1.5rem',
    },
    radius: {
      small: '0.375rem',
      medium: '0.5rem',
      large: '1rem',
      full: '9999px',
    },
    shadows: {
      small: '0 1px 2px rgba(0, 0, 0, 0.05)',
      medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      large: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    darkColors: {
      primary: '#818cf8',
      secondary: '#a78bfa',
      accent: '#fbbf24',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textMuted: '#94a3b8',
      border: '#334155',
      error: '#f87171',
      success: '#4ade80',
      warning: '#fbbf24',
    },
  },
  minimal: {
    name: 'minimal',
    colors: {
      primary: '#000000',
      secondary: '#4b5563',
      accent: '#3b82f6',
      background: '#ffffff',
      surface: '#fafafa',
      text: '#111827',
      textMuted: '#6b7280',
      border: '#e5e7eb',
      error: '#dc2626',
      success: '#16a34a',
      warning: '#d97706',
    },
    typography: {
      headingFont: "'IBM Plex Sans', -apple-system, sans-serif",
      bodyFont: "'IBM Plex Sans', -apple-system, sans-serif",
      baseSize: '16px',
      lineHeight: '1.7',
    },
    spacing: {
      unit: '1rem',
      sectionGap: '4rem',
      elementGap: '1.25rem',
    },
    radius: {
      small: '0',
      medium: '0.25rem',
      large: '0.5rem',
      full: '9999px',
    },
    shadows: {
      small: 'none',
      medium: '0 1px 3px rgba(0, 0, 0, 0.1)',
      large: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    darkColors: {
      primary: '#ffffff',
      secondary: '#9ca3af',
      accent: '#60a5fa',
      background: '#000000',
      surface: '#111111',
      text: '#fafafa',
      textMuted: '#9ca3af',
      border: '#262626',
      error: '#f87171',
      success: '#4ade80',
      warning: '#fbbf24',
    },
  },
  corporate: {
    name: 'corporate',
    colors: {
      primary: '#1e40af',
      secondary: '#1e3a8a',
      accent: '#0369a1',
      background: '#ffffff',
      surface: '#f1f5f9',
      text: '#0f172a',
      textMuted: '#475569',
      border: '#cbd5e1',
      error: '#b91c1c',
      success: '#15803d',
      warning: '#b45309',
    },
    typography: {
      headingFont: "'Source Sans 3', -apple-system, sans-serif",
      bodyFont: "'Source Sans 3', -apple-system, sans-serif",
      baseSize: '16px',
      lineHeight: '1.65',
    },
    spacing: {
      unit: '1rem',
      sectionGap: '4.5rem',
      elementGap: '1.5rem',
    },
    radius: {
      small: '0.25rem',
      medium: '0.375rem',
      large: '0.5rem',
      full: '9999px',
    },
    shadows: {
      small: '0 1px 2px rgba(0, 0, 0, 0.05)',
      medium: '0 2px 4px rgba(0, 0, 0, 0.08)',
      large: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
    darkColors: {
      primary: '#60a5fa',
      secondary: '#3b82f6',
      accent: '#38bdf8',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textMuted: '#94a3b8',
      border: '#334155',
      error: '#f87171',
      success: '#4ade80',
      warning: '#fbbf24',
    },
  },
  playful: {
    name: 'playful',
    colors: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      accent: '#14b8a6',
      background: '#fdf4ff',
      surface: '#ffffff',
      text: '#1f2937',
      textMuted: '#6b7280',
      border: '#e5e7eb',
      error: '#f43f5e',
      success: '#10b981',
      warning: '#f59e0b',
    },
    typography: {
      headingFont: "'Nunito', -apple-system, sans-serif",
      bodyFont: "'Nunito', -apple-system, sans-serif",
      baseSize: '16px',
      lineHeight: '1.7',
    },
    spacing: {
      unit: '1rem',
      sectionGap: '4rem',
      elementGap: '1.5rem',
    },
    radius: {
      small: '0.5rem',
      medium: '0.75rem',
      large: '1.5rem',
      full: '9999px',
    },
    shadows: {
      small: '0 2px 4px rgba(236, 72, 153, 0.1)',
      medium: '0 4px 8px rgba(236, 72, 153, 0.15)',
      large: '0 8px 24px rgba(236, 72, 153, 0.2)',
    },
    darkColors: {
      primary: '#f472b6',
      secondary: '#a78bfa',
      accent: '#2dd4bf',
      background: '#18181b',
      surface: '#27272a',
      text: '#fafafa',
      textMuted: '#a1a1aa',
      border: '#3f3f46',
      error: '#fb7185',
      success: '#34d399',
      warning: '#fbbf24',
    },
  },
  elegant: {
    name: 'elegant',
    colors: {
      primary: '#92400e',
      secondary: '#78350f',
      accent: '#b45309',
      background: '#fffbeb',
      surface: '#fef3c7',
      text: '#1c1917',
      textMuted: '#57534e',
      border: '#d6d3d1',
      error: '#b91c1c',
      success: '#166534',
      warning: '#b45309',
    },
    typography: {
      headingFont: "'Playfair Display', Georgia, serif",
      bodyFont: "'Lato', -apple-system, sans-serif",
      baseSize: '17px',
      lineHeight: '1.75',
    },
    spacing: {
      unit: '1rem',
      sectionGap: '5rem',
      elementGap: '1.75rem',
    },
    radius: {
      small: '0.25rem',
      medium: '0.5rem',
      large: '1rem',
      full: '9999px',
    },
    shadows: {
      small: '0 1px 3px rgba(120, 53, 15, 0.08)',
      medium: '0 4px 8px rgba(120, 53, 15, 0.12)',
      large: '0 8px 24px rgba(120, 53, 15, 0.15)',
    },
    darkColors: {
      primary: '#fbbf24',
      secondary: '#f59e0b',
      accent: '#d97706',
      background: '#1c1917',
      surface: '#292524',
      text: '#fafaf9',
      textMuted: '#a8a29e',
      border: '#44403c',
      error: '#f87171',
      success: '#4ade80',
      warning: '#fbbf24',
    },
  },
  dark: {
    name: 'dark',
    colors: {
      primary: '#22d3ee',
      secondary: '#a78bfa',
      accent: '#f472b6',
      background: '#030712',
      surface: '#111827',
      text: '#f9fafb',
      textMuted: '#9ca3af',
      border: '#1f2937',
      error: '#f87171',
      success: '#34d399',
      warning: '#fbbf24',
    },
    typography: {
      headingFont: "'Space Grotesk', -apple-system, sans-serif",
      bodyFont: "'Space Grotesk', -apple-system, sans-serif",
      baseSize: '16px',
      lineHeight: '1.6',
    },
    spacing: {
      unit: '1rem',
      sectionGap: '4.5rem',
      elementGap: '1.5rem',
    },
    radius: {
      small: '0.375rem',
      medium: '0.5rem',
      large: '1rem',
      full: '9999px',
    },
    shadows: {
      small: '0 1px 2px rgba(0, 0, 0, 0.3)',
      medium: '0 4px 8px rgba(0, 0, 0, 0.4)',
      large: '0 10px 20px rgba(0, 0, 0, 0.5)',
    },
    darkColors: undefined, // Already dark theme
  },
};

export function generateThemeCSS(themeName: string, darkMode: boolean): string {
  const theme = themes[themeName] || themes.modern;
  const colors = darkMode && theme.darkColors ? theme.darkColors : theme.colors;

  return `
:root {
  --wisp-theme: ${theme.name};
  --wisp-primary: ${colors.primary};
  --wisp-secondary: ${colors.secondary};
  --wisp-accent: ${colors.accent};
  --wisp-background: ${colors.background};
  --wisp-surface: ${colors.surface};
  --wisp-text: ${colors.text};
  --wisp-text-muted: ${colors.textMuted};
  --wisp-border: ${colors.border};
  --wisp-error: ${colors.error};
  --wisp-success: ${colors.success};
  --wisp-warning: ${colors.warning};
  
  --wisp-heading-font: ${theme.typography.headingFont};
  --wisp-body-font: ${theme.typography.bodyFont};
  --wisp-base-size: ${theme.typography.baseSize};
  --wisp-line-height: ${theme.typography.lineHeight};
  
  --wisp-unit: ${theme.spacing.unit};
  --wisp-section-gap: ${theme.spacing.sectionGap};
  --wisp-element-gap: ${theme.spacing.elementGap};
  
  --wisp-radius-sm: ${theme.radius.small};
  --wisp-radius-md: ${theme.radius.medium};
  --wisp-radius-lg: ${theme.radius.large};
  --wisp-radius-full: ${theme.radius.full};
  
  --wisp-shadow-sm: ${theme.shadows.small};
  --wisp-shadow-md: ${theme.shadows.medium};
  --wisp-shadow-lg: ${theme.shadows.large};
  
  --wisp-transition: 200ms ease;
  --wisp-transition-slow: 400ms ease;
}

${darkMode ? `
/* Dark mode is default */
[data-theme="light"] {
  --wisp-primary: ${theme.colors.primary};
  --wisp-secondary: ${theme.colors.secondary};
  --wisp-accent: ${theme.colors.accent};
  --wisp-background: ${theme.colors.background};
  --wisp-surface: ${theme.colors.surface};
  --wisp-text: ${theme.colors.text};
  --wisp-text-muted: ${theme.colors.textMuted};
  --wisp-border: ${theme.colors.border};
}
` : `
/* Light mode is default */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --wisp-primary: ${theme.darkColors?.primary || colors.primary};
    --wisp-secondary: ${theme.darkColors?.secondary || colors.secondary};
    --wisp-accent: ${theme.darkColors?.accent || colors.accent};
    --wisp-background: ${theme.darkColors?.background || colors.background};
    --wisp-surface: ${theme.darkColors?.surface || colors.surface};
    --wisp-text: ${theme.darkColors?.text || colors.text};
    --wisp-text-muted: ${theme.darkColors?.textMuted || colors.textMuted};
    --wisp-border: ${theme.darkColors?.border || colors.border};
    --wisp-error: ${theme.darkColors?.error || colors.error};
    --wisp-success: ${theme.darkColors?.success || colors.success};
    --wisp-warning: ${theme.darkColors?.warning || colors.warning};
  }
}

[data-theme="dark"] {
  --wisp-primary: ${theme.darkColors?.primary || colors.primary};
  --wisp-secondary: ${theme.darkColors?.secondary || colors.secondary};
  --wisp-accent: ${theme.darkColors?.accent || colors.accent};
  --wisp-background: ${theme.darkColors?.background || colors.background};
  --wisp-surface: ${theme.darkColors?.surface || colors.surface};
  --wisp-text: ${theme.darkColors?.text || colors.text};
  --wisp-text-muted: ${theme.darkColors?.textMuted || colors.textMuted};
  --wisp-border: ${theme.darkColors?.border || colors.border};
  --wisp-error: ${theme.darkColors?.error || colors.error};
  --wisp-success: ${theme.darkColors?.success || colors.success};
  --wisp-warning: ${theme.darkColors?.warning || colors.warning};
}
`}
`.trim();
}
