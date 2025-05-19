import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Calendar, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"
import { blogPosts } from "@/lib/blog-data"

export function BlogSection() {
  return (
    <section id="blog" className="py-16 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="outline" className="px-3 py-1 border-primary/50 text-primary">
              cat blog.md
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">~/blog</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              <span className="text-primary">#</span> Thoughts, tutorials, and deep dives on DevOps, homelabbing, and
              mechanical keyboards
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Link href="/blog">
              <Badge variant="outline" className="border-primary/30 hover:bg-primary/10 cursor-pointer">
                All Posts
              </Badge>
            </Link>
            {Array.from(new Set(blogPosts.map((post) => post.category))).map((category) => (
              <Link key={category} href={`/blog?category=${category}`}>
                <Badge variant="outline" className="border-primary/30 hover:bg-primary/10 cursor-pointer">
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="bg-card border-primary/20 overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center mb-2">
                  <Link href={`/blog?category=${post.category}`}>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                    >
                      {post.category}
                    </Badge>
                  </Link>
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

        <div className="flex justify-center mt-8">
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
            <Link href="/blog">$ ls -la ~/blog</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

