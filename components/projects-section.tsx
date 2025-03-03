import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    filename: "home-lab.yml",
    title: "Home Lab Setup",
    description: "Personal infrastructure playground",
    details: "Built a homelab environment with Proxmox VE, running various services and applications in Docker containers and virtual machines for learning and experimentation.",
    badges: ["proxmox", "docker", "k8s", "talos"],
    codeLink: "#",
    demoLink: "#"
  },
  {
    filename: "k8s-platform.yml",
    title: "Kubernetes Homelab Platform",
    description: "Self-hosted Kubernetes cluster",
    details: "Created a multi-node Kubernetes cluster using Talos OS, enabling self-hosted applications and services with persistent storage and automated backups.",
    badges: ["Kubernetes", "Talos", "Helm", "OpenEBS"],
    codeLink: "#",
    demoLink: "#"
  },
  {
    filename: "keyboard.yml",
    title: "Custom Keyboard Firmware",
    description: "Personalized keyboard layout",
    details: "Designed and programmed a custom keyboard layout for an Lily58 Pro keyboard, optimizing key mappings and layers for improved typing efficiency and comfort.",
    badges: ["QMK", "Lily58", "keymap", "ergonomics"],
    codeLink: "#",
    demoLink: "#"
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="outline" className="px-3 py-1 border-primary/50 text-primary">
              find ./projects -type f -name "*.yml"
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">~/projects</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              <span className="text-primary">#</span> Showcasing some of my most impactful DevOps projects and
              infrastructure solutions.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="bg-card border-primary/20">
              <CardHeader>
                <div className="terminal-header text-xs">
                  <div className="terminal-dot bg-red-500"></div>
                  <div className="terminal-dot bg-yellow-500"></div>
                  <div className="terminal-dot bg-green-500"></div>
                  <span className="ml-2">{project.filename}</span>
                </div>
                <CardTitle className="mt-3">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary"># Description:</span>
                  <br />
                  {project.details}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.badges.map((badge, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-primary/50 text-primary hover:bg-primary/10"
                >
                  <Link href={project.codeLink} className="flex items-center gap-1">
                    <Github className="h-4 w-4" />
                    <span>Code</span>
                  </Link>
                </Button>
                <Button size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href={project.demoLink} className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <span>Demo</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

