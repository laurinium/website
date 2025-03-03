"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Command {
  command: string
  output: string | string[]
}

interface TerminalProps {
  initialCommands?: Command[]
  prompt?: string
  className?: string
  welcomeMessage?: string | string[]
}

const COMMANDS = {
  help: [
    "Available commands:",
    "help - Show this help message",
    "clear - Clear terminal",
    "whoami - Display user info",
    "ls - List directory contents",
    "cat [file] - Display file contents",
    "uptime - Show uptime",
    "projects - List projects",
    "skills - List skills",
    "homelab - Show homelab status",
    "keyboards - List mechanical keyboards",
  ],
  whoami: ["jens.laur - Tech Lead DevOps Engineer"],
  ls: ["projects/", "keyboards/", "homelab/", "automation/", "README.md", "interests.txt", "skills.yaml"],
  projects: [
    "Current projects:",
    "- K3s Homelab Cluster (Active)",
    "- Custom ErgoDox Build (In Progress)",
    "- Home Assistant Automation (Ongoing)",
    "- Enterprise CI/CD Pipeline (Lead)",
    "- Infrastructure as Code Templates (Maintaining)",
  ],
  skills: [
    "Technical Skills:",
    "├── DevOps",
    "│   ├── Kubernetes/K3s",
    "│   ├── Terraform/Ansible",
    "│   └── CI/CD (Jenkins, GitHub Actions)",
    "├── Cloud Platforms",
    "│   ├── AWS",
    "│   └── Azure",
    "├── Homelab",
    "│   ├── Proxmox",
    "│   ├── Docker",
    "│   └── Network Management",
    "└── Hardware",
    "    ├── Mechanical Keyboards",
    "    └── Home Automation",
  ],
  homelab: [
    "Homelab Status:",
    "----------------------------------------",
    "Service         Status   Uptime    CPU",
    "----------------------------------------",
    "k3s-master     UP       15d       2%",
    "k3s-worker1    UP       15d       5%",
    "k3s-worker2    UP       15d       3%",
    "homeassistant  UP       7d        8%",
    "pihole         UP       30d       1%",
    "proxmox        UP       45d       15%",
    "----------------------------------------",
  ],
  keyboards: [
    "Mechanical Keyboard Collection:",
    "1. Custom ErgoDox",
    "   └── Zealios V2 67g switches",
    "   └── QMK firmware with custom layout",
    "2. Planck",
    "   └── Kailh Box Navy switches",
    "   └── Ortholinear 40% layout",
    "3. Custom 40%",
    "   └── Holy Pandas",
    "   └── Handwired build",
  ],
  cat: {
    "README.md": [
      "# Jens Laur",
      "Tech Lead DevOps Engineer passionate about automation,",
      "mechanical keyboards, and homelabbing.",
      "",
      "## Contact",
      "- Email: [contact info]",
      "- GitHub: [github profile]",
    ],
    "interests.txt": [
      "- DevOps Leadership & Architecture",
      "- Custom Mechanical Keyboards",
      "- Home Automation",
      "- HomeLab Engineering",
      "- Infrastructure as Code",
    ],
    "skills.yaml": [
      "technical_skills:",
      "  devops:",
      "    - Kubernetes/K3s",
      "    - Terraform",
      "    - CI/CD",
      "  keyboards:",
      "    - Custom Builds",
      "    - QMK Firmware",
      "    - Switch Modding",
    ],
  },
}

export function Terminal({
  initialCommands = [],
  prompt = "#",
  className,
  welcomeMessage = ["Welcome to jens.laur's terminal", 'Type "help" for available commands'],
}: TerminalProps) {
  const [history, setHistory] = useState<Command[]>(initialCommands)
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [terminalRef])

  useEffect(() => {
    if (welcomeMessage) {
      setHistory([{ command: "", output: welcomeMessage }])
    }
  }, [welcomeMessage])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim()
    const [command, ...args] = trimmedCmd.split(" ")
    let output: string | string[]

    switch (command.toLowerCase()) {
      case "clear":
        setHistory([])
        return
      case "help":
        output = COMMANDS.help
        break
      case "whoami":
        output = COMMANDS.whoami
        break
      case "ls":
        output = COMMANDS.ls
        break
      case "projects":
        output = COMMANDS.projects
        break
      case "skills":
        output = COMMANDS.skills
        break
      case "homelab":
        output = COMMANDS.homelab
        break
      case "keyboards":
        output = COMMANDS.keyboards
        break
      case "cat":
        const filename = args[0]
        if (!filename) {
          output = ["Usage: cat [filename]"]
        } else if (filename in COMMANDS.cat) {
          output = COMMANDS.cat[filename as keyof typeof COMMANDS.cat]
        } else {
          output = [`cat: ${filename}: No such file or directory`]
        }
        break
      case "":
        output = []
        break
      default:
        output = [`Command not found: ${command}`]
    }

    setHistory((prev) => [...prev, { command: trimmedCmd, output }])
    setCommandHistory((prev) => [...prev, trimmedCmd])
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div
      className={cn(
        "terminal-window w-full",
        "border border-primary/30 rounded-md overflow-hidden shadow-lg",
        className,
      )}
      onClick={focusInput}
    >
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500"></div>
        <div className="terminal-dot bg-yellow-500"></div>
        <div className="terminal-dot bg-green-500"></div>
        <span className="ml-2">cat ~/mainf.tf - jens@homelab</span>
      </div>
      <div ref={terminalRef} className="terminal-content h-[600px] overflow-auto p-4 font-mono text-xs leading-relaxed">
        {history.map((entry, i) => (
          <div key={i}>
            {entry.command && (
              <div>
                <span className="text-primary">{prompt}</span> <span className="text-foreground">{entry.command}</span>
              </div>
            )}
            {Array.isArray(entry.output) ? (
              entry.output.map((line, j) => (
                <pre key={j} className="text-foreground">
                  {line}
                </pre>
              ))
            ) : (
              <div className="text-foreground">{entry.output}</div>
            )}
          </div>
        ))}
        <div className="flex">
          <span className="text-primary mr-2">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            className="flex-1 bg-transparent outline-none text-foreground"
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}

