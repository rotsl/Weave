# Weave Syntax Reference

This document provides a complete reference for the Weave language syntax.

## Language Principles

Weave is designed around these core principles:

1. **Natural Language** - Write in plain English, no technical syntax
2. **Indentation-Based** - Hierarchy shown through spacing
3. **Declarative** - Describe WHAT you want, not HOW to build it
4. **Zero Boilerplate** - No required setup or configuration

## Indentation Rules

Weave uses 2-space indentation to define hierarchy:

```
Level 0 (Root)
  Level 1 (Component)
    Level 2 (Component property)
      Level 3 (Nested property)
```

**Correct:**
```
A page called "My Site"
  With a header
    Showing "My Site"
```

**Incorrect:**
```
A page called "My Site"
With a header
Showing "My Site"
```

## Page Declaration

Every Weave script must start with a page declaration.

### Basic Page
```
A page called "Page Name"
```

### Page with Metadata
```
A page called "My Application"
  Titled "My Application - The Best App"
  With description "A description for SEO"
```

### Page Properties

| Property | Syntax | Purpose |
|----------|--------|---------|
| Name | `A page called "name"` | Sets page identifier |
| Title | `Titled "title"` | Sets HTML `<title>` |
| Description | `With description "text"` | Sets meta description |
| Theme | `Using theme-name theme` | Applies visual theme |
| Dark Mode | `With dark mode toggle` | Adds dark mode support |

---

## Components

### Header

Creates the site header with navigation.

**Basic Syntax:**
```
With a header
```

**Full Syntax:**
```
With a header
  Showing "Brand Name"
  With logo from "url"
  With navigation linking to Link1, Link2, Link3
  Sticky
```

**Properties:**

| Property | Syntax | Required | Default |
|----------|--------|----------|---------|
| Title/Brand | `Showing "text"` | No | - |
| Logo | `With logo from "url"` | No | - |
| Navigation | `With navigation linking to A, B, C` | No | - |
| Sticky | `Sticky` | No | false |

---

### Footer

Creates the site footer.

**Basic Syntax:**
```
With a footer
```

**Full Syntax:**
```
With a footer
  Copyright "© 2024 Company"
  With links to Privacy, Terms, Contact
  With social
    Twitter "https://twitter.com"
    GitHub "https://github.com"
    Instagram "https://instagram.com"
```

**Properties:**

| Property | Syntax | Required |
|----------|--------|----------|
| Copyright | `Copyright "text"` or `Showing "text"` | No |
| Links | `With links to A, B, C` | No |
| Social | `With social` + platform URLs | No |

**Social Platforms:**
- Twitter
- Facebook
- Instagram
- LinkedIn
- GitHub
- YouTube
- TikTok

---

### Hero

Creates a prominent banner section.

**Basic Syntax:**
```
With a hero
  Showing "Headline Text"
```

**Full Syntax:**
```
With a hero
  Showing "Main Headline"
  With subtitle "Supporting text here"
  With a primary button "Primary Action" linking to "#link"
  With a secondary button "Secondary Action"
  Background "#hexcolor"
  Background image "url"
  Aligned left|center|right
  Size small|medium|large|full
```

**Properties:**

| Property | Syntax | Options | Default |
|----------|--------|---------|---------|
| Title | `Showing "text"` | Any text | - |
| Subtitle | `With subtitle "text"` | Any text | - |
| Primary Button | `With a primary button "text"` | Any text | - |
| Secondary Button | `With a secondary button "text"` | Any text | - |
| Button Link | `linking to "url"` | Any URL | # |
| Background | `Background "value"` | CSS color/gradient | - |
| Background Image | `Background image "url"` | Image URL | - |
| Alignment | `Aligned position` | left, center, right | center |
| Size | `Size size` | small, medium, large, full | large |

---

### Section

Creates a generic content section.

**Basic Syntax:**
```
With a section called "Section Name"
```

**Full Syntax:**
```
With a section called "Features"
  Showing "Our Features"
  With subtitle "What we offer"
  Background "#f5f5f5"
```

**Properties:**

| Property | Syntax | Purpose |
|----------|--------|---------|
| Name/ID | `called "name"` | Sets section ID for anchor links |
| Title | `Showing "text"` | Section heading |
| Subtitle | `With subtitle "text"` | Supporting text |
| Background | `Background "color"` | Section background |

---

### Features

Creates a grid of feature highlights.

**Basic Syntax:**
```
With features
  Having 3 features:
    "Feature 1" with description "Description"
    "Feature 2" with description "Description"
    "Feature 3" with description "Description"
```

**Properties:**

| Property | Syntax | Purpose |
|----------|--------|---------|
| Columns | `Having N features:` | Number of columns |
| Title | `"Feature name"` | Feature title |
| Description | `with description "text"` | Feature description |

---

### Cards / Products

Creates a grid of cards.

**Basic Syntax:**
```
With products
  Having a grid of 3 columns
  Each product has:
    A title "Product"
```

**Full Syntax:**
```
With products
  Having a grid of 4 columns
  Each product has:
    An image from "https://example.com/image.jpg"
    A title "Product Name"
    A description "Product description text"
    A price "$99.99"
    A badge "Sale"
    A button "Add to Cart"
```

**Card Properties:**

| Property | Syntax | Required |
|----------|--------|----------|
| Image | `An image from "url"` | No |
| Title | `A title "text"` | No |
| Description | `A description "text"` | No |
| Price | `A price "text"` | No |
| Badge | `A badge "text"` | No |
| Button | `A button "text"` | No |

**Alternative Names:**
- `With products` → Product grid
- `With cards` → Generic card grid

---

### Pricing

Creates pricing comparison tables.

**Basic Syntax:**
```
With pricing
  Plan "Plan Name"
    Price "$0"
```

**Full Syntax:**
```
With pricing
  Plan "Free"
    Price "$0"
    Period "forever"
    Features "Feature 1, Feature 2, Feature 3"
    Button "Get Started"
  
  Plan "Pro"
    Price "$29"
    Period "month"
    Features "All Free features, Premium feature 1, Premium feature 2"
    Button "Start Trial"
    Popular
```

**Plan Properties:**

| Property | Syntax | Required |
|----------|--------|----------|
| Name | `Plan "name"` | Yes |
| Price | `Price "text"` | Yes |
| Period | `Period "text"` | No |
| Features | `Features "comma, separated, list"` | No |
| Button | `Button "text"` | No |
| Highlight | `Popular` | No |

---

### Testimonials

Creates testimonial cards.

**Basic Syntax:**
```
With testimonials
  Testimonial
    Quote "Quote text"
    Author "Name"
```

**Full Syntax:**
```
With testimonials
  Testimonial
    Quote "This is an amazing product that changed my life!"
    Author "Jane Doe"
    Role "CEO at Company"
    Rating 5
```

**Testimonial Properties:**

| Property | Syntax | Required |
|----------|--------|----------|
| Quote | `Quote "text"` | Yes |
| Author | `Author "name"` | Yes |
| Role | `Role "title"` | No |
| Rating | `Rating N` (1-5) | No |

---

### Form

Creates a form.

**Basic Syntax:**
```
With a form
  Field "Name" required
  Submit button "Send"
```

**Full Syntax:**
```
With a contact form
  Field "Full Name" required
  Field "Email" required
  Field "Phone" placeholder "Enter phone number"
  Field "Company Size" options "1-10, 11-50, 51-200, 200+"
  Field "Message" required
  Submit button "Send Message"
```

**Field Types (Auto-detected):**

| Field Name | Input Type |
|------------|------------|
| Email, E-mail | `email` |
| Phone, Tel | `tel` |
| Password | `password` |
| Message, Comment, Description | `textarea` |
| Date | `date` |
| Number, Quantity | `number` |
| Default | `text` |

**Field Properties:**

| Property | Syntax | Purpose |
|----------|--------|---------|
| Required | `required` | Makes field required |
| Placeholder | `placeholder "text"` | Placeholder text |
| Options | `options "A, B, C"` | Creates select dropdown |

---

### Newsletter

Creates a newsletter signup.

**Basic Syntax:**
```
With newsletter
```

**Full Syntax:**
```
With newsletter
  Title "Stay Updated"
  Description "Get weekly tips and news"
  Placeholder "Enter your email"
  Button "Subscribe"
```

---

### Contact

Creates a contact info section.

**Basic Syntax:**
```
With contact
  Address "123 Main St"
  Email "hello@example.com"
```

**Full Syntax:**
```
With contact
  Address "123 Main Street, New York, NY 10001"
  Phone "(555) 123-4567"
  Email "hello@company.com"
  Hours "Mon-Fri: 9am-5pm EST"
```

---

### Gallery

Creates an image gallery.

**Basic Syntax:**
```
With gallery
  Having 3 columns
  Image from "url1"
  Image from "url2"
```

**Full Syntax:**
```
With gallery
  Having 4 columns
  Image from "https://example.com/img1.jpg" alt "Description 1"
  Image from "https://example.com/img2.jpg" alt "Description 2"
  Image from "https://example.com/img3.jpg" alt "Description 3"
```

---

### Video

Embeds a video.

**Basic Syntax:**
```
With a video from "url"
```

**Options:**
```
With a video from "https://youtube.com/watch?v=xyz"
  autoplay
  muted
```

**Supported:**
- YouTube URLs (auto-converted to embed)
- Direct video files (MP4, WebM)

---

### Social Links

Creates social media links.

**Basic Syntax:**
```
With social
  Twitter "https://twitter.com"
  GitHub "https://github.com"
```

**Supported Platforms:**
- Twitter
- Facebook
- Instagram
- LinkedIn
- GitHub
- YouTube
- TikTok

---

## Theme Selection

Apply a theme to style your page:

```
Using modern theme
```

**Available Themes:**
- `modern` - Clean, contemporary (default)
- `minimal` - Simple, black & white
- `corporate` - Professional, blue
- `playful` - Fun, colorful
- `elegant` - Sophisticated, warm
- `dark` - Dark mode first

---

## Complete Syntax Example

```
A page called "Complete Example"
  Titled "My Awesome Website"
  With description "A website built with Weave"
  
  With a header
    Showing "MyBrand"
    With navigation linking to Home, Features, Pricing, Contact
    Sticky
  
  With a hero
    Showing "Build Amazing Websites"
    With subtitle "Create beautiful pages with simple words"
    With a primary button "Get Started" linking to "#pricing"
    With a secondary button "Learn More" linking to "#features"
    Background "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    Size full
  
  With features
    Having 3 features:
      "Fast" with description "Lightning-fast page loads"
      "Easy" with description "Simple natural language syntax"
      "Beautiful" with description "Professional themes included"
  
  With pricing
    Plan "Free"
      Price "$0"
      Features "1 page, Basic themes, Community support"
      Button "Start Free"
    Plan "Pro"
      Price "$29"
      Period "month"
      Features "Unlimited pages, All themes, Priority support"
      Button "Start Trial"
      Popular
  
  With testimonials
    Testimonial
      Quote "Weave made creating our website incredibly simple!"
      Author "Sarah Johnson"
      Role "Marketing Director"
      Rating 5
  
  With a contact form
    Field "Name" required
    Field "Email" required
    Field "Message" required
    Submit button "Send Message"
  
  With a footer
    Copyright "2024 MyBrand"
    With links to Privacy, Terms
    With social
      Twitter "https://twitter.com/mybrand"
      GitHub "https://github.com/mybrand"
  
  Using modern theme
  With dark mode toggle
```

---

## Escape Characters

To use quotes inside text, you can mix quote styles:

```
Showing "It's a wonderful day"
Showing 'He said "Hello"'
```

---

## Comments

Weave doesn't have a comment syntax. For notes, consider adding a hidden section:

```
With a section called "notes"
  Showing "This section can be removed later"
```
