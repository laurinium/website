import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Terminal } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center">
          <Terminal className="mr-2 h-5 w-5 text-primary" />
          <span className="text-foreground">~/</span>
          <span className="text-primary">laurinium_</span>
          <span className="text-primary cursor-blink"></span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            ./about
          </Link>
          <Link href="#skills" className="text-sm font-medium hover:text-primary transition-colors">
            ./skills
          </Link>
          <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
            ./projects
          </Link>
          <Link href="#experience" className="text-sm font-medium hover:text-primary transition-colors">
            ./experience
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            ./contact
          </Link>
        </nav>
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
                  ./about
                </Link>
                <Link href="#skills" className="text-sm font-medium hover:text-primary transition-colors">
                  ./skills
                </Link>
                <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
                  ./projects
                </Link>
                <Link href="#experience" className="text-sm font-medium hover:text-primary transition-colors">
                  ./experience
                </Link>
                <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                  ./contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Link href="#contact">$ contact --now</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

