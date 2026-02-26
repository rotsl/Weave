# How to Use Weave

Weave is a natural language web framework that lets you create complete, production-ready websites by writing simple descriptions in plain English. This guide will walk you through everything you need to know.

## Getting Started

### The Basics

Weave works by describing what you want on your page using natural language. The system then compiles your description into a complete HTML file with all the CSS and JavaScript included.

**The simplest Weave script:**

```
A page called "Hello World"
  With a hero
    Showing "Welcome to Weave"
  Using modern theme
```

This creates a complete webpage with:
- A centered hero section
- Responsive typography
- Modern styling
- Mobile-friendly layout

### Understanding the Structure

Weave uses indentation to show hierarchy. Each indented line belongs to the line above it:

```
A page called "My Site"          ← Root level (no indent)
  With a header                  ← Level 1 (2 spaces)
    Showing "My Site"            ← Level 2 (4 spaces)
```

### Key Phrases

| Phrase | Purpose | Example |
|--------|---------|---------|
| `A page called` | Start a new page | `A page called "My Shop"` |
| `With a` | Add a component | `With a header`, `With a hero` |
| `Showing` | Set main text | `Showing "Welcome"` |
| `With subtitle` | Add subtitle | `With subtitle "Build faster"` |
| `linking to` | Add navigation links | `linking to Home, About` |
| `With a button` | Add a button | `With a primary button "Click Me"` |
| `Using` | Set the theme | `Using modern theme` |

## Components Reference

### Header

Creates a navigation header with optional logo and links.

```
With a header
  Showing "Brand Name"
  With navigation linking to Home, Products, About, Contact
```

**Options:**
- `Sticky` - Makes the header stick to the top when scrolling
- `With logo from "url"` - Add a logo image

**Example with all options:**
```
With a header
  Showing "MyBrand"
  With logo from "/logo.png"
  With navigation linking to Home, Features, Pricing
  Sticky
```

### Hero

The main banner section, perfect for landing pages.

```
With a hero
  Showing "Main Headline"
  With subtitle "Supporting text goes here"
  With a primary button "Get Started"
  With a secondary button "Learn More"
```

**Size options:**
- `Size small` - Compact hero
- `Size medium` - Standard size
- `Size large` - Generous spacing (default)
- `Size full` - Full viewport height

**Alignment options:**
- `Aligned left` - Left-aligned content
- `Aligned center` - Centered content (default)
- `Aligned right` - Right-aligned content

**Background options:**
- `Background "#color"` - Solid color background
- `Background image "url"` - Image background

**Full example:**
```
With a hero
  Showing "Build the Future"
  With subtitle "Create amazing websites with just words"
  With a primary button "Start Free"
  With a secondary button "Watch Demo"
  Background "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  Aligned left
  Size full
```

### Features Section

Display a grid of feature highlights.

```
With features
  Having 3 features:
    "Feature Name" with description "What it does"
    "Another Feature" with description "Another benefit"
    "Third Feature" with description "More value"
```

**Options:**
- `Having N features:` - Specify number of columns
- `with description "text"` - Add description to each feature

### Products / Cards

Display a grid of product cards or any card-based content.

```
With products
  Having a grid of 3 columns
  Each product has:
    An image from "https://picsum.photos/400/300"
    A title "Product Name"
    A price "$99.99"
    A button "Add to Cart"
```

**Card properties:**
- `An image from "url"` - Product image
- `A title "text"` - Product title
- `A price "text"` - Price display
- `A description "text"` - Product description
- `A button "text"` - Action button
- `A badge "text"` - Sale badge or label

### Pricing Section

Create pricing comparison tables.

```
With pricing
  Plan "Starter"
    Price "$0"
    Period "month"
    Features "1 user, Basic support, 1GB storage"
    Button "Start Free"
  Plan "Pro"
    Price "$29"
    Period "month"
    Features "Unlimited users, Priority support, 100GB storage"
    Button "Subscribe"
    Popular
  Plan "Enterprise"
    Price "Custom"
    Features "Everything, Dedicated support, SLA"
    Button "Contact Us"
```

**Plan options:**
- `Popular` - Highlights this plan as recommended
- `Period "text"` - Billing period (month, year, etc.)

### Testimonials

Display customer testimonials.

```
With testimonials
  Testimonial
    Quote "This product changed my life!"
    Author "Jane Doe"
    Role "CEO at TechCorp"
    Rating 5
```

**Testimonial properties:**
- `Quote "text"` - The testimonial text
- `Author "name"` - Person's name
- `Role "title"` - Their job title or company
- `Rating N` - Star rating (1-5)

### Contact Form

Create a contact or signup form.

```
With a contact form
  Field "Name" required
  Field "Email" required
  Field "Phone"
  Field "Message" required
  Submit button "Send Message"
```

**Field types (auto-detected by name):**
- "Email" → email input
- "Phone" → tel input
- "Message" → textarea
- "Password" → password input
- Default → text input

### Newsletter Signup

```
With newsletter
  Title "Subscribe to our newsletter"
  Description "Get weekly updates delivered to your inbox"
  Placeholder "Enter your email"
  Button "Subscribe"
```

### Gallery

Display an image gallery.

```
With gallery
  Having 3 columns
  Image from "https://picsum.photos/600/400?random=1" alt "Project 1"
  Image from "https://picsum.photos/600/400?random=2" alt "Project 2"
  Image from "https://picsum.photos/600/400?random=3" alt "Project 3"
```

### Contact Information

```
With contact
  Address "123 Main Street, New York, NY 10001"
  Phone "(555) 123-4567"
  Email "hello@example.com"
  Hours "Mon-Fri: 9am-5pm"
```

### Video Embed

```
With a video from "https://youtube.com/watch?v=xyz"
```

Supports YouTube URLs and direct video files.

### Footer

```
With a footer
  Copyright "2024 MyCompany. All rights reserved."
  With links to Privacy, Terms, Contact
```

**Social links:**
```
With a footer
  Copyright "2024 MyCompany"
  With social
    Twitter "https://twitter.com/mycompany"
    GitHub "https://github.com/mycompany"
    LinkedIn "https://linkedin.com/company/mycompany"
```

## Themes

Weave includes 6 professionally designed themes:

| Theme | Best For | Style |
|-------|----------|-------|
| `modern` | Tech, SaaS, Startups | Clean, purple accents |
| `minimal` | Portfolios, Personal sites | Black & white, simple |
| `corporate` | Business, Enterprise | Professional blue |
| `playful` | Creative, Consumer apps | Fun, pink accents |
| `elegant` | Restaurants, Luxury | Warm, serif headings |
| `dark` | Developer tools, Gaming | Dark mode first |

**Apply a theme:**
```
Using modern theme
```

## Dark Mode

Add dark mode support to any page:

```
With dark mode toggle
```

Or make dark mode the default:
```
Using dark theme
```

## Exporting Your Site

### From the Editor
1. Write your Weave script
2. Click the "Export HTML" button
3. A complete `index.html` file will download

### The Output
The exported HTML file is completely self-contained:
- All CSS is embedded in a `<style>` tag
- All JavaScript is embedded in a `<script>` tag
- No external dependencies required
- Ready to deploy anywhere

## Tips for Best Results

1. **Start with the header** - Define your navigation first
2. **Use semantic section names** - They become HTML IDs for anchor links
3. **Match theme to content** - Choose a theme that fits your brand
4. **Test responsiveness** - All output is mobile-friendly by default
5. **Keep descriptions concise** - Short, clear text works best

## Troubleshooting

### Page isn't rendering
- Check that your indentation is consistent (use 2 spaces)
- Make sure all quotes are closed
- Verify component names are spelled correctly

### Styles look wrong
- Ensure you've specified a theme
- Check for typos in theme name

### Links don't work
- Navigation links auto-generate from section names
- Use the exact section name (lowercase, hyphens for spaces)
