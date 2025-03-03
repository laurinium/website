import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Terminal } from "lucide-react"

export default function HeroSection() {
  // const initialCommands = [
  //   {
  //     command: "whoami",
  //     output: "jens.laur",
  //   },
  //   {
  //     command: "cat interests.txt",
  //     output: ["DevOps Leadership", "Home Automation", "Mechanical Keyboards", "HomeLab Engineering"],
  //   },
  //   {
  //     command: "qmk compile ergodox_ez.json",
  //     output: "Compiling: [====================] 100%",
  //   },
  //   {
  //     command: "uptime",
  //     output: "10+ years in tech, still loving it",
  //   },
  //   {
  //     command: "docker ps | grep homelab",
  //     output: ["homeassistant  UP  13 days", "pihole         UP  47 days", "grafana        UP  21 days"],
  //   },
  // ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-background/70">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Jens Laur</h1>
              </div>
              <div className="flex items-center">
                <span className="text-primary mr-2">{">"}</span>
                <p className="text-xl text-muted-foreground">Tech Lead / DevOps Engineer</p>
              </div>
              <div className="flex items-start">
                <span className="text-primary mr-2 mt-1">{">"}</span>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Crafting robust infrastructure, automating everything possible, and building cool stuff - from
                  enterprise CI/CD pipelines to custom mechanical keyboards. When I&apos;m not orchestrating containers,
                  I&apos;m tinkering with my homelab or programming another QMK firmware.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="#contact">$ chmod +x hire_me.sh</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-primary/50 text-primary hover:bg-primary/10"
              >
                <Link href="#projects">$ ls ~/projects</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[500px] rounded-lg overflow-hidden">
              <Image
                src="/jens.png"
                alt="Infrastructure and Network Visualization"
                width={500}
                height={500}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

