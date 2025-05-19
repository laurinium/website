import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import { CodeBlock } from "@/components/ui/code-block"
import { Terminal } from "@/components/ui/terminal"
import { Diagram } from "@/components/ui/diagram"

// Path to our blog posts
const POSTS_PATH = path.join(process.cwd(), "content/blog")

// MDX components
const components = {
  pre: (props: any) => <div {...props} />,
  CodeBlock,
  Terminal,
  Diagram,
}

// Get all post slugs
export async function getPostSlugs(): Promise<string[]> {
  try {
    return fs.readdirSync(POSTS_PATH).filter((file) => file.endsWith(".mdx"))
  } catch (error) {
    console.error("Error reading blog directory:", error)
    return []
  }
}

// Get post by slug
export async function getPostBySlug(slug: string) {
  try {
    const filePath = path.join(POSTS_PATH, `${slug}.mdx`)
    const source = fs.readFileSync(filePath, "utf8")

    const { content, data } = matter(source)

    const mdxSource = await compileMDX({
      source: content,
      components,
      options: {
        parseFrontmatter: false,
      },
    })

    return {
      slug: slug.replace(".mdx", ""),
      frontMatter: {
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString().split("T")[0],
        category: data.category || "Uncategorized",
        readTime: data.readTime || "5 min read",
        description: data.description || "",
        ...data,
      },
      content: mdxSource.content,
    }
  } catch (error) {
    console.error(`Error processing post ${slug}:`, error)
    throw error
  }
}

// Get all posts with frontmatter
export async function getAllPosts() {
  const slugs = await getPostSlugs()

  if (slugs.length === 0) {
    return []
  }

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const { frontMatter, slug: postSlug } = await getPostBySlug(slug.replace(".mdx", ""))
        return {
          slug: postSlug,
          ...frontMatter,
        }
      } catch (error) {
        console.error(`Error processing post ${slug}:`, error)
        return null
      }
    }),
  )

  // Filter out any null values and sort posts by date (newest first)
  return posts.filter(Boolean).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

