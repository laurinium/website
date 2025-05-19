import { ArrowRightIcon } from "@/components/icons/arrow-right"
import { cn } from "@/lib/utils"
import Link from "next/link"

import { Diagram } from "@/components/ui/diagram"

export default function BuildingCicdPipelinePage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Building a CI/CD Pipeline</h1>
      <p className="mb-8">
        This guide will walk you through the process of building a CI/CD pipeline for your application.
      </p>

      <h2 className="text-2xl font-bold mb-4">Pipeline Architecture</h2>
      <p className="mb-4">
        The following diagram shows the architecture of our CI/CD pipeline.
      </p>
      <Diagram
        title="CI/CD Pipeline Architecture"
        type="flowchart"
        definition={`

          graph TD
A["Developer"]-- > B["GitHub Repository"]
B-- > C["GitHub Actions"]
C-- > D["Run Tests"]
D-- > E["Build Docker Image"]
E-- > F["Push to Registry"]
F-- > G["Security Scan"]
G-- > H["Deploy to Kubernetes"]
H-- > I["Health Checks"]
I-- > J["Production"]
C-- > K["Notify Team"]
H-- >
  K`}
      />

      <h2 className="text-2xl font-bold mb-4">Kubernetes Deployment</h2>
      <p className="mb-4">
        We use Kubernetes to deploy our application. This allows us to easily scale our application and manage our infrastructure.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Automated deployments</li>
        <li>Easy scaling</li>
        <li>High availability</li>
      </ul>
      <p>This Kubernetes manifest includes:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Deployment</li>
        <li>Service</li>
        <li>Ingress</li>
      </ul>
      <Diagram
        title="Kubernetes Deployment Architecture"
type = "architecture"
definition={`
graph
LR
A["GitHub Actions"]-->|Push
Image | B["Container Registry"]
B-->|Pull
Image | C["Kubernetes Cluster"]
C-->|Deploy
to | D["Development"]
C-->|Deploy
to | E["Production"]
C-->|Deploy
to | F["Staging"]
G["kubectl"]-->|Apply
Manifests | C
H["Helm"]-->|Install
Charts | C
I["ArgoCD"]-->|Sync|C
        `}
      />

      <h2 className="text-2xl font-bold mb-4">Monitoring</h2>
      <p className="mb-4">
        We use Prometheus and Grafana to monitor our application. This allows us to track the performance of our application and identify any issues.
      </p>
      <Diagram
        title="Monitoring Architecture"
        type="flowchart"
        definition={`
graph
TD
A["Application Pods"]-- > B["Prometheus"]
B-- > C["Grafana"]
D["GitHub Actions"]-- > E["Metrics Collector"]
E-- > B
C-- > F["Dashboards"]
C-- > G["Alerts"]
G-->H["Notification Channels"]
        `}
      />

      <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
      <p className="mb-4">
        This guide has shown you how to build a CI/CD pipeline for your application. By following these steps, you can automate your deployments and improve the quality of your software.
      </p>
      <Link
        href="/"
        className={cn(
          "flex items-center gap-2 text-primary hover:underline",
          "dark:text-primary-foreground"
        )}
      >
        <ArrowRightIcon className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  )
}

