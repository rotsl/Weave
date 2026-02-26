// Copyright 2026 Rohan R
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

// Weave Language Parser
// Parses natural language descriptions into an AST
// Inspired by Wisp: simple, intuitive, zero-config

import type { WeaveAST, WeaveNode, NavigationItem, ButtonConfig, FormField, CardItem, Feature, Testimonial, PricingPlan, SocialLink, FooterLink, GalleryImage } from './types';

interface ParseContext {
  lines: string[];
  currentLine: number;
  indentStack: number[];
}

export function parseWeave(code: string): WeaveAST {
  const lines = code.split('\n').map((line, i) => ({
    lineNumber: i + 1,
    text: line,
    indent: getIndent(line),
    content: line.trim(),
  })).filter(l => l.content.length > 0);

  const context: ParseContext = {
    lines: lines.map(l => l.text),
    currentLine: 0,
    indentStack: [],
  };

  return parsePage(lines);
}

function getIndent(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function parsePage(lines: { lineNumber: number; text: string; indent: number; content: string }[]): WeaveAST {
  const ast: WeaveAST = {
    type: 'page',
    name: 'Untitled Page',
    children: [],
    theme: 'modern',
    darkMode: false,
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const content = line.content.toLowerCase();

    // Page declaration
    if (content.startsWith('a page') || content.startsWith('page')) {
      const nameMatch = line.content.match(/(?:a\s+)?page\s+(?:called\s+)?["']?([^"'\n]+)["']?/i);
      if (nameMatch) {
        ast.name = nameMatch[1].trim();
      }
    }
    // Theme
    else if (content.includes('using') && content.includes('theme')) {
      const themeMatch = line.content.match(/using\s+(\w+)\s+theme/i);
      if (themeMatch) {
        ast.theme = themeMatch[1].toLowerCase();
      }
    }
    // Dark mode
    else if (content.includes('dark mode')) {
      ast.darkMode = true;
    }
    // Title/Metadata
    else if (content.startsWith('titled') || content.startsWith('with title')) {
      const titleMatch = line.content.match(/(?:titled|with\s+title)\s+["']?([^"'\n]+)["']?/i);
      if (titleMatch) {
        ast.metadata = { ...ast.metadata, title: titleMatch[1].trim() };
      }
    }
    // Header
    else if (content.startsWith('with a header') || content.startsWith('a header')) {
      const result = parseHeader(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Navigation
    else if (content.startsWith('with navigation') || content.startsWith('with a navigation')) {
      const result = parseNavigation(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Hero
    else if (content.startsWith('with a hero') || content.startsWith('a hero')) {
      const result = parseHero(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Section
    else if (content.startsWith('with a section') || content.startsWith('a section')) {
      const result = parseSection(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Features
    else if (content.startsWith('with features') || content.startsWith('with a features')) {
      const result = parseFeatures(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Products/Cards
    else if (content.startsWith('with products') || content.startsWith('with cards') || content.startsWith('with a products') || content.startsWith('with a cards')) {
      const result = parseCards(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Testimonials
    else if (content.startsWith('with testimonials') || content.startsWith('with a testimonials')) {
      const result = parseTestimonials(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Pricing
    else if (content.startsWith('with pricing') || content.startsWith('with a pricing')) {
      const result = parsePricing(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Form / Contact Form
    else if (content.startsWith('with a form') || content.startsWith('with a contact form') || content.startsWith('a form')) {
      const result = parseForm(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Newsletter
    else if (content.startsWith('with newsletter') || content.startsWith('with a newsletter')) {
      const result = parseNewsletter(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Contact
    else if (content.startsWith('with contact') || content.startsWith('with a contact')) {
      const result = parseContact(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Gallery
    else if (content.startsWith('with a gallery') || content.startsWith('with gallery')) {
      const result = parseGallery(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Social
    else if (content.startsWith('with social') || content.startsWith('with a social')) {
      const result = parseSocial(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Footer
    else if (content.startsWith('with a footer') || content.startsWith('a footer')) {
      const result = parseFooter(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Video
    else if (content.startsWith('with a video') || content.startsWith('a video')) {
      const result = parseVideo(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }
    // Map
    else if (content.startsWith('with a map') || content.startsWith('a map')) {
      const result = parseMap(lines, i);
      ast.children.push(result.node);
      i = result.endIndex;
    }

    i++;
  }

  return ast;
}

function parseHeader(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const header: WeaveNode = {
    type: 'header',
    title: '',
    sticky: false,
    navigation: [],
  };

  // Check for inline title
  const titleMatch = line.content.match(/showing\s+["']([^"']+)["']/i);
  if (titleMatch) {
    header.title = titleMatch[1];
  }

  // Check for sticky
  if (line.content.toLowerCase().includes('sticky')) {
    header.sticky = true;
  }

  // Parse nested content
  const baseIndent = line.indent;
  let i = startIndex + 1;

  while (i < lines.length && lines[i].indent > baseIndent) {
    const content = lines[i].content.toLowerCase();
    const currentLine = lines[i].content;

    // Title/Logo
    if (content.includes('showing') && !content.includes('navigation')) {
      const match = currentLine.match(/showing\s+["']([^"']+)["']/i);
      if (match) header.title = match[1];
    }
    // Logo image
    else if (content.includes('logo')) {
      const match = currentLine.match(/logo\s+(?:from\s+)?["']?([^"'\s]+)["']?/i);
      if (match) header.logo = match[1];
    }
    // Navigation
    else if (content.includes('navigation') || content.includes('nav')) {
      const linksMatch = currentLine.match(/(?:navigation|nav)\s+linking\s+to\s+(.+)/i);
      if (linksMatch) {
        const items = linksMatch[1].split(',').map(s => s.trim().replace(/["']/g, ''));
        header.navigation = items.map(item => ({ label: item, link: `#${item.toLowerCase().replace(/\s+/g, '-')}` }));
      }
    }
    // Links (alternative syntax)
    else if (content.includes('linking to') || content.includes('with links')) {
      const linksMatch = currentLine.match(/(?:linking\s+to|with\s+links\s+to)\s+(.+)/i);
      if (linksMatch) {
        const items = linksMatch[1].split(',').map(s => s.trim().replace(/["']/g, ''));
        header.navigation = items.map(item => ({ label: item, link: `#${item.toLowerCase().replace(/\s+/g, '-')}` }));
      }
    }

    i++;
  }

  return { node: header, endIndex: i - 1 };
}

function parseNavigation(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const nav: WeaveNode = {
    type: 'navigation',
    items: [],
    style: 'horizontal',
  };

  // Parse links from same line
  const linksMatch = line.content.match(/linking\s+to\s+(.+)/i);
  if (linksMatch) {
    const items = linksMatch[1].split(',').map(s => s.trim().replace(/["']/g, ''));
    nav.items = items.map(item => ({ label: item, link: `#${item.toLowerCase().replace(/\s+/g, '-')}` }));
  }

  // Check style
  if (line.content.toLowerCase().includes('vertical')) {
    nav.style = 'vertical';
  } else if (line.content.toLowerCase().includes('sidebar')) {
    nav.style = 'sidebar';
  }

  return { node: nav, endIndex: startIndex };
}

function parseHero(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const hero: WeaveNode = {
    type: 'hero',
    title: '',
    subtitle: '',
    buttons: [],
    alignment: 'center',
    size: 'large',
  };

  // Parse inline title
  const titleMatch = line.content.match(/showing\s+["']([^"']+)["']/i);
  if (titleMatch) {
    hero.title = titleMatch[1];
  }

  // Parse nested content
  const baseIndent = line.indent;
  let i = startIndex + 1;

  while (i < lines.length && lines[i].indent > baseIndent) {
    const content = lines[i].content.toLowerCase();
    const currentLine = lines[i].content;

    // Title
    if (content.startsWith('showing') && !hero.title) {
      const match = currentLine.match(/showing\s+["']([^"']+)["']/i);
      if (match) hero.title = match[1];
    }
    // Subtitle
    else if (content.includes('subtitle') || content.includes('description')) {
      const match = currentLine.match(/(?:subtitle|description)\s+["']([^"']+)["']/i);
      if (match) hero.subtitle = match[1];
    }
    // Primary button
    else if (content.includes('primary button') || content.includes('button')) {
      const match = currentLine.match(/(?:primary\s+)?button\s+["']([^"']+)["']/i);
      const linkMatch = currentLine.match(/linking\s+to\s+["']?([^"'\s]+)["']?/i);
      if (match) {
        hero.buttons!.push({
          text: match[1],
          style: content.includes('secondary') ? 'secondary' : 'primary',
          link: linkMatch ? linkMatch[1] : '#',
        });
      }
    }
    // Secondary button
    else if (content.includes('secondary button')) {
      const match = currentLine.match(/secondary\s+button\s+["']([^"']+)["']/i);
      const linkMatch = currentLine.match(/linking\s+to\s+["']?([^"'\s]+)["']?/i);
      if (match) {
        hero.buttons!.push({
          text: match[1],
          style: 'secondary',
          link: linkMatch ? linkMatch[1] : '#',
        });
      }
    }
    // Background
    else if (content.includes('background')) {
      const colorMatch = currentLine.match(/background\s+["']?([^"'\s]+)["']?/i);
      if (colorMatch) hero.background = colorMatch[1];
      const imageMatch = currentLine.match(/background\s+image\s+(?:from\s+)?["']?([^"'\s]+)["']?/i);
      if (imageMatch) hero.backgroundImage = imageMatch[1];
    }
    // Alignment
    else if (content.includes('aligned') || content.includes('alignment')) {
      if (content.includes('left')) hero.alignment = 'left';
      else if (content.includes('right')) hero.alignment = 'right';
    }
    // Size
    else if (content.includes('size')) {
      if (content.includes('small')) hero.size = 'small';
      else if (content.includes('medium')) hero.size = 'medium';
      else if (content.includes('full')) hero.size = 'full';
    }

    i++;
  }

  return { node: hero, endIndex: i - 1 };
}

function parseSection(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const section: WeaveNode = {
    type: 'section',
    title: '',
    subtitle: '',
    id: '',
    children: [],
  };

  // Parse inline title
  const titleMatch = line.content.match(/(?:called|named|titled)\s+["']?([^"'\n]+)["']?/i);
  if (titleMatch) {
    section.title = titleMatch[1].trim();
    section.id = titleMatch[1].toLowerCase().replace(/\s+/g, '-');
  }

  // Parse nested content
  const baseIndent = line.indent;
  let i = startIndex + 1;

  while (i < lines.length && lines[i].indent > baseIndent) {
    const content = lines[i].content.toLowerCase();
    const currentLine = lines[i].content;

    // Title
    if (content.startsWith('showing') && !section.title) {
      const match = currentLine.match(/showing\s+["']([^"']+)["']/i);
      if (match) {
        section.title = match[1];
        section.id = match[1].toLowerCase().replace(/\s+/g, '-');
      }
    }
    // Subtitle
    else if (content.includes('subtitle')) {
      const match = currentLine.match(/subtitle\s+["']([^"']+)["']/i);
      if (match) section.subtitle = match[1];
    }
    // Background
    else if (content.includes('background')) {
      const match = currentLine.match(/background\s+["']?([^"'\s]+)["']?/i);
      if (match) section.background = match[1];
    }
    // Grid
    else if (content.includes('grid')) {
      const match = currentLine.match(/grid\s+of\s+(\d+)\s+columns?/i);
      if (match) {
        section.layout = 'grid';
      }
    }

    i++;
  }

  return { node: section, endIndex: i - 1 };
}

function parseFeatures(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const features: WeaveNode = {
    type: 'features',
    features: [],
    columns: 3,
    style: 'grid',
  };

  // Parse nested features
  const baseIndent = line.indent;
  let i = startIndex + 1;

  while (i < lines.length && lines[i].indent > baseIndent) {
    const content = lines[i].content.toLowerCase();
    const currentLine = lines[i].content;

    // Check for columns
    if (content.includes('columns')) {
      const match = currentLine.match(/(\d+)\s+columns?/i);
      if (match) features.columns = parseInt(match[1]);
    }
    // Individual feature: "Fast" with description "..."
    else if (content.includes('with description')) {
      const titleMatch = currentLine.match(/["']([^"']+)["']\s+with\s+description\s+["']([^"']+)["']/i);
      if (titleMatch) {
        features.features.push({
          title: titleMatch[1],
          description: titleMatch[2],
        });
      }
    }
    // Simple feature on one line
    else if (currentLine.includes('"') || currentLine.includes("'")) {
      const match = currentLine.match(/["']([^"']+)["']/g);
      if (match && match.length >= 1) {
        const title = match[0].replace(/["']/g, '');
        const description = match[1]?.replace(/["']/g, '') || '';
        features.features.push({ title, description });
      }
    }

    i++;
  }

  return { node: features, endIndex: i - 1 };
}

function parseCards(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const cards: WeaveNode = {
    type: 'cards',
    cards: [],
    columns: 3,
    style: 'default',
  };

  // Check for columns
  const colMatch = line.content.match(/(\d+)\s+columns?/i);
  if (colMatch) cards.columns = parseInt(colMatch[1]);

  // Parse nested cards
  const baseIndent = line.indent;
  let i = startIndex + 1;
  let currentCard: CardItem | null = null;

  while (i < lines.length && lines[i].indent > baseIndent) {
    const content = lines[i].content.toLowerCase();
    const currentLine = lines[i].content;
    const currentIndent = lines[i].indent;

    // New card starts
    if (currentIndent === baseIndent + 2 || content.includes('a product') || content.includes('a card') || content.includes('each product') || content.includes('each card')) {
      if (currentCard) cards.cards.push(currentCard);
      currentCard = {};
    }

    if (currentCard) {
      // Image
      if (content.includes('image')) {
        const match = currentLine.match(/image\s+(?:from\s+)?["']?([^"'\s]+)["']?/i);
        if (match) currentCard.image = match[1];
      }
      // Title
      else if (content.includes('title')) {
        const match = currentLine.match(/title\s+["']([^"']+)["']/i);
        if (match) currentCard.title = match[1];
      }
      // Price
      else if (content.includes('price')) {
        const match = currentLine.match(/price\s+["']?([^"'\n]+)["']?/i);
        if (match) currentCard.price = match[1];
      }
      // Description
      else if (content.includes('description')) {
        const match = currentLine.match(/description\s+["']([^"']+)["']/i);
        if (match) currentCard.description = match[1];
      }
      // Button
      else if (content.includes('button')) {
        const match = currentLine.match(/button\s+["']([^"']+)["']/i);
        if (match) {
          currentCard.button = { text: match[1], style: 'primary' };
        }
      }
      // Badge
      else if (content.includes('badge')) {
        const match = currentLine.match(/badge\s+["']([^"']+)["']/i);
        if (match) currentCard.badge = match[1];
      }
    }

    i++;
  }

  if (currentCard) cards.cards.push(currentCard);

  return { node: cards, endIndex: i - 1 };
}

function parseTestimonials(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const testimonials: WeaveNode = {
    type: 'testimonials',
    testimonials: [],
    style: 'cards',
  };

  const baseIndent = line.indent;
  let i = startIndex + 1;
  let currentTestimonial: Testimonial | null = null;

  while (i < lines.length && lines[i].indent > baseIndent) {
    const content = lines[i].content.toLowerCase();
    const currentLine = lines[i].content;
    const currentIndent = lines[i].indent;

    // New testimonial
    if (currentIndent === baseIndent + 2 || content.includes('testimonial') || content.includes('quote')) {
      if (currentTestimonial) testimonials.testimonials.push(currentTestimonial);
      currentTestimonial = { quote: '', author: '' };
    }

    if (currentTestimonial) {
      // Quote
      if (content.includes('quote') || content.includes('saying')) {
        const match = currentLine.match(/(?:quote|saying)\s+["']([^"']+)["']/i);
        if (match) currentTestimonial.quote = match[1];
      }
      // Author
      else if (content.includes('author') || content.includes('by')) {
        const match = currentLine.match(/(?:author|by)\s+["']?([^"'\n]+)["']?/i);
        if (match) currentTestimonial.author = match[1].trim();
      }
      // Role
      else if (content.includes('role')) {
        const match = currentLine.match(/role\s+["']([^"']+)["']/i);
        if (match) currentTestimonial.role = match[1];
      }
      // Rating
      else if (content.includes('rating')) {
        const match = currentLine.match(/rating\s+(\d+)/i);
        if (match) currentTestimonial.rating = parseInt(match[1]);
      }
    }

    i++;
  }

  if (currentTestimonial) testimonials.testimonials.push(currentTestimonial);

  return { node: testimonials, endIndex: i - 1 };
}

function parsePricing(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const pricing: WeaveNode = {
    type: 'pricing',
    plans: [],
  };

  const baseIndent = line.indent;
  let i = startIndex + 1;
  let currentPlan: PricingPlan | null = null;

  while (i < lines.length && lines[i].indent > baseIndent) {
    const content = lines[i].content.toLowerCase();
    const currentLine = lines[i].content;
    const currentIndent = lines[i].indent;

    // New plan
    if (currentIndent === baseIndent + 2 || content.includes('plan') || content.includes('tier')) {
      if (currentPlan) pricing.plans.push(currentPlan);
      currentPlan = { name: '', price: '', features: [] };
      
      // Check for inline name
      const nameMatch = currentLine.match(/(?:plan|tier)\s+["']([^"']+)["']/i);
      if (nameMatch) currentPlan.name = nameMatch[1];
    }

    if (currentPlan) {
      // Name
      if (content.includes('called') || content.includes('named')) {
        const match = currentLine.match(/(?:called|named)\s+["']([^"']+)["']/i);
        if (match) currentPlan.name = match[1];
      }
      // Price
      else if (content.includes('price')) {
        const match = currentLine.match(/price\s+["']?([^"'\n]+)["']?/i);
        if (match) currentPlan.price = match[1].trim();
      }
      // Period
      else if (content.includes('period')) {
        const match = currentLine.match(/period\s+["']([^"']+)["']/i);
        if (match) currentPlan.period = match[1];
      }
      // Popular
      else if (content.includes('popular') || content.includes('highlighted')) {
        currentPlan.popular = true;
      }
      // Features
      else if (content.includes('features')) {
        const match = currentLine.match(/features\s+(.+)/i);
        if (match) {
          currentPlan.features = match[1].split(',').map(s => s.trim().replace(/["']/g, ''));
        }
      }
      // Button
      else if (content.includes('button')) {
        const match = currentLine.match(/button\s+["']([^"']+)["']/i);
        if (match) {
          currentPlan.button = { text: match[1], style: 'primary' };
        }
      }
    }

    i++;
  }

  if (currentPlan) pricing.plans.push(currentPlan);

  return { node: pricing, endIndex: i - 1 };
}

function parseForm(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const form: WeaveNode = {
    type: 'form',
    fields: [],
    submitText: 'Submit',
    style: 'stacked',
  };

  // Check for title in same line
  const titleMatch = line.content.match(/called\s+["']([^"']+)["']/i);
  if (titleMatch) {
    form.fields.push({ type: 'text', label: titleMatch[1], name: 'title' });
  }

  const baseIndent = line.indent;
  let i = startIndex + 1;

  while (i < lines.length && lines[i].indent > baseIndent) {
    const content = lines[i].content.toLowerCase();
    const currentLine = lines[i].content;

    // Field definitions
    if (content.includes('field') || content.includes('input')) {
      const field: FormField = { type: 'text', label: '' };
      
      // Type
      if (content.includes('email')) field.type = 'email';
      else if (content.includes('password')) field.type = 'password';
      else if (content.includes('tel') || content.includes('phone')) field.type = 'tel';
      else if (content.includes('textarea') || content.includes('message')) field.type = 'textarea';
      else if (content.includes('number')) field.type = 'number';
      else if (content.includes('date')) field.type = 'date';
      else if (content.includes('select') || content.includes('dropdown')) field.type = 'select';
      else if (content.includes('checkbox')) field.type = 'checkbox';
      
      // Label
      const labelMatch = currentLine.match(/(?:field|input)\s+["']([^"']+)["']/i);
      if (labelMatch) field.label = labelMatch[1];
      
      // Required
      if (content.includes('required')) field.required = true;
      
      // Placeholder
      const placeholderMatch = currentLine.match(/placeholder\s+["']([^"']+)["']/i);
      if (placeholderMatch) field.placeholder = placeholderMatch[1];
      
      // Options for select
      const optionsMatch = currentLine.match(/options\s+(.+)/i);
      if (optionsMatch) {
        field.options = optionsMatch[1].split(',').map(s => s.trim().replace(/["']/g, ''));
      }
      
      if (field.label) form.fields.push(field);
    }
    // Submit button
    else if (content.includes('submit') || content.includes('button')) {
      const match = currentLine.match(/(?:submit|button)\s+["']([^"']+)["']/i);
      if (match) form.submitText = match[1];
    }

    i++;
  }

  return { node: form, endIndex: i - 1 };
}

function parseNewsletter(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const newsletter: WeaveNode = {
    type: 'newsletter',
    title: 'Subscribe to our newsletter',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
  };

  const baseIndent = line.indent;
  let i = startIndex + 1;

  while (i < lines.length && lines[i].indent > baseIndent) {
    const content = lines[i].content.toLowerCase();
    const currentLine = lines[i].content;

    if (content.includes('title')) {
      const match = currentLine.match(/title\s+["']([^"']+)["']/i);
      if (match) newsletter.title = match[1];
    }
    else if (content.includes('description')) {
      const match = currentLine.match(/description\s+["']([^"']+)["']/i);
      if (match) newsletter.description = match[1];
    }
    else if (content.includes('placeholder')) {
      const match = currentLine.match(/placeholder\s+["']([^"']+)["']/i);
      if (match) newsletter.placeholder = match[1];
    }
    else if (content.includes('button')) {
      const match = currentLine.match(/button\s+["']([^"']+)["']/i);
      if (match) newsletter.buttonText = match[1];
    }

    i++;
  }

  return { node: newsletter, endIndex: i - 1 };
}

function parseContact(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const contact: WeaveNode = {
    type: 'contact',
    map: false,
  };

  const baseIndent = line.indent;
  let i = startIndex + 1;

  while (i < lines.length && lines[i].indent > baseIndent) {
    const content = lines[i].content.toLowerCase();
    const currentLine = lines[i].content;

    if (content.includes('address')) {
      const match = currentLine.match(/address\s+["']([^"']+)["']/i);
      if (match) contact.address = match[1];
    }
    else if (content.includes('phone')) {
      const match = currentLine.match(/phone\s+["']([^"']+)["']/i);
      if (match) contact.phone = match[1];
    }
    else if (content.includes('email')) {
      const match = currentLine.match(/email\s+["']([^"']+)["']/i);
      if (match) contact.email = match[1];
    }
    else if (content.includes('hours')) {
      const match = currentLine.match(/hours\s+["']([^"']+)["']/i);
      if (match) contact.hours = match[1];
    }
    else if (content.includes('map')) {
      contact.map = true;
    }

    i++;
  }

  return { node: contact, endIndex: i - 1 };
}

function parseGallery(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const gallery: WeaveNode = {
    type: 'gallery',
    images: [],
    columns: 3,
    style: 'grid',
  };

  // Check for columns
  const colMatch = line.content.match(/(\d+)\s+columns?/i);
  if (colMatch) gallery.columns = parseInt(colMatch[1]);

  const baseIndent = line.indent;
  let i = startIndex + 1;

  while (i < lines.length && lines[i].indent > baseIndent) {
    const content = lines[i].content.toLowerCase();
    const currentLine = lines[i].content;

    if (content.includes('image')) {
      const match = currentLine.match(/image\s+(?:from\s+)?["']?([^"'\s]+)["']?/i);
      if (match) {
        const img: GalleryImage = { src: match[1] };
        const altMatch = currentLine.match(/alt\s+["']([^"']+)["']/i);
        if (altMatch) img.alt = altMatch[1];
        gallery.images.push(img);
      }
    }

    i++;
  }

  return { node: gallery, endIndex: i - 1 };
}

function parseSocial(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const social: WeaveNode = {
    type: 'social',
    links: [],
    style: 'icons',
  };

  const baseIndent = line.indent;
  let i = startIndex + 1;

  while (i < lines.length && lines[i].indent > baseIndent) {
    const content = lines[i].content.toLowerCase();
    const currentLine = lines[i].content;

    const platforms = ['twitter', 'facebook', 'instagram', 'linkedin', 'github', 'youtube', 'tiktok'] as const;
    
    for (const platform of platforms) {
      if (content.includes(platform)) {
        const match = currentLine.match(new RegExp(`${platform}\\s+["']?([^"'\\s]+)["']?`, 'i'));
        if (match) {
          social.links.push({ platform, url: match[1] });
        }
        break;
      }
    }

    i++;
  }

  return { node: social, endIndex: i - 1 };
}

function parseVideo(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const video: WeaveNode = {
    type: 'video',
    src: '',
    controls: true,
  };

  const srcMatch = line.content.match(/(?:from|src)\s+["']?([^"'\s]+)["']?/i);
  if (srcMatch) video.src = srcMatch[1];

  if (line.content.toLowerCase().includes('autoplay')) video.autoplay = true;
  if (line.content.toLowerCase().includes('muted')) video.muted = true;

  return { node: video, endIndex: startIndex };
}

function parseMap(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const map: WeaveNode = {
    type: 'map',
    zoom: 15,
  };

  const addressMatch = line.content.match(/address\s+["']([^"']+)["']/i);
  if (addressMatch) map.address = addressMatch[1];

  return { node: map, endIndex: startIndex };
}

function parseFooter(lines: { lineNumber: number; text: string; indent: number; content: string }[], startIndex: number): { node: WeaveNode; endIndex: number } {
  const line = lines[startIndex];
  const footer: WeaveNode = {
    type: 'footer',
    copyright: '',
    links: [],
    social: [],
  };

  // Parse inline copyright
  const copyrightMatch = line.content.match(/copyright\s+["']?([^"'\n]+)["']?/i);
  if (copyrightMatch) {
    footer.copyright = copyrightMatch[1].trim();
  }

  // Parse inline showing
  const showingMatch = line.content.match(/showing\s+["']([^"']+)["']/i);
  if (showingMatch) {
    footer.copyright = showingMatch[1];
  }

  const baseIndent = line.indent;
  let i = startIndex + 1;

  while (i < lines.length && lines[i].indent > baseIndent) {
    const content = lines[i].content.toLowerCase();
    const currentLine = lines[i].content;

    // Copyright
    if (content.includes('copyright') || content.includes('showing')) {
      const match = currentLine.match(/(?:copyright|showing)\s+["']?([^"'\n]+)["']?/i);
      if (match) footer.copyright = match[1].trim();
    }
    // Links
    else if (content.includes('links to') || content.includes('with links')) {
      const match = currentLine.match(/(?:links\s+to|with\s+links)\s+(.+)/i);
      if (match) {
        const items = match[1].split(',').map(s => s.trim().replace(/["']/g, ''));
        footer.links = items.map(item => ({ label: item, url: `/${item.toLowerCase()}` }));
      }
    }
    // Social
    else if (content.includes('social')) {
      const platforms = ['twitter', 'facebook', 'instagram', 'linkedin', 'github', 'youtube', 'tiktok'] as const;
      for (const platform of platforms) {
        if (content.includes(platform)) {
          const match = currentLine.match(new RegExp(`${platform}\\s+["']?([^"'\\s]+)["']?`, 'i'));
          if (match) {
            footer.social!.push({ platform, url: match[1] });
          }
          break;
        }
      }
    }

    i++;
  }

  return { node: footer, endIndex: i - 1 };
}
