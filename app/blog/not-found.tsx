import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Terminal } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 text-center md:px-6 md:py-24 lg:gap-10">
          <div className="space-y-3">
            <Terminal className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404 Not Found</h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              <span className="text-primary">Error:</span> The blog post you're looking for doesn't exist or has been
              moved.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/blog">Return to Blog</Link>
            </Button>
            <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </div>
          <div className="terminal-window w-full max-w-md">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
              <span className="ml-2">bash</span>
            </div>
            <div className="terminal-content p-4 font-mono text-sm leading-relaxed">
              <p>
                <span className="text-primary">$</span> find /blog -name "missing-post"
              </p>
              <p className="text-foreground">find: No such file or directory</p>
              <p>
                <span className="text-primary">$</span> cd /blog
              </p>
              <p className="text-foreground">Navigating to blog directory...</p>
              <p>
                <span className="text-primary">$</span> ls
              </p>
              <p className="text-foreground">k3s-cluster-proxmox.md qmk-firmware-ergodox.md gitops-argocd-flux.md</p>
              <p>
                <span className="text-primary">$</span> <span className="cursor-blink"></span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

