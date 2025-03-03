import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react"

const experiences = [
  {
    "title": "Techlead DevOps",
    "company": "SECRA Bookings GmbH",
    "period": "11.2023 – present",
    "responsibilities": [
      "Leading and mentoring a team of DevOps Engineers to optimize development and operational processes",
      "Analyzing and improving existing workflows to enhance efficiency and scalability for development teams",
      "Strategic planning and implementation of automation solutions to reduce manual tasks",
      "Collaborating with developers and other teams to ensure a stable and high-performing infrastructure"
    ]
  },
  {
    "title": "DevOps Engineer",
    "company": "SECRA GmbH",
    "period": "05.2021 – 11.2023",
    "responsibilities": [
      "Managing and optimizing infrastructure while ensuring system stability and performance",
      "Developing and implementing CI/CD pipelines to automate deployments and reduce time-to-market by 30%",
      "Designing, building, and operating highly available bare-metal Kubernetes clusters to improve service resilience",
      "Monitoring and troubleshooting systems to minimize downtime and enhance operational security",
      "Working closely with developers to refine deployment strategies and infrastructure architecture"
    ]
  },
  {
    "title": "Software Developer",
    "company": "SECRA GmbH",
    "period": "07.2016 – 05.2021",
    "responsibilities": [
      "Developing and maintaining PHP-based services for the vacation rental industry with a focus on performance and scalability",
      "Architecting and designing software solutions based on internal and external stakeholder requirements",
      "Optimizing existing applications to enhance user experience and reduce latency",
      "Integrating external APIs and services to expand core system functionality",
      "Participating in agile development processes, code reviews, and technical decision-making to continuously improve the codebase"
    ]
  }
]



export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="outline" className="px-3 py-1">
              Experience
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Professional Journey</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              My career path and professional experience in the DevOps and infrastructure engineering space.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl space-y-8 py-12">
          {experiences.map((experience, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="grid gap-1">
                  <CardTitle>{experience.title}</CardTitle>
                  <CardDescription>{experience.company} | {experience.period}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="ml-6 list-disc text-muted-foreground space-y-2">
                  {experience.responsibilities.map((responsibility, idx) => (
                    <li key={idx}>{responsibility}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

