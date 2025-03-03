import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Code, Database, GitBranch, Monitor, Server, Shield, Terminal } from "lucide-react"

const skills = [
  {
    icon: Cloud,
    title: "Cloud Platforms",
    details: [
      "AWS (EC2, S3, RDS, Lambda)",
      "DigitalOcean, Scaleway, Hetzner Cloud",
    ]
  },
  {
    icon: Terminal,
    title: "Infrastructure as Code",
    details: [
      "Terraform",
      "Ansible",
      "Crossplane",
      "Pulumi"
    ]
  },
  {
    icon: GitBranch,
    title: "CI/CD",
    details: [
      "GitHub Actions",
      "GitLab CI/CD)",
      "ArgoCD, Flux (GitOps)"
    ]
  },
  {
    icon: Server,
    title: "Containerization",
    details: [
      "Docker",
      "Kubernetes ",
      "CRI-O, containerd",
    ]
  },
  {
    icon: Monitor,
    title: "Monitoring & Logging",
    details: [
      "Prometheus, Thanos",
      "Grafana",
      "Loki, Tempo",
      "ELK Stack",
      "Datadog, New Relic (APM)"
    ]
  },
  {
    icon: Code,
    title: "Scripting & Programming",
    details: [
      "PHP (Laravel, Symfony)",
      "Go ",
      "JavaScript/TypeScript",
      "Bash ",
      "Python "
    ]
  },
  {
    icon: Database,
    title: "Databases",
    details: [
      "PostgreSQL",
      "MySQL/MariaDB",
      "Elasticsearch",
      "Redis, DynamoDB (NoSQL)"
    ]
  },
  {
    icon: Shield,
    title: "Security",
    details: [
      "HashiCorp Vault",
      "SAST/DAST (code scanning)",
      "Compliance Automation"
    ]
  },
  {
    icon: Terminal,
    title: "DevOps Practices",
    details: [
      "GitOps",
      "Infrastructure Automation",
      "Chaos Engineering"
    ]
  }
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="outline" className="px-3 py-1 border-primary/50 text-primary">
              ls -la ./skills
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">~/skills</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              <span className="text-primary">#</span> A comprehensive toolkit of DevOps technologies and methodologies
              I've mastered over the years.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <Card key={index} className="bg-card border-primary/20">
              <CardContent className="p-6 flex flex-col items-left text-left space-y-4">
                <skill.icon className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground text-left">
                    {skill.details.map((detail, idx) => (
                      <span key={idx}>
                        <span className="text-primary">$</span> {detail}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

