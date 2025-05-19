"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { blogPosts } from "@/lib/blog-data"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Find previous and next posts for navigation
  const currentIndex = blogPosts.findIndex((p) => p.slug === params.slug)
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-4 mb-8">
              <Link href="/blog" className="flex items-center text-primary hover:text-primary/80 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>

              <div className="flex flex-wrap gap-2 mb-4">
                <Link href={`/blog?category=${post.category}`}>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">
                    {post.category}
                  </Badge>
                </Link>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readTime}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {post.date}
                </div>
              </div>

              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>

              <div className="prose prose-invert max-w-none mt-8">
                <div className="text-center py-16 flex flex-col items-center">
                  <div className="terminal-window w-full max-w-md mx-auto">
                    <div className="terminal-header">
                      <div className="terminal-dot bg-red-500"></div>
                      <div className="terminal-dot bg-yellow-500"></div>
                      <div className="terminal-dot bg-green-500"></div>
                      <span className="ml-2">bash</span>
                    </div>
                    <div className="terminal-content p-4 font-mono text-sm leading-relaxed">
                      <p>
                        <span className="text-primary">$</span> cat ~/blog/{post.slug}.md
                      </p>
                      <p className="text-foreground">Coming soon! This blog post is under construction.</p>
                      <p>
                        <span className="text-primary">$</span> <span className="cursor-blink"></span>
                      </p>
                    </div>
                  </div>
                  <p className="mt-8 text-muted-foreground">
                    This blog post is currently being written. Check back soon for the full article!
                  </p>
                </div>
              </div>

              <div className="border-t border-primary/20 mt-12 pt-8">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {prevPost ? (
                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10" asChild>
                      <Link href={`/blog/${prevPost.slug}`} className="flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {prevPost.title}
                      </Link>
                    </Button>
                  ) : (
                    <div />
                  )}

                  {nextPost && (
                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10" asChild>
                      <Link href={`/blog/${nextPost.slug}`} className="flex items-center">
                        {nextPost.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}


