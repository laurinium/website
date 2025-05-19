"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Tag, ChevronRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { blogPosts } from "@/lib/blog-data"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

function getCategoryDescription(category: string): string {
  switch (category) {
    case "DevOps":
      return "Articles about CI/CD, infrastructure automation, and DevOps best practices"
    case "Homelab":
      return "Guides and projects for building and managing your own home server lab"
    case "Mechanical Keyboards":
      return "Custom builds, firmware tweaks, and optimizations for mechanical keyboards"
    case "Home Automation":
      return "Smart home setups, Home Assistant configurations, and IoT projects"
    default:
      return `Articles related to ${category}`
  }
}

export default function BlogPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [activeTag, setActiveTag] = useState<string>("All")

  // Get unique categories for tags
  const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))]

  // Set active tag from URL parameter on initial load
  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveTag(categoryParam)
    }
  }, [categoryParam, categories]) // Added categories to dependency array

  // Filter posts based on active tag
  const filteredPosts = activeTag === "All" ? blogPosts : blogPosts.filter((post) => post.category === activeTag)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-4 mb-8">
              <Link href="/" className="flex items-center text-primary hover:text-primary/80 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  <span className="text-primary">~/</span>blog
                  {activeTag !== "All" && (
                    <span className="text-primary/80 inline-flex items-center">
                      /<span className="animate-pulse-once">{activeTag.toLowerCase()}</span>
                    </span>
                  )}
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  {activeTag === "All"
                    ? "Technical articles, tutorials, and thoughts on DevOps, homelabbing, and mechanical keyboards"
                    : getCategoryDescription(activeTag)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={activeTag === category ? "default" : "outline"}
                    className={`
                      cursor-pointer
                      ${
                        activeTag === category
                          ? "bg-primary text-primary-foreground"
                          : "border-primary/30 hover:bg-primary/10"
                      }
                    `}
                    onClick={() => setActiveTag(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {activeTag !== "All" && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>
                    Filtering by: <span className="text-primary font-medium">{activeTag}</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-6 text-xs text-primary hover:bg-primary/10"
                    onClick={() => setActiveTag("All")}
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <div className="terminal-window w-full max-w-md mx-auto">
                  <div className="terminal-header">
                    <div className="terminal-dot bg-red-500"></div>
                    <div className="terminal-dot bg-yellow-500"></div>
                    <div className="terminal-dot bg-green-500"></div>
                    <span className="ml-2">bash</span>
                  </div>
                  <div className="terminal-content p-4 font-mono text-sm leading-relaxed">
                    <p>
                      <span className="text-primary">$</span> find ~/blog -name "*{activeTag.toLowerCase()}*"
                    </p>
                    <p className="text-foreground">find: No matching entries found</p>
                    <p>
                      <span className="text-primary">$</span> <span className="cursor-blink"></span>
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="mt-6 border-primary/50 text-primary hover:bg-primary/10"
                  onClick={() => setActiveTag("All")}
                >
                  $ ls -la ~/blog
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, index) => (
                  <Card key={index} className="bg-card border-primary/20 overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center mb-2">
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary cursor-pointer hover:bg-primary/20"
                          onClick={() => setActiveTag(post.category)}
                        >
                          {post.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <CardDescription className="flex items-center text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{post.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-primary hover:bg-primary/10 hover:text-primary"
                        asChild
                      >
                        <Link href={`/blog/${post.slug}`} className="flex items-center">
                          Read More <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {activeTag !== "All" && filteredPosts.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10"
                  onClick={() => setActiveTag("All")}
                >
                  $ ls -la ~/blog
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

