'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { 
  Download, 
  Code2, 
  Eye, 
  Copy, 
  Check, 
  Sparkles, 
  FileCode, 
  ChevronDown,
  Zap,
  Layout,
  Palette,
  Github,
  ExternalLink,
  FileArchive,
  FileText
} from 'lucide-react'
import { parseWeave, compileWeave } from '@/lib/weave'

// Example templates
const templates = {
  landing: `A page called "MyApp"
  With a header
    Showing "MyApp"
    With navigation linking to Features, Pricing, Contact
  With a hero
    Showing "Build Faster, Launch Smarter"
    With subtitle "The modern platform for building beautiful web experiences"
    With a primary button "Get Started Free"
    With a secondary button "Watch Demo"
  With features
    Having 3 features:
      "Lightning Fast" with description "Optimized for speed with instant page loads"
      "Secure by Default" with description "Enterprise-grade security built in"
      "Easy to Use" with description "Intuitive interface, no learning curve"
  With a section called "Pricing"
  With pricing
    Plan "Starter"
      Price "$0"
      Period "month"
      Features "1 project, Basic support, 1GB storage"
      Button "Start Free"
    Plan "Pro"
      Price "$29"
      Period "month"
      Features "Unlimited projects, Priority support, 100GB storage, Analytics"
      Button "Start Trial"
      Popular
    Plan "Enterprise"
      Price "Custom"
      Features "Everything in Pro, Dedicated support, Unlimited storage, SLA"
      Button "Contact Sales"
  With testimonials
    Testimonial
      Quote "This platform transformed how we build products. Incredible!"
      Author "Sarah Chen"
      Role "CTO at TechCorp"
      Rating 5
    Testimonial
      Quote "The best investment we made this year. Highly recommend."
      Author "Mike Johnson"
      Role "Founder at StartupXYZ"
      Rating 5
  With newsletter
    Title "Stay Updated"
    Description "Get the latest news and updates delivered to your inbox"
    Button "Subscribe"
  With a footer
    Copyright "2024 MyApp. All rights reserved."
    With links to Privacy, Terms, Contact
  Using modern theme`,

  ecommerce: `A page called "StyleShop"
  With a header
    Showing "StyleShop"
    With navigation linking to Home, Shop, Collections, About, Cart
    Sticky
  With a hero
    Showing "Summer Collection 2024"
    With subtitle "Discover the latest trends in fashion"
    With a primary button "Shop Now"
    Background "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  With products
    Having a grid of 4 columns
    Each product has:
      An image from "https://picsum.photos/400/500?random=1"
      A title "Classic White Tee"
      A price "$49.99"
      A button "Add to Cart"
    Each product has:
      An image from "https://picsum.photos/400/500?random=2"
      A title "Denim Jacket"
      A price "$129.99"
      A button "Add to Cart"
    Each product has:
      An image from "https://picsum.photos/400/500?random=3"
      A title "Summer Dress"
      A price "$89.99"
      A button "Add to Cart"
    Each product has:
      An image from "https://picsum.photos/400/500?random=4"
      A title "Leather Boots"
      A price "$199.99"
      A button "Add to Cart"
  With a footer
    Copyright "2024 StyleShop"
    With links to Returns, Shipping, FAQ
  Using playful theme`,

  portfolio: `A page called "John Doe Portfolio"
  With a header
    Showing "JD"
    With navigation linking to Work, About, Contact
  With a hero
    Showing "Hello, I'm John"
    With subtitle "A creative developer crafting beautiful digital experiences"
    Aligned left
    Size full
  With a section called "Selected Work"
  With gallery
    Having 3 columns
    Image from "https://picsum.photos/600/400?random=10" alt "Project 1"
    Image from "https://picsum.photos/600/400?random=11" alt "Project 2"
    Image from "https://picsum.photos/600/400?random=12" alt "Project 3"
  With a section called "About"
  With features
    Having 3 features:
      "Design" with description "Creating visually stunning interfaces"
      "Development" with description "Building robust, scalable applications"
      "Strategy" with description "Crafting digital experiences that convert"
  With a contact form
    Field "Name" required
    Field "Email" required
    Field "Message" required
    Submit button "Send Message"
  With a footer
    Copyright "2024 John Doe"
    With social
      Twitter "https://twitter.com"
      GitHub "https://github.com"
      LinkedIn "https://linkedin.com"
  Using minimal theme`,

  blog: `A page called "TechBlog"
  With a header
    Showing "TechBlog"
    With navigation linking to Home, Articles, Categories, About
  With a hero
    Showing "Insights & Ideas"
    With subtitle "Exploring technology, design, and the future"
    Size small
  With cards
    Having a grid of 2 columns
    Each card has:
      An image from "https://picsum.photos/800/400?random=20"
      A title "The Future of AI in Web Development"
      A description "How artificial intelligence is reshaping how we build websites"
    Each card has:
      An image from "https://picsum.photos/800/400?random=21"
      A title "Design Systems That Scale"
      A description "Building consistent interfaces across large applications"
    Each card has:
      An image from "https://picsum.photos/800/400?random=22"
      A title "The Rise of Edge Computing"
      A description "Why the edge is becoming the new standard for web apps"
  With newsletter
    Title "Get the latest articles"
    Description "Weekly insights delivered to your inbox"
    Placeholder "Enter your email"
    Button "Subscribe"
  With a footer
    Copyright "2024 TechBlog"
    With links to RSS, Privacy, Contact
  Using elegant theme`,

  saas: `A page called "CloudSync"
  With a header
    Showing "CloudSync"
    With navigation linking to Product, Solutions, Pricing, Docs
    Sticky
  With a hero
    Showing "Sync Your Data, Anywhere"
    With subtitle "Real-time data synchronization for modern applications"
    With a primary button "Start Free Trial"
    With a secondary button "View Documentation"
  With features
    Having 4 features:
      "Real-time Sync" with description "Changes propagate instantly across all clients"
      "Conflict Resolution" with description "Smart algorithms handle data conflicts automatically"
      "Offline Support" with description "Works seamlessly without internet connection"
      "Enterprise Security" with description "SOC2 compliant with end-to-end encryption"
  With a section called "Simple Pricing"
  With pricing
    Plan "Free"
      Price "$0"
      Period "forever"
      Features "1,000 syncs/day, 3 collections, Community support"
      Button "Get Started"
    Plan "Pro"
      Price "$49"
      Period "month"
      Features "100,000 syncs/day, Unlimited collections, Priority support, Analytics"
      Button "Start Trial"
      Popular
    Plan "Enterprise"
      Price "Contact us"
      Features "Unlimited syncs, Dedicated infrastructure, SLA, Custom integrations"
      Button "Talk to Sales"
  With testimonials
    Testimonial
      Quote "CloudSync reduced our sync latency by 99%. Game changer."
      Author "Alex Rivera"
      Role "Lead Engineer at DataCo"
      Rating 5
    Testimonial
      Quote "The offline support is incredible. Our users love it."
      Author "Priya Patel"
      Role "Product Manager at AppWorks"
      Rating 5
  With a contact form
    Field "Name"
    Field "Email"
    Field "Company"
    Field "Message"
    Submit button "Send Message"
  With a footer
    Copyright "2024 CloudSync Inc."
    With links to Terms, Privacy, Status, Docs
  Using corporate theme`,

  restaurant: `A page called "La Bella Cucina"
  With a header
    Showing "La Bella Cucina"
    With navigation linking to Menu, Reservations, About, Contact
  With a hero
    Showing "Authentic Italian Cuisine"
    With subtitle "Experience the taste of Italy in every bite"
    Background image "https://picsum.photos/1920/1080?random=30"
    Size full
  With a section called "Our Specialties"
  With cards
    Having a grid of 3 columns
    Each card has:
      An image from "https://picsum.photos/400/300?random=31"
      A title "Homemade Pasta"
      A description "Fresh pasta made daily with traditional recipes"
    Each card has:
      An image from "https://picsum.photos/400/300?random=32"
      A title "Wood-Fired Pizza"
      A description "Authentic Neapolitan pizza from our wood-fired oven"
    Each card has:
      An image from "https://picsum.photos/400/300?random=33"
      A title "Fine Wines"
      A description "Curated selection of Italian and international wines"
  With contact
    Address "123 Main Street, New York, NY 10001"
    Phone "(555) 123-4567"
    Email "hello@labellacucina.com"
    Hours "Mon-Sun: 11am - 10pm"
  With a footer
    Copyright "2024 La Bella Cucina"
    With social
      Instagram "https://instagram.com"
      Facebook "https://facebook.com"
  Using elegant theme`
}

const themeOptions = [
  { value: 'modern', label: 'Modern', description: 'Clean, contemporary design' },
  { value: 'minimal', label: 'Minimal', description: 'Simple, focused aesthetics' },
  { value: 'corporate', label: 'Corporate', description: 'Professional, business-ready' },
  { value: 'playful', label: 'Playful', description: 'Fun, vibrant colors' },
  { value: 'elegant', label: 'Elegant', description: 'Sophisticated, refined' },
  { value: 'dark', label: 'Dark', description: 'Dark mode first' },
]

export default function WeaveEditor() {
  const [code, setCode] = useState(templates.landing)
  const [compiledHtml, setCompiledHtml] = useState('')
  const [isCompiling, setIsCompiling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [htmlCopied, setHtmlCopied] = useState(false)
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Compile code directly in browser (no API needed - works with static export)
  const compileCode = useCallback((codeToCompile: string) => {
    if (!codeToCompile.trim()) {
      setCompiledHtml('')
      setError(null)
      return
    }

    setIsCompiling(true)
    setError(null)

    try {
      // Parse and compile directly in the browser
      const ast = parseWeave(codeToCompile)
      const html = compileWeave(ast, { minify: false })
      setCompiledHtml(html)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Compilation failed')
    } finally {
      setIsCompiling(false)
    }
  }, [])

  // Debounced compile on code change
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      compileCode(code)
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [code, compileCode])

  // Initial compile
  useEffect(() => {
    compileCode(code)
  }, [])

  // Download HTML file
  const handleDownloadHtml = () => {
    if (!compiledHtml) return
    
    const blob = new Blob([compiledHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'index.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Download CSS file
  const handleDownloadCss = () => {
    if (!compiledHtml) return
    
    // Extract CSS from the compiled HTML
    const cssMatch = compiledHtml.match(/<style>([\s\S]*?)<\/style>/)
    const css = cssMatch ? cssMatch[1] : ''
    
    const blob = new Blob([css], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'styles.css'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Download JS file
  const handleDownloadJs = () => {
    if (!compiledHtml) return
    
    // Extract JS from the compiled HTML
    const jsMatch = compiledHtml.match(/<script>([\s\S]*?)<\/script>/)
    const js = jsMatch ? jsMatch[1] : ''
    
    const blob = new Blob([js], { type: 'application/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'script.js'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Download all files as a zip-like structure (downloads multiple files)
  const handleDownloadAll = () => {
    if (!compiledHtml) return

    // Download HTML
    handleDownloadHtml()
    
    // Delay and download CSS
    setTimeout(() => handleDownloadCss(), 100)
    
    // Delay and download JS
    setTimeout(() => handleDownloadJs(), 200)
  }

  // Copy code to clipboard
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.error('Failed to copy')
    }
  }

  // Copy HTML to clipboard
  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(compiledHtml)
      setHtmlCopied(true)
      setTimeout(() => setHtmlCopied(false), 2000)
    } catch {
      console.error('Failed to copy')
    }
  }

  // Load template
  const loadTemplate = (templateKey: keyof typeof templates) => {
    setCode(templates[templateKey])
  }

  // Update theme in code
  const updateTheme = (theme: string) => {
    const newCode = code.replace(/Using \w+ theme/i, `Using ${theme} theme`)
    if (newCode !== code) {
      setCode(newCode)
    } else if (!code.includes('Using')) {
      setCode(code + `\n  Using ${theme} theme`)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">Weave</span>
            <Badge variant="secondary" className="text-xs">v1.0</Badge>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <FileCode className="w-4 h-4" />
                Templates
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Quick Start Templates</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => loadTemplate('landing')}>
                <Layout className="w-4 h-4 mr-2" />
                Landing Page
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => loadTemplate('ecommerce')}>
                <span className="w-4 h-4 mr-2">🛍️</span>
                E-Commerce Shop
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => loadTemplate('portfolio')}>
                <span className="w-4 h-4 mr-2">👤</span>
                Portfolio
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => loadTemplate('blog')}>
                <span className="w-4 h-4 mr-2">📝</span>
                Blog
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => loadTemplate('saas')}>
                <span className="w-4 h-4 mr-2">☁️</span>
                SaaS Product
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => loadTemplate('restaurant')}>
                <span className="w-4 h-4 mr-2">🍽️</span>
                Restaurant
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Select value={viewMode} onValueChange={(v) => setViewMode(v as 'split' | 'editor' | 'preview')}>
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="split">Split</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="preview">Preview</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Palette className="w-4 h-4" />
                Theme
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {themeOptions.map((theme) => (
                <DropdownMenuItem key={theme.value} onClick={() => updateTheme(theme.value)}>
                  <div className="flex flex-col">
                    <span>{theme.label}</span>
                    <span className="text-xs text-muted-foreground">{theme.description}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Download Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="sm" 
                className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                <Download className="w-4 h-4" />
                Download
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Download Files</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDownloadHtml}>
                <FileText className="w-4 h-4 mr-2" />
                index.html
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownloadCss}>
                <FileCode className="w-4 h-4 mr-2" />
                styles.css
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownloadJs}>
                <Code2 className="w-4 h-4 mr-2" />
                script.js
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDownloadAll}>
                <FileArchive className="w-4 h-4 mr-2" />
                Download All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        {(viewMode === 'split' || viewMode === 'editor') && (
          <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} flex flex-col border-r`}>
            <div className="h-10 bg-muted/30 flex items-center justify-between px-4 border-b">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Code2 className="w-4 h-4" />
                <span>Weave Script</span>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={handleCopyCode}
                >
                  {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="absolute inset-0 w-full h-full p-4 font-mono text-sm bg-background resize-none focus:outline-none leading-relaxed"
                placeholder="Write your Weave script here..."
                spellCheck={false}
              />
              {isCompiling && (
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="animate-pulse">
                    <Zap className="w-3 h-3 mr-1" />
                    Compiling...
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Preview Panel */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} flex flex-col`}>
            <div className="h-10 bg-muted/30 flex items-center justify-between px-4 border-b">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>Live Preview</span>
              </div>
              <div className="flex items-center gap-2">
                {compiledHtml && (
                  <>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(compiledHtml.length / 1024)}KB
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={handleCopyHtml}
                      title="Copy HTML"
                    >
                      {htmlCopied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 relative bg-muted/20">
              {error ? (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <h3 className="font-semibold mb-2">Compilation Error</h3>
                    <p className="text-sm text-muted-foreground">{error}</p>
                  </div>
                </div>
              ) : compiledHtml ? (
                <iframe
                  ref={iframeRef}
                  srcDoc={compiledHtml}
                  className="absolute inset-0 w-full h-full bg-white"
                  title="Preview"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <FileCode className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Start writing to see the preview</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="h-8 border-t bg-card flex items-center justify-between px-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Weave Language Framework</span>
          <span>•</span>
          <span>Inspired by Wisp</span>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/rotsl/weave" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Github className="w-3 h-3" />
            GitHub
            <ExternalLink className="w-2 h-2" />
          </a>
          <span>Zero Config • Semantic First • Content Aware</span>
        </div>
      </footer>
    </div>
  )
}
