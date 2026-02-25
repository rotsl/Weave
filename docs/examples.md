# Weave Examples

This document contains a collection of examples ranging from simple to complex, demonstrating the full capabilities of the Weave language.

---

## Simple Examples

### Example 1: Basic Landing Page

The simplest possible website with a hero and footer.

```
A page called "Simple Site"
  With a hero
    Showing "Welcome"
    With subtitle "The simplest website builder"
  With a footer
    Copyright "2024 Simple Site"
  Using minimal theme
```

**What it creates:**
- A centered hero section
- Large headline "Welcome"
- Subtitle text
- A simple footer with copyright

---

### Example 2: Personal Portfolio

A clean portfolio page for a developer.

```
A page called "John Doe"
  With a header
    Showing "JD"
    With navigation linking to Work, About, Contact
  With a hero
    Showing "Hello, I'm John"
    With subtitle "Full-stack developer based in San Francisco"
    Aligned left
  With features
    Having 3 features:
      "Frontend" with description "React, Vue, TypeScript"
      "Backend" with description "Node.js, Python, Go"
      "Cloud" with description "AWS, GCP, Docker"
  With a footer
    Copyright "2024 John Doe"
  Using minimal theme
```

---

### Example 3: Coming Soon Page

A minimal coming soon page with newsletter signup.

```
A page called "Launch Soon"
  With a hero
    Showing "Something Amazing is Coming"
    With subtitle "Be the first to know when we launch"
    Size full
  With newsletter
    Title "Get Notified"
    Placeholder "Enter your email"
    Button "Notify Me"
  With a footer
    Copyright "2024 Launch Soon"
  Using modern theme
```

---

### Example 4: Restaurant Homepage

An elegant restaurant page.

```
A page called "La Bella Italia"
  With a header
    Showing "La Bella Italia"
    With navigation linking to Menu, Reservations, About
  With a hero
    Showing "Authentic Italian Cuisine"
    With subtitle "Experience the taste of Italy"
    Background image "https://picsum.photos/1920/1080?food"
    Size full
  With contact
    Address "123 Main Street, New York, NY"
    Phone "(555) 123-4567"
    Hours "Tue-Sun: 5pm - 11pm"
  With a footer
    Copyright "2024 La Bella Italia"
  Using elegant theme
```

---

### Example 5: Event Page

A simple event announcement page.

```
A page called "Tech Conference 2024"
  With a hero
    Showing "Tech Conference 2024"
    With subtitle "March 15-17, San Francisco"
    With a primary button "Register Now"
  With features
    Having 3 features:
      "50+ Speakers" with description "Industry leaders sharing insights"
      "Workshops" with description "Hands-on learning sessions"
      "Networking" with description "Connect with 1000+ attendees"
  With a footer
    Copyright "2024 Tech Conference"
  Using modern theme
```

---

## Medium Examples

### Example 6: SaaS Landing Page

A complete SaaS product landing page.

```
A page called "CloudSync"
  With a header
    Showing "CloudSync"
    With navigation linking to Features, Pricing, Docs, Login
    Sticky
  With a hero
    Showing "Sync Your Data, Anywhere"
    With subtitle "Real-time data synchronization for modern applications. Zero configuration required."
    With a primary button "Start Free Trial"
    With a secondary button "View Documentation"
  With features
    Having 4 features:
      "Real-time Sync" with description "Changes propagate instantly across all connected devices"
      "Offline Support" with description "Works seamlessly without internet, syncs when back online"
      "Conflict Resolution" with description "Smart algorithms automatically handle data conflicts"
      "Enterprise Security" with description "SOC2 compliant with end-to-end encryption"
  With pricing
    Plan "Free"
      Price "$0"
      Period "forever"
      Features "1,000 syncs/day, 3 data collections, Community support"
      Button "Get Started"
    Plan "Pro"
      Price "$49"
      Period "month"
      Features "100,000 syncs/day, Unlimited collections, Priority support, Analytics dashboard"
      Button "Start 14-Day Trial"
      Popular
    Plan "Enterprise"
      Price "Contact Sales"
      Features "Unlimited syncs, Dedicated infrastructure, Custom SLA, On-premise deployment"
      Button "Schedule Demo"
  With testimonials
    Testimonial
      Quote "CloudSync reduced our sync latency by 99%. Our users couldn't be happier."
      Author "Alex Rivera"
      Role "Lead Engineer at DataFlow Inc"
      Rating 5
    Testimonial
      Quote "The offline support is incredible. We went from constant complaints to zero sync issues."
      Author "Priya Patel"
      Role "Product Manager at AppWorks"
      Rating 5
  With newsletter
    Title "Developer Newsletter"
    Description "Monthly updates on new features and best practices"
    Button "Subscribe"
  With a footer
    Copyright "2024 CloudSync Inc. All rights reserved."
    With links to Terms, Privacy, Status, Support
    With social
      Twitter "https://twitter.com/cloudsync"
      GitHub "https://github.com/cloudsync"
  Using modern theme
  With dark mode toggle
```

---

### Example 7: E-Commerce Shop

An online fashion store.

```
A page called "StyleShop"
  With a header
    Showing "StyleShop"
    With navigation linking to New Arrivals, Women, Men, Sale, Cart
    Sticky
  With a hero
    Showing "Summer Collection 2024"
    With subtitle "Discover the latest trends in sustainable fashion"
    With a primary button "Shop Collection"
    Background "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  With products
    Having a grid of 4 columns
    Each product has:
      An image from "https://picsum.photos/400/500?random=1"
      A title "Linen Summer Dress"
      A price "$89.00"
      A button "Quick View"
    Each product has:
      An image from "https://picsum.photos/400/500?random=2"
      A title "Organic Cotton Tee"
      A price "$45.00"
      A button "Quick View"
    Each product has:
      An image from "https://picsum.photos/400/500?random=3"
      A title "Recycled Denim Jacket"
      A price "$129.00"
      A badge "Bestseller"
      A button "Quick View"
    Each product has:
      An image from "https://picsum.photos/400/500?random=4"
      A title "Sustainable Sneakers"
      A price "$115.00"
      A button "Quick View"
  With products
    Having a grid of 4 columns
    Each product has:
      An image from "https://picsum.photos/400/500?random=5"
      A title "Bamboo Sunglasses"
      A price "$75.00"
      A button "Quick View"
    Each product has:
      An image from "https://picsum.photos/400/500?random=6"
      A title "Hemp Canvas Bag"
      A price "$65.00"
      A button "Quick View"
    Each product has:
      An image from "https://picsum.photos/400/500?random=7"
      A title "Cork Sandals"
      A price "$89.00"
      A badge "New"
      A button "Quick View"
    Each product has:
      An image from "https://picsum.photos/400/500?random=8"
      A title "Recycled Polyester Hat"
      A price "$35.00"
      A button "Quick View"
  With newsletter
    Title "Join the Style Club"
    Description "Get 15% off your first order and exclusive access to new arrivals"
    Button "Join Now"
  With a footer
    Copyright "2024 StyleShop. All rights reserved."
    With links to Shipping, Returns, Size Guide, Contact
    With social
      Instagram "https://instagram.com/styleshop"
      Facebook "https://facebook.com/styleshop"
      Pinterest "https://pinterest.com/styleshop"
  Using playful theme
```

---

### Example 8: Creative Agency

A portfolio site for a design agency.

```
A page called "Pixel Perfect Studio"
  With a header
    Showing "PPS"
    With navigation linking to Work, Services, About, Contact
  With a hero
    Showing "We Create Digital Experiences"
    With subtitle "Award-winning design studio specializing in brand identity and web design"
    Aligned left
    Size full
  With a section called "Work"
  With gallery
    Having 3 columns
    Image from "https://picsum.photos/800/600?random=10" alt "Brand Identity Project"
    Image from "https://picsum.photos/800/600?random=11" alt "E-commerce Redesign"
    Image from "https://picsum.photos/800/600?random=12" alt "Mobile App Design"
    Image from "https://picsum.photos/800/600?random=13" alt "Corporate Website"
    Image from "https://picsum.photos/800/600?random=14" alt "Startup Branding"
    Image from "https://picsum.photos/800/600?random=15" alt "Product Design"
  With features
    Having 3 features:
      "Brand Strategy" with description "We define your brand's voice, values, and visual identity"
      "Web Design" with description "Beautiful, responsive websites that convert visitors to customers"
      "Digital Products" with description "User-centered design for apps and digital platforms"
  With testimonials
    Testimonial
      Quote "Pixel Perfect transformed our brand. Our conversion rate increased by 300%."
      Author "Michael Chen"
      Role "CEO at TechStart"
      Rating 5
    Testimonial
      Quote "The best design team we've ever worked with. They truly understand business."
      Author "Emma Williams"
      Role "CMO at GrowthCo"
      Rating 5
  With a contact form
    Field "Name" required
    Field "Email" required
    Field "Company"
    Field "Project Type" options "Branding, Web Design, App Design, Other"
    Field "Message" required
    Submit button "Send Inquiry"
  With a footer
    Copyright "2024 Pixel Perfect Studio"
    With links to Privacy, Terms
    With social
      Dribbble "https://dribbble.com/pixelperfect"
      Behance "https://behance.net/pixelperfect"
      Instagram "https://instagram.com/pixelperfect"
  Using minimal theme
```

---

## Complex Examples

### Example 9: Complete SaaS Platform

A full-featured SaaS marketing site with all sections.

```
A page called "DataFlow Analytics"
  Titled "DataFlow Analytics - Business Intelligence Platform"
  With description "Transform your data into actionable insights with AI-powered analytics"
  
  With a header
    Showing "DataFlow"
    With navigation linking to Product, Solutions, Pricing, Resources, Login
    Sticky
  
  With a hero
    Showing "Make Data-Driven Decisions in Minutes"
    With subtitle "AI-powered analytics platform that transforms raw data into actionable business insights. No coding required."
    With a primary button "Start Free Trial" linking to "#signup"
    With a secondary button "Watch Demo" linking to "#demo"
    Background "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)"
    Size full
  
  With a section called "Logos"
  
  With features
    Having 4 features:
      "AI Insights" with description "Machine learning algorithms automatically discover patterns and anomalies in your data"
      "Real-time Dashboards" with description "Live metrics and KPIs updated in real-time with customizable visualizations"
      "Team Collaboration" with description "Share reports, set alerts, and collaborate with your team in real-time"
      "200+ Integrations" with description "Connect your existing tools - Salesforce, HubSpot, Google Analytics, and more"
  
  With a section called "How It Works"
  
  With features
    Having 3 features:
      "1. Connect" with description "Link your data sources in minutes with our pre-built connectors"
      "2. Analyze" with description "AI automatically processes your data and surfaces key insights"
      "3. Act" with description "Get recommendations and take action with one-click automations"
  
  With pricing
    Plan "Starter"
      Price "$0"
      Period "forever"
      Features "1 user, 3 data sources, Basic dashboards, Email support, 30-day data retention"
      Button "Start Free"
    Plan "Professional"
      Price "$79"
      Period "month"
      Features "5 users, 20 data sources, Advanced dashboards, Priority support, 1-year data retention, Custom branding"
      Button "Start Trial"
      Popular
    Plan "Business"
      Price "$249"
      Period "month"
      Features "25 users, Unlimited data sources, AI insights, Dedicated support, Unlimited retention, API access, SSO"
      Button "Start Trial"
    Plan "Enterprise"
      Price "Contact Sales"
      Features "Unlimited users, On-premise deployment, Custom SLA, Dedicated success manager, Custom integrations"
      Button "Contact Sales"
  
  With testimonials
    Testimonial
      Quote "DataFlow helped us identify a $2M revenue opportunity we were missing. The AI insights are game-changing."
      Author "Jennifer Martinez"
      Role "VP of Revenue at ScaleUp Inc"
      Rating 5
    Testimonial
      Quote "We went from spending 20 hours a week on reports to 20 minutes. DataFlow paid for itself in the first month."
      Author "David Kim"
      Role "Head of Operations at FastGrowth"
      Rating 5
    Testimonial
      Quote "The best analytics platform we've used. Setup took 15 minutes and we had insights the same day."
      Author "Sarah Thompson"
      Role "CEO at DataDriven Co"
      Rating 5
  
  With a section called "FAQ"
  
  With a contact form
    Field "Name" required
    Field "Work Email" required
    Field "Company Name" required
    Field "Company Size" options "1-10, 11-50, 51-200, 201-500, 500+"
    Field "Message"
    Submit button "Talk to Sales"
  
  With newsletter
    Title "The Data Digest"
    Description "Weekly insights on data analytics, AI, and business intelligence. Join 50,000+ data professionals."
    Placeholder "Enter your work email"
    Button "Subscribe"
  
  With a footer
    Copyright "2024 DataFlow Analytics, Inc. All rights reserved."
    With links to Product, Solutions, Pricing, Resources, About, Careers, Privacy, Terms, Security
    With social
      Twitter "https://twitter.com/dataflow"
      LinkedIn "https://linkedin.com/company/dataflow"
      GitHub "https://github.com/dataflow"
  
  Using modern theme
  With dark mode toggle
```

---

### Example 10: Multi-Purpose Business Site

A comprehensive business website with multiple sections.

```
A page called "Apex Consulting Group"
  Titled "Apex Consulting - Strategic Business Solutions"
  With description "Management consulting firm helping businesses achieve sustainable growth"
  
  With a header
    Showing "APEX"
    With navigation linking to Services, Industries, Insights, About, Careers, Contact
    Sticky
  
  With a hero
    Showing "Transform Your Business"
    With subtitle "We partner with ambitious leaders to build enduring organizations"
    With a primary button "Our Services"
    With a secondary button "Case Studies"
    Background "#1a1a2e"
    Size large
  
  With a section called "Services"
  
  With features
    Having 4 features:
      "Strategy" with description "Define your vision and chart a path to sustainable competitive advantage"
      "Operations" with description "Optimize processes, reduce costs, and improve operational excellence"
      "Digital Transformation" with description "Leverage technology to drive innovation and customer value"
      "Organization" with description "Build high-performing teams and adaptive organizational structures"
  
  With a section called "Industries"
  
  With cards
    Having a grid of 3 columns
    Each card has:
      A title "Technology & Media"
      A description "Helping tech companies scale and media organizations adapt to digital"
    Each card has:
      A title "Healthcare & Life Sciences"
      A description "Partnering with providers and pharma to improve patient outcomes"
    Each card has:
      A title "Financial Services"
      A description "Guiding banks and insurers through digital transformation"
    Each card has:
      A title "Consumer Products"
      A description "Helping brands connect with consumers in a changing market"
    Each card has:
      A title "Energy & Utilities"
      A description "Supporting the transition to sustainable energy systems"
    Each card has:
      A title "Public Sector"
      A description "Partnering with governments to improve citizen services"
  
  With a section called "Results"
  
  With testimonials
    Testimonial
      Quote "Apex helped us achieve 40% revenue growth in 18 months. Their strategic insights were invaluable."
      Author "Robert Williams"
      Role "CEO at GlobalTech Industries"
      Rating 5
    Testimonial
      Quote "The Apex team became true partners. They understood our challenges and delivered real results."
      Author "Maria Garcia"
      Role "COO at HealthFirst Network"
      Rating 5
  
  With pricing
    Plan "Strategy Assessment"
      Price "Starting at $50K"
      Features "Current state analysis, Market assessment, Strategic roadmap, Executive presentation"
      Button "Learn More"
    Plan "Transformation Program"
      Price "Custom Pricing"
      Features "Full organizational assessment, Implementation support, Change management, Ongoing advisory"
      Button "Schedule Consultation"
      Popular
    Plan "Retainer"
      Price "Monthly"
      Features "Dedicated advisor, Monthly strategy sessions, Priority support, Ad-hoc analysis"
      Button "Contact Us"
  
  With a section called "Team"
  
  With cards
    Having a grid of 4 columns
    Each card has:
      An image from "https://picsum.photos/300/300?random=20"
      A title "James Anderson"
      A description "Managing Partner"
    Each card has:
      An image from "https://picsum.photos/300/300?random=21"
      A title "Sarah Mitchell"
      A description "Partner, Strategy"
    Each card has:
      An image from "https://picsum.photos/300/300?random=22"
      A title "David Chen"
      A description "Partner, Operations"
    Each card has:
      An image from "https://picsum.photos/300/300?random=23"
      A title "Lisa Thompson"
      A description "Partner, Digital"
  
  With a contact form
    Field "Full Name" required
    Field "Email" required
    Field "Company" required
    Field "Title"
    Field "Industry" options "Technology, Healthcare, Financial Services, Consumer, Energy, Public Sector, Other"
    Field "How can we help?" required
    Submit button "Submit Inquiry"
  
  With contact
    Address "350 California Street, Suite 1500, San Francisco, CA 94104"
    Phone "+1 (415) 555-0100"
    Email "contact@apexconsulting.com"
  
  With a footer
    Copyright "2024 Apex Consulting Group. All rights reserved."
    With links to Services, Industries, Insights, Careers, Privacy Policy, Terms of Service
    With social
      LinkedIn "https://linkedin.com/company/apexconsulting"
      Twitter "https://twitter.com/apexconsulting"
  
  Using corporate theme
  With dark mode toggle
```

---

## Quick Reference: Copy-Paste Templates

### Minimal Blog
```
A page called "My Blog"
  With a header
    Showing "My Blog"
    With navigation linking to Home, Archive, About
  With cards
    Having a grid of 2 columns
    Each card has:
      A title "Blog Post Title"
      A description "A brief excerpt from the blog post..."
    Each card has:
      A title "Another Post"
      A description "Another excerpt goes here..."
  With a footer
    Copyright "2024 My Blog"
  Using minimal theme
```

### Startup Landing
```
A page called "Startup"
  With a header
    Showing "Startup"
    With navigation linking to Features, Pricing
  With a hero
    Showing "Build Something Amazing"
    With a primary button "Get Started"
  With features
    Having 3 features:
      "Feature 1" with description "Description"
      "Feature 2" with description "Description"
      "Feature 3" with description "Description"
  With a footer
    Copyright "2024 Startup"
  Using modern theme
```

### Local Business
```
A page called "Local Business"
  With a header
    Showing "Business Name"
  With a hero
    Showing "Serving Your Community"
    With subtitle "Quality service since 1990"
  With contact
    Address "123 Main Street, City, State"
    Phone "(555) 123-4567"
    Hours "Mon-Sat: 9am-6pm"
  With a footer
    Copyright "2024 Business Name"
  Using elegant theme
```
