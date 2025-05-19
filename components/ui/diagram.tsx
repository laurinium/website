"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import mermaid from "mermaid"

interface DiagramProps {
  definition: string
  title?: string
  type?: "flowchart" | "sequence" | "class" | "state" | "er" | "gantt" | "pie" | "architecture"
  className?: string
  dark?: boolean
}

export function Diagram({ definition, title, type = "flowchart", className, dark = true }: DiagramProps) {
  const [svg, setSvg] = useState<string>("")
  const [id] = useState(`diagram-${Math.random().toString(36).substring(2, 11)}`)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize mermaid with dark theme if needed
    mermaid.initialize({
      startOnLoad: false,
      theme: dark ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "JetBrains Mono, monospace",
    })

    const renderDiagram = async () => {
      try {
        // Add the diagram type if not already included
        let processedDefinition = definition
        if (!definition.trim().startsWith(type)) {
          processedDefinition = `${type}\n${definition}`
        }

        // Render the diagram
        const { svg } = await mermaid.render(id, processedDefinition)
        setSvg(svg)
      } catch (error) {
        console.error("Failed to render diagram:", error)
        setSvg(
          `<pre class="text-red-500 p-4">Error rendering diagram: ${error instanceof Error ? error.message : String(error)}</pre>`,
        )
      }
    }

    renderDiagram()
  }, [definition, id, dark, type])

  // Adjust SVG size when container size changes
  useEffect(() => {
    if (!containerRef.current || !svg) return

    const observer = new ResizeObserver(() => {
      const container = containerRef.current
      if (!container) return

      // Find the SVG element and adjust its width if needed
      const svgElement = container.querySelector("svg")
      if (svgElement) {
        const containerWidth = container.clientWidth
        if (Number.parseFloat(svgElement.getAttribute("width") || "0") > containerWidth) {
          svgElement.setAttribute("width", `${containerWidth}px`)
          svgElement.setAttribute("style", `max-width: ${containerWidth}px;`)
        }
      }
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [svg])

  return (
    <div className={cn("my-8", className)}>
      <div className="terminal-window w-full">
        {title && (
          <div className="terminal-header">
            <div className="terminal-dot bg-red-500"></div>
            <div className="terminal-dot bg-yellow-500"></div>
            <div className="terminal-dot bg-green-500"></div>
            <span className="ml-2">{title}</span>
          </div>
        )}
        <div
          ref={containerRef}
          className={cn("terminal-content p-4 overflow-auto text-center", !title && "rounded-t-md")}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
      <div className="text-xs text-muted-foreground text-center mt-1">
        {type.charAt(0).toUpperCase() + type.slice(1)} Diagram
      </div>
    </div>
  )
}

