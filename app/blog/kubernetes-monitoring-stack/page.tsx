"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CodeBlock } from "@/components/ui/code-block"
import { Diagram } from "@/components/ui/diagram"
import { Calendar, Clock, ArrowLeft, AlertTriangle, Info, Check, Copy, CheckCheck } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

export default function BlogPostPage() {
  const post = {
    title: "Building a Comprehensive Kubernetes Monitoring Stack",
    date: "2023-09-25",
    category: "DevOps",
    readTime: "15 min read",
    description:
      "A detailed guide to setting up Prometheus, Grafana, and Loki for full-stack monitoring and observability in Kubernetes environments.",
    slug: "kubernetes-monitoring-stack",
  }

  const [copied, setCopied] = useState<{ [key: string]: boolean }>({})

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [id]: true })
      setTimeout(() => {
        setCopied({ ...copied, [id]: false })
      }, 2000)
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-4 mb-8">
              <Link href="/blog" className="flex items-center text-primary hover:text-primary/80 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>

              <div className="flex flex-wrap gap-2 mb-4">
                <Link href={`/blog?category=${post.category}`}>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">
                    {post.category}
                  </Badge>
                </Link>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readTime}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {post.date}
                </div>
              </div>

              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>

              {/* Table of Contents */}
              <div className="mt-8 p-4 bg-card border border-primary/20 rounded-md">
                <h2 className="text-xl font-bold mb-3">Table of Contents</h2>
                <ul className="space-y-1 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">$</span>
                    <Link href="#introduction" className="hover:text-primary">
                      Introduction
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">$</span>
                    <Link href="#architecture" className="hover:text-primary">
                      Monitoring Stack Architecture
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">$</span>
                    <Link href="#prerequisites" className="hover:text-primary">
                      Prerequisites
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">$</span>
                    <Link href="#prometheus" className="hover:text-primary">
                      Setting Up Prometheus
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">$</span>
                    <Link href="#grafana" className="hover:text-primary">
                      Configuring Grafana
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">$</span>
                    <Link href="#loki" className="hover:text-primary">
                      Implementing Loki for Logs
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">$</span>
                    <Link href="#alerts" className="hover:text-primary">
                      Setting Up Alerts
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">$</span>
                    <Link href="#dashboards" className="hover:text-primary">
                      Creating Custom Dashboards
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">$</span>
                    <Link href="#conclusion" className="hover:text-primary">
                      Conclusion
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="prose prose-invert max-w-none mt-8">
                {/* Introduction */}
                <section id="introduction">
                  <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                  <p className="text-muted-foreground mb-4">
                    Monitoring is a critical aspect of running applications in Kubernetes. Without proper observability,
                    troubleshooting issues becomes a guessing game, and proactive problem prevention is nearly
                    impossible. In this guide, we'll build a comprehensive monitoring stack using three powerful
                    open-source tools:
                  </p>

                  <ul className="list-disc pl-6 text-muted-foreground mb-6">
                    <li>
                      <strong className="text-foreground">Prometheus</strong> - for metrics collection and storage
                    </li>
                    <li>
                      <strong className="text-foreground">Grafana</strong> - for visualization and dashboards
                    </li>
                    <li>
                      <strong className="text-foreground">Loki</strong> - for log aggregation and querying
                    </li>
                  </ul>

                  <div className="terminal-window w-full my-8">
                    <div className="terminal-header">
                      <div className="terminal-dot bg-red-500"></div>
                      <div className="terminal-dot bg-yellow-500"></div>
                      <div className="terminal-dot bg-green-500"></div>
                      <span className="ml-2">monitoring-overview.sh</span>
                    </div>
                    <div className="terminal-content p-4 font-mono text-sm leading-relaxed">
                      <p>
                        <span className="text-primary">$</span> echo "Kubernetes Monitoring Stack Components"
                      </p>
                      <p className="text-foreground mt-1">Kubernetes Monitoring Stack Components</p>
                      <p className="mt-4">
                        <span className="text-primary">$</span> cat components.txt
                      </p>
                      <p className="text-foreground mt-1">
                        1. Prometheus - Metrics collection and storage
                        <br />
                        2. Grafana - Visualization and dashboards
                        <br />
                        3. Loki - Log aggregation and querying
                        <br />
                        4. Alertmanager - Alert routing and notifications
                        <br />
                        5. Promtail - Log collection agent
                        <br />
                        6. kube-state-metrics - Kubernetes state metrics
                        <br />
                        7. node-exporter - Node-level metrics
                      </p>
                      <p className="mt-4">
                        <span className="text-primary">$</span> echo "Benefits: Complete observability, troubleshooting,
                        alerting, and visualization"
                      </p>
                      <p className="text-foreground mt-1">
                        Benefits: Complete observability, troubleshooting, alerting, and visualization
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground">
                    By the end of this tutorial, you'll have a fully functional monitoring stack that provides insights
                    into your Kubernetes cluster's health, performance, and logs. This setup is suitable for both
                    development environments and production clusters with appropriate scaling considerations.
                  </p>
                </section>

                {/* Architecture Overview */}
                <section id="architecture" className="mt-12">
                  <h2 className="text-2xl font-bold mb-4">Monitoring Stack Architecture</h2>
                  <p className="text-muted-foreground mb-6">
                    Before diving into implementation, let's understand the architecture of our monitoring stack:
                  </p>

                  <Diagram
                    title="Kubernetes Monitoring Stack Architecture"
                    type="flowchart"
                    definition={`
 flowchart TD;
                        A["Kubernetes Pods"] -->|Expose metrics| B["Prometheus"]
                        C["node-exporter"] -->|Node metrics| B
                        D["kube-state-metrics"] -->|K8s state| B
                        E["Kubernetes Nodes"] -->|Logs| F["Promtail"]
                        F -->|Forward logs| G["Loki"]
                        B -->|Metrics| H["Grafana"]
                        G -->|Logs| H
                        B -->|Alerts| I["Alertmanager"]
                        I -->|Notifications| J["Email/Slack/PagerDuty"]
                        H -->|Visualize| K["Dashboards"]
                        H -->|Query| L["Explore"]
                    `}
                  />

                  <p className="text-muted-foreground mb-4">The monitoring stack follows these key principles:</p>
                  <ul className="list-disc pl-6 text-muted-foreground mb-6">
                    <li>
                      <strong className="text-foreground">Metrics Collection:</strong> Prometheus scrapes metrics from
                      various sources
                    </li>
                    <li>
                      <strong className="text-foreground">Log Collection:</strong> Promtail collects logs and sends them
                      to Loki
                    </li>
                    <li>
                      <strong className="text-foreground">Visualization:</strong> Grafana provides dashboards for both
                      metrics and logs
                    </li>
                    <li>
                      <strong className="text-foreground">Alerting:</strong> Alertmanager handles alert routing and
                      notifications
                    </li>
                  </ul>

                  <div className="bg-card border border-primary/20 rounded-md p-4 my-6">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-bold">Data Flow</h3>
                        <p className="text-sm text-muted-foreground">The data flow in our monitoring stack:</p>
                        <ul className="text-sm text-muted-foreground list-disc ml-6 mt-2">
                          <li>
                            <strong>Metrics:</strong> Applications → Prometheus → Grafana
                          </li>
                          <li>
                            <strong>Logs:</strong> Applications → Promtail → Loki → Grafana
                          </li>
                          <li>
                            <strong>Alerts:</strong> Prometheus → Alertmanager → Notification channels
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Prerequisites */}
                <section id="prerequisites" className="mt-12">
                  <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                  <p className="text-muted-foreground mb-4">
                    Before we start setting up our monitoring stack, ensure you have the following:
                  </p>

                  <ul className="list-disc pl-6 text-muted-foreground mb-6">
                    <li>A running Kubernetes cluster (local or cloud-based)</li>
                    <li>kubectl configured to connect to your cluster</li>
                    <li>Helm 3 installed</li>
                    <li>Basic understanding of Kubernetes concepts</li>
                    <li>Sufficient resources in your cluster (at least 4GB RAM available)</li>
                  </ul>

                  <div className="bg-card border border-primary/20 rounded-md p-4 my-6">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-bold">Resource Requirements</h3>
                        <p className="text-sm text-muted-foreground">
                          The monitoring stack can be resource-intensive. For production environments, consider these
                          minimum requirements:
                        </p>
                        <ul className="text-sm text-muted-foreground list-disc ml-6 mt-2">
                          <li>Prometheus: 2 CPU cores, 8GB RAM</li>
                          <li>Grafana: 1 CPU core, 2GB RAM</li>
                          <li>Loki: 2 CPU cores, 4GB RAM</li>
                          <li>Persistent storage for metrics and logs</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="terminal-window w-full my-8">
                    <div className="terminal-header">
                      <div className="terminal-dot bg-red-500"></div>
                      <div className="terminal-dot bg-yellow-500"></div>
                      <div className="terminal-dot bg-green-500"></div>
                      <span className="ml-2">check-prerequisites.sh</span>
                    </div>
                    <div className="terminal-content p-4 font-mono text-sm leading-relaxed">
                      <p>
                        <span className="text-primary">$</span> kubectl version --short
                      </p>
                      <p className="text-foreground mt-1">
                        Client Version: v1.27.3
                        <br />
                        Kustomize Version: v5.0.1
                        <br />
                        Server Version: v1.26.5
                      </p>
                      <p className="mt-4">
                        <span className="text-primary">$</span> helm version --short
                      </p>
                      <p className="text-foreground mt-1">v3.12.1+g857a5c8</p>
                      <p className="mt-4">
                        <span className="text-primary">$</span> kubectl create namespace monitoring
                      </p>
                      <p className="text-foreground mt-1">namespace/monitoring created</p>
                    </div>
                  </div>
                </section>

                {/* Prometheus Setup */}
                <section id="prometheus" className="mt-12">
                  <h2 className="text-2xl font-bold mb-4">Setting Up Prometheus</h2>
                  <p className="text-muted-foreground mb-4">
                    We'll use the Prometheus Operator from the kube-prometheus-stack Helm chart, which includes
                    Prometheus, Alertmanager, and necessary exporters.
                  </p>

                  <h3 className="text-xl font-bold mb-4">Installing Prometheus with Helm</h3>

                  <div className="relative group">
                    <div
                      className="absolute right-4 top-4 cursor-pointer z-10"
                      onClick={() =>
                        copyToClipboard(
                          "# Add the Prometheus community Helm repository\nhelm repo add prometheus-community https://prometheus-community.github.io/helm-charts\nhelm repo update\n\n# Install kube-prometheus-stack\nhelm install prometheus prometheus-community/kube-prometheus-stack \\\n  --namespace monitoring \\\n  --set prometheus.prometheusSpec.retention=15d \\\n  --set prometheus.prometheusSpec.resources.requests.cpu=1 \\\n  --set prometheus.prometheusSpec.resources.requests.memory=4Gi \\\n  --set prometheus.prometheusSpec.resources.limits.cpu=2 \\\n  --set prometheus.prometheusSpec.resources.limits.memory=8Gi \\\n  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.storageClassName=standard \\\n  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=50Gi",
                          "prometheus-install",
                        )
                      }
                    >
                      {copied["prometheus-install"] ? (
                        <CheckCheck className="h-5 w-5 text-primary" />
                      ) : (
                        <Copy className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground mt-6 mb-4">
                    For more advanced configurations, you can create a custom values file:
                  </p>

                  <p className="text-muted-foreground mt-4">Then install using the values file:</p>

                  <div className="relative group">
                    <div
                      className="absolute right-4 top-4 cursor-pointer z-10"
                      onClick={() =>
                        copyToClipboard(
                          "helm install prometheus prometheus-community/kube-prometheus-stack \\\n  --namespace monitoring \\\n  -f prometheus-values.yaml",
                          "helm-install-values",
                        )
                      }
                    >
                      {copied["helm-install-values"] ? (
                        <CheckCheck className="h-5 w-5 text-primary" />
                      ) : (
                        <Copy className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                      )}
                    </div>
                    <CodeBlock
                      language="bash"
                      code={`helm install prometheus prometheus-community/kube-prometheus-stack \\
  --namespace monitoring \\
  -f prometheus-values.yaml`}
                      fileName="terminal"
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-4 mt-8">Verifying the Installation</h3>

                  <div className="terminal-window w-full my-8">
                    <div className="terminal-header">
                      <div className="terminal-dot bg-red-500"></div>
                      <div className="terminal-dot bg-yellow-500"></div>
                      <div className="terminal-dot bg-green-500"></div>
                      <span className="ml-2">verify-prometheus.sh</span>
                    </div>
                    <div className="terminal-content p-4 font-mono text-sm leading-relaxed">
                      <p>
                        <span className="text-primary">$</span> kubectl get pods -n monitoring
                      </p>
                      <p className="text-foreground mt-1">
                        NAME READY STATUS RESTARTS AGE alertmanager-prometheus-kube-prometheus-alertmanager-0 2/2
                        Running 0 3m45s prometheus-grafana-7c9bc466d5-xk4s2 3/3 Running 0 3m45s
                        prometheus-kube-prometheus-operator-7775c66ccf-6qv4t 1/1 Running 0 3m45s
                        prometheus-kube-state-metrics-6d5d44f94f-j8t7x 1/1 Running 0 3m45s
                        prometheus-prometheus-kube-prometheus-prometheus-0 2/2 Running 0 3m45s
                        prometheus-prometheus-node-exporter-6szpd 1/1 Running 0 3m45s
                        prometheus-prometheus-node-exporter-k7zzn 1/1 Running 0 3m45s
                        prometheus-prometheus-node-exporter-rt5xb 1/1 Running 0 3m45s
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4">Accessing Prometheus UI</h3>
                  <p className="text-muted-foreground mb-4">
                    To access the Prometheus UI, you can port-forward the service:
                  </p>

                  <div className="relative group">
                    <div
                      className="absolute right-4 top-4 cursor-pointer z-10"
                      onClick={() =>
                        copyToClipboard(
                          "kubectl port-forward svc/prometheus-kube-prometheus-prometheus -n monitoring 9090:9090",
                          "prometheus-port-forward",
                        )
                      }
                    >
                      {copied["prometheus-port-forward"] ? (
                        <CheckCheck className="h-5 w-5 text-primary" />
                      ) : (
                        <Copy className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                      )}
                    </div>
                    <CodeBlock
                      language="bash"
                      code="kubectl port-forward svc/prometheus-kube-prometheus-prometheus -n monitoring 9090:9090"
                      fileName="terminal"
                    />
                  </div>

                  <p className="text-muted-foreground mt-4">
                    Then access Prometheus at <code>http://localhost:9090</code> in your browser.
                  </p>

                  <div className="bg-card border border-primary/20 rounded-md p-4 my-6">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-bold">Production Access</h3>
                        <p className="text-sm text-muted-foreground">
                          For production environments, consider setting up proper ingress with authentication or using a
                          VPN/bastion host for secure access. Never expose monitoring tools directly to the internet
                          without authentication.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Grafana Setup */}
                <section id="grafana" className="mt-12">
                  <h2 className="text-2xl font-bold mb-4">Configuring Grafana</h2>
                  <p className="text-muted-foreground mb-4">
                    Grafana is already installed as part of the kube-prometheus-stack. Let's configure it and set up
                    dashboards.
                  </p>

                  <h3 className="text-xl font-bold mb-4">Accessing Grafana</h3>
                  <p className="text-muted-foreground mb-4">First, let's port-forward the Grafana service:</p>

                  <div className="relative group">
                    <div
                      className="absolute right-4 top-4 cursor-pointer z-10"
                      onClick={() =>
                        copyToClipboard(
                          "kubectl port-forward svc/prometheus-grafana -n monitoring 3000:80",
                          "grafana-port-forward",
                        )
                      }
                    >
                      {copied["grafana-port-forward"] ? (
                        <CheckCheck className="h-5 w-5 text-primary" />
                      ) : (
                        <Copy className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                      )}
                    </div>
                    <CodeBlock
                      language="bash"
                      code="kubectl port-forward svc/prometheus-grafana -n monitoring 3000:80"
                      fileName="terminal"
                    />
                  </div>

                  <p className="text-muted-foreground mt-4 mb-4">
                    Access Grafana at <code>http://localhost:3000</code> with the default credentials:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground mb-6">
                    <li>
                      Username: <code>admin</code>
                    </li>
                    <li>
                      Password: <code>prom-operator</code> (unless you changed it in the values file)
                    </li>
                  </ul>

                  <h3 className="text-xl font-bold mb-4 mt-8">Importing Dashboards</h3>
                  <p className="text-muted-foreground mb-4">
                    The kube-prometheus-stack includes several dashboards by default, but you can import additional ones
                    from the Grafana dashboard repository.
                  </p>

                  <p className="text-muted-foreground mb-4">Here are some useful dashboard IDs to import:</p>
                  <table className="w-full my-6 border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-primary/20 p-2 text-left">Dashboard ID</th>
                        <th className="border border-primary/20 p-2 text-left">Name</th>
                        <th className="border border-primary/20 p-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-primary/20 p-2">1860</td>
                        <td className="border border-primary/20 p-2">Node Exporter Full</td>
                        <td className="border border-primary/20 p-2">Detailed node metrics</td>
                      </tr>
                      <tr>
                        <td className="border border-primary/20 p-2">13105</td>
                        <td className="border border-primary/20 p-2">Kubernetes Cluster Monitoring</td>
                        <td className="border border-primary/20 p-2">Overview of cluster resources</td>
                      </tr>
                      <tr>
                        <td className="border border-primary/20 p-2">8588</td>
                        <td className="border border-primary/20 p-2">
                          Kubernetes Deployment Statefulset Daemonset metrics
                        </td>
                        <td className="border border-primary/20 p-2">Workload-specific metrics</td>
                      </tr>
                      <tr>
                        <td className="border border-primary/20 p-2">11074</td>
                        <td className="border border-primary/20 p-2">Node Exporter for Prometheus</td>
                        <td className="border border-primary/20 p-2">Alternative node metrics dashboard</td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="text-muted-foreground mb-4">To import a dashboard:</p>
                  <ol className="list-decimal pl-6 text-muted-foreground mb-6">
                    <li>In Grafana, click on the "+" icon in the left sidebar</li>
                    <li>Select "Import"</li>
                    <li>Enter the dashboard ID</li>
                    <li>Select the Prometheus data source</li>
                    <li>Click "Import"</li>
                  </ol>

                  <Diagram
                    title="Grafana Dashboard Structure"
                    type="flowchart"
                    definition={`
                      flowchart TD;
                        A["Grafana"] -->|Contains| B["Dashboards"]
                        B -->|Organized by| C["Folders"]
                        B -->|Composed of| D["Panels"]
                        D -->|Display| E["Metrics"]
                        D -->|Types| F["Graph"]
                        D -->|Types| G["Stat"]
                        D -->|Types| H["Table"]
                        D -->|Types| I["Heatmap"]
                        E -->|Queried via| J["PromQL"]
                    `}
                  />
                </section>

                {/* Loki Setup */}
                <section id="loki" className="mt-12">
                  <h2 className="text-2xl font-bold mb-4">Implementing Loki for Logs</h2>
                  <p className="text-muted-foreground mb-4">
                    Loki is a horizontally-scalable, highly-available log aggregation system inspired by Prometheus.
                    Let's add it to our monitoring stack.
                  </p>

                  <h3 className="text-xl font-bold mb-4">Installing Loki with Helm</h3>

                  <p className="text-muted-foreground mt-6 mb-4">
                    For more advanced configurations, create a custom values file:
                  </p>

                  <p className="text-muted-foreground mt-4">Then install using the values file:</p>

                  <div className="relative group">
                    <div
                      className="absolute right-4 top-4 cursor-pointer z-10"
                      onClick={() =>
                        copyToClipboard(
                          "helm install loki grafana/loki-stack \\\n  --namespace monitoring \\\n  --set grafana.enabled=false \\\n  --set prometheus.enabled=false \\\n  -f loki-values.yaml",
                          "helm-install-loki-values",
                        )
                      }
                    >
                      {copied["helm-install-loki-values"] ? (
                        <CheckCheck className="h-5 w-5 text-primary" />
                      ) : (
                        <Copy className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                      )}
                    </div>
                    <CodeBlock
                      language="bash"
                      code={`helm install loki grafana/loki-stack \\
  --namespace monitoring \\
  --set grafana.enabled=false \\
  --set prometheus.enabled=false \\
  -f loki-values.yaml`}
                      fileName="terminal"
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-4 mt-8">Configuring Loki as a Data Source in Grafana</h3>
                  <p className="text-muted-foreground mb-4">Now we need to add Loki as a data source in Grafana:</p>

                  <ol className="list-decimal pl-6 text-muted-foreground mb-6">
                    <li>In Grafana, go to Configuration {"->"} Data Sources</li>
                    <li>Click "Add data source"</li>
                    <li>Select "Loki"</li>
                    <li>
                      Set the URL to <code>http://loki:3100</code>
                    </li>
                    <li>Click "Save & Test"</li>
                  </ol>

                  <div className="bg-card border border-primary/20 rounded-md p-4 my-6">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-bold">Loki Query Examples</h3>
                        <p className="text-sm text-muted-foreground">Here are some useful LogQL queries for Loki:</p>
                        <ul className="text-sm text-muted-foreground list-disc ml-6 mt-2">
                          <li>
                            <code>{'{namespace="kube-system"}'}</code> - All logs from kube-system namespace
                          </li>
                          <li>
                            <code>{'{namespace="default", container="nginx"}'}</code> - Nginx container logs in default
                            namespace
                          </li>
                          <li>
                            <code>{'{namespace="monitoring"} |~ "error|warn"'}</code> - Error and warning logs in
                            monitoring namespace
                          </li>
                          <li>
                            <code>{'{namespace="default"} |= "exception" | json | line_format "{{.message}}"'}</code> -
                            Extract message field from JSON logs
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Tabs defaultValue="basic" className="w-full my-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basic">Basic Queries</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced Queries</TabsTrigger>
                      <TabsTrigger value="metrics">Log Metrics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic" className="p-4 border rounded-md border-primary/20 mt-2">
                      <h4 className="font-bold mb-2">Basic LogQL Queries</h4>
                      <p className="text-sm text-muted-foreground mb-2">Basic queries filter logs by their labels:</p>
                      <CodeBlock
                        language="logql"
                        code={`{namespace="default"}
{app="nginx"}
{pod=~"web-.*"}
{container="api", namespace="prod"}`}
                        fileName="Basic LogQL"
                      />
                    </TabsContent>
                    <TabsContent value="advanced" className="p-4 border rounded-md border-primary/20 mt-2">
                      <h4 className="font-bold mb-2">Advanced LogQL Queries</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Advanced queries use filtering and pattern matching:
                      </p>
                      <CodeBlock
                        language="logql"
                        code={`{namespace="default"} |= "error"
{namespace="default"} |~ "warn|error|exception"
{namespace="default"} |= "error" != "timeout"
{namespace="default"} |= "error" | json | line_format "{{.err}}: {{.msg}}"`}
                        fileName="Advanced LogQL"
                      />
                    </TabsContent>
                    <TabsContent value="metrics" className="p-4 border rounded-md border-primary/20 mt-2">
                      <h4 className="font-bold mb-2">Log Metrics Queries</h4>
                      <p className="text-sm text-muted-foreground mb-2">Extract metrics from logs:</p>
                      <CodeBlock
                        language="logql"
                        code={`sum(count_over_time({namespace="default", container="api"} |= "error" [5m])) by (pod)
sum(rate({namespace="default"} |= "request" | json | unwrap duration_ms [5m])) by (endpoint)
sum by (status_code) (count_over_time({namespace="default"} | json | status_code=~"5.." [5m]))`}
                        fileName="Metrics LogQL"
                      />
                    </TabsContent>
                  </Tabs>
                </section>

                {/* Alerts */}
                <section id="alerts" className="mt-12">
                  <h2 className="text-2xl font-bold mb-4">Setting Up Alerts</h2>
                  <p className="text-muted-foreground mb-4">
                    Alerting is a critical component of any monitoring system. Let's configure alerts using Prometheus
                    Alertmanager.
                  </p>

                  <h3 className="text-xl font-bold mb-4">Creating Alert Rules</h3>
                  <p className="text-muted-foreground mb-4">
                    The kube-prometheus-stack includes many default alert rules, but you can add custom ones. Create a
                    PrometheusRule custom resource:
                  </p>

                  <div className="relative group">
                    <div
                      className="absolute right-4 top-4 cursor-pointer z-10"
                      onClick={() =>
                        copyToClipboard(
                          'apiVersion: monitoring.coreos.com/v1\nkind: PrometheusRule\nmetadata:\n  name: custom-alerts\n  namespace: monitoring\n  labels:\n    release: prometheus\n    app: kube-prometheus-stack\nspec:\n  groups:\n  - name: custom.rules\n    rules:\n    - alert: HighCPUUsage\n      expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80\n      for: 5m\n      labels:\n        severity: warning\n      annotations:\n        summary: High CPU usage detected\n        description: "CPU usage is above 80% for 5 minutes on {{ $labels.instance }}"\n        \n    - alert: HighMemoryUsage\n      expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100 > 80\n      for: 5m\n      labels:\n        severity: warning\n      annotations:\n        summary: High memory usage detected\n        description: "Memory usage is above 80% for 5 minutes on {{ $labels.instance }}"\n        \n    - alert: PodCrashLooping\n      expr: increase(kube_pod_container_status_restarts_total[1h]) > 5\n      for: 10m\n      labels:\n        severity: warning\n      annotations:\n        summary: Pod is crash looping\n        description: "Pod {{ $labels.namespace }}/{{ $labels.pod }} is restarting frequently"\n        \n    - alert: PersistentVolumeFilling\n      expr: kubelet_volume_stats_available_bytes / kubelet_volume_stats_capacity_bytes * 100 < 20\n      for: 5m\n      labels:\n        severity: warning\n      annotations:\n        summary: PersistentVolume is filling up\n        description: "PersistentVolume {{ $labels.persistentvolumeclaim }} is {{ $value | humanizePercentage }} full"',
                          "custom-alerts",
                        )
                      }
                    >
                      {copied["custom-alerts"] ? (
                        <CheckCheck className="h-5 w-5 text-primary" />
                      ) : (
                        <Copy className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                      )}
                    </div>
                    <CodeBlock
                      language="yaml"
                      code={`apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: custom-alerts
  namespace: monitoring
  labels:
    release: prometheus
    app: kube-prometheus-stack
spec:
  groups:
  - name: custom.rules
    rules:
    - alert: HighCPUUsage
      expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: High CPU usage detected
        description: "CPU usage is above 80% for 5 minutes on {{ $labels.instance }}"
        
    - alert: HighMemoryUsage
      expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100 > 80
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: High memory usage detected
        description: "Memory usage is above 80% for 5 minutes on {{ $labels.instance }}"
        
    - alert: PodCrashLooping
      expr: increase(kube_pod_container_status_restarts_total[1h]) > 5
      for: 10m
      labels:
        severity: warning
      annotations:
        summary: Pod is crash looping
        description: "Pod {{ $labels.namespace }}/{{ $labels.pod }} is restarting frequently"
        
    - alert: PersistentVolumeFilling
      expr: kubelet_volume_stats_available_bytes / kubelet_volume_stats_capacity_bytes * 100 < 20
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: PersistentVolume is filling up
        description: "PersistentVolume {{ $labels.persistentvolumeclaim }} is {{ $value | humanizePercentage }} full"`}
                      fileName="custom-alerts.yaml"
                    />
                  </div>

                  <p className="text-muted-foreground mt-4">Apply the custom alerts:</p>

                  <div className="relative group">
                    <div
                      className="absolute right-4 top-4 cursor-pointer z-10"
                      onClick={() => copyToClipboard("kubectl apply -f custom-alerts.yaml", "apply-alerts")}
                    >
                      {copied["apply-alerts"] ? (
                        <CheckCheck className="h-5 w-5 text-primary" />
                      ) : (
                        <Copy className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                      )}
                    </div>
                    <CodeBlock language="bash" code="kubectl apply -f custom-alerts.yaml" fileName="terminal" />
                  </div>

                  <h3 className="text-xl font-bold mb-4 mt-8">Configuring Alertmanager</h3>
                  <p className="text-muted-foreground mb-4">
                    Now, let's configure Alertmanager to send notifications. Create a Secret with the Alertmanager
                    configuration:
                  </p>

                  <Alert className="my-6 border-primary/20">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Important Note</AlertTitle>
                    <AlertDescription>
                      Remember to replace the placeholder values in the Alertmanager configuration:
                      <ul className="list-disc pl-6 mt-2">
                        <li>
                          Replace <code>https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK</code> with your actual
                          Slack webhook URL
                        </li>
                        <li>
                          Replace <code>your_pagerduty_service_key</code> with your PagerDuty service key
                        </li>
                        <li>Adjust the channel names and notification settings as needed</li>
                      </ul>
                    </AlertDescription>
                  </Alert>

                  <p className="text-muted-foreground mt-4">
                    After applying the configuration, restart the Alertmanager pod:
                  </p>
                </section>

                {/* Dashboards */}
                <section id="dashboards" className="mt-12">
                  <h2 className="text-2xl font-bold mb-4">Creating Custom Dashboards</h2>
                  <p className="text-muted-foreground mb-4">
                    While importing existing dashboards is useful, creating custom dashboards tailored to your specific
                    needs is even better. Let's create a custom dashboard for our monitoring stack.
                  </p>

                  <h3 className="text-xl font-bold mb-4">Dashboard Structure</h3>
                  <p className="text-muted-foreground mb-4">A good dashboard should include:</p>
                  <ul className="list-disc pl-6 text-muted-foreground mb-6">
                    <li>Overview panels with key metrics</li>
                    <li>Resource usage graphs (CPU, memory, disk, network)</li>
                    <li>Application-specific metrics</li>
                    <li>Error rates and latency metrics</li>
                    <li>Log panels for relevant log queries</li>
                  </ul>

                  <Diagram
                    title="Dashboard Organization"
                    type="flowchart"
                    definition={`
                      flowchart TD;
                        A["Monitoring Dashboards"] -->|Organized by| B["Infrastructure Dashboards"]
                        A -->|Organized by| C["Application Dashboards"]
                        A -->|Organized by| D["Business Dashboards"]
                        
                        B -->|Contains| E["Cluster Overview"]
                        B -->|Contains| F["Node Metrics"]
                        B -->|Contains| G["Network Metrics"]
                        
                        C -->|Contains| H["Service Health"]
                        C -->|Contains| I["Error Rates"]
                        C -->|Contains| J["Latency Metrics"]
                        
                        D -->|Contains| K["User Activity"]
                        D -->|Contains| L["Business KPIs"]
                    `}
                  />

                  <h3 className="text-xl font-bold mb-4 mt-8">Example Dashboard JSON</h3>
                  <p className="text-muted-foreground mb-4">
                    Here's a simplified example of a Grafana dashboard JSON that you can import:
                  </p>

                  <p className="text-muted-foreground mt-4">
                    You can then import this JSON into Grafana to create a new dashboard. Remember to adjust the queries
                    and panels to match your specific monitoring needs. More complex dashboards can be built by adding
                    more panels and configuring their settings.
                  </p>
                </section>

                {/* Conclusion */}
                <section id="conclusion" className="mt-12">
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="text-muted-foreground mb-4">
                    In this guide, we've successfully built a comprehensive Kubernetes monitoring stack using
                    Prometheus, Grafana, and Loki. This stack provides a robust solution for collecting, visualizing,
                    and alerting on metrics and logs from your Kubernetes cluster. Remember to adapt the configurations
                    and dashboards to your specific application requirements and scale appropriately for production
                    environments.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

