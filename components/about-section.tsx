import { Badge } from "@/components/ui/badge"
import { Terminal } from "@/components/ui/terminal"
import { EOF } from "dns"
import { Calendar, Briefcase, Code, Keyboard, Server, Home } from "lucide-react"

export function AboutSection() {
  const initialCommands = [
    {
      command: "neofetch",
      output: [
        "OS: NixOS/Arch Linux",
        "Role: Tech Lead DevOps",
        "Shell: zsh + oh-my-zsh",
        "Editor: Neovim + tmux",
        "Keyboard: Custom ErgoDox",
        "Homelab: 4-node cluster",
        "Interests: Automation++",
      ],
    },
  ]

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="outline" className="px-3 py-1 border-primary/50 text-primary">
              cat about.md
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">~/about</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              <span className="text-primary">#</span> Tech lead by day, keyboard builder by night, and homelab
              enthusiast 24/7
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-4">
          <div className="flex flex-col justify-center space-y-2">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">
                <span className="text-primary">function</span> <span className="text-foreground">getBackground</span>(){" "}
                {`{`}
              </h3>
              <p className="text-muted-foreground pl-4">
                As a Tech Lead DevOps Engineer, I specialize in building and scaling infrastructure, mentoring teams,
                and implementing best practices. My approach combines enterprise-grade reliability with the innovative
                spirit of open-source communities.
              </p>
              <p className="text-muted-foreground pl-4">
                When I&apos;m not leading DevOps initiatives, you&apos;ll find me soldering switches for my latest
                keyboard build, automating my home with Home Assistant, or expanding my homelab cluster running
                everything from Pi-hole to Kubernetes.
              </p>
              <p className="text-foreground">{`}`}</p>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <Terminal
              
              initialCommands={initialCommands}
              className="w-full"
              welcomeMessage={[
                "# cat ./jens.yaml",
                "apiVersion: devops/v1",
                "kind: Engineer",
                "metadata:",
                "  name: jens",
                "  labels:",
                "    role: tech-lead-devops",
                "spec:",
                "  caffeine: critical",
                "  skills:",
                "    yaml: legendary",
                "    linux: native",
                "    cloud: CLI master",
                "    automation: severe addiction",
                "  experience: 12 years",
                "  tools: [Terraform, Kubernetes, Bash, Neovim]",
                "  homelab: Proxmox + K3s",
                "  hobbies: [Keyboards, Tinkering, 3D printing]",
                "  favoriteMovies: [Matrix, Blade Runner 2049, Star Wars]",
                "  music: [Numetal, K-Pop, Dark Synth, Synthwave]",
                "  os: \"Arch Linux (btw)\"",
                "  gamingRig: \"7800X3D, RTX 4070, 64GB RAM\"",
                "  workoutRoutine: \"Lifting servers\"",
                "  philosophy: \"Automate everything\""
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

