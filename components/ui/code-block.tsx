"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { twilight } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Maximize2, Minimize2, X, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  language: string
  code: string
  fileName?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ language, code, fileName, showLineNumbers = false }: CodeBlockProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const codeBlockRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle ESC key to exit full screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullScreen) {
        setIsFullScreen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullScreen])

  // Prevent scrolling when in full screen
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isFullScreen])

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isFullScreen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsFullScreen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isFullScreen])

  const toggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCollapsed(!isCollapsed)
    if (isFullScreen) setIsFullScreen(false)
  }

  const toggleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFullScreen(!isFullScreen)
    if (isCollapsed) setIsCollapsed(false)
  }

  return (
    <>
      <div className="my-6 relative" ref={codeBlockRef}>
        {fileName && (
          <div className="terminal-header flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="terminal-dot bg-red-500 cursor-pointer hover:opacity-80 relative group"
                onClick={() => {}}
                title="Close"
              >
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={10} className="text-red-900" />
                </span>
              </div>
              <div
                className="terminal-dot bg-yellow-500 cursor-pointer hover:opacity-80 relative group"
                onClick={toggleCollapse}
                title={isCollapsed ? "Expand" : "Collapse"}
              >
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {isCollapsed ? (
                    <ChevronDown size={10} className="text-yellow-900" />
                  ) : (
                    <ChevronUp size={10} className="text-yellow-900" />
                  )}
                </span>
              </div>
              <div
                className="terminal-dot bg-green-500 cursor-pointer hover:opacity-80 relative group"
                onClick={toggleFullScreen}
                title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
              >
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {isFullScreen ? (
                    <Minimize2 size={10} className="text-green-900" />
                  ) : (
                    <Maximize2 size={10} className="text-green-900" />
                  )}
                </span>
              </div>
              <span className="ml-2">{fileName}</span>
            </div>
          </div>
        )}

        <div
          className={cn(
            "relative transition-all duration-300 ease-in-out",
            isCollapsed ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100",
          )}
        >
          <div className="overflow-auto max-h-[500px]">
            <SyntaxHighlighter
              language={language}
              style={twilight}
              showLineNumbers={showLineNumbers}
              customStyle={{
                margin: 0,
                borderRadius: fileName ? "0 0 0.375rem 0.375rem" : "0.375rem",
                background: "black",
              }}
              className="text-sm"
            >
              {code}
            </SyntaxHighlighter>
          </div>

          {!fileName && (
            <button
              onClick={toggleFullScreen}
              className="absolute top-2 right-2 text-gray-400 hover:text-white p-1 bg-black/50 rounded"
              title="Full Screen"
            >
              <Maximize2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            ref={modalRef}
            className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300"
          >
            <div className="terminal-header flex items-center justify-between p-2 border-b border-gray-700">
              <div className="flex items-center">
                <div
                  className="terminal-dot bg-red-500 cursor-pointer hover:opacity-80 relative group"
                  onClick={() => setIsFullScreen(false)}
                  title="Close"
                >
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={10} className="text-red-900" />
                  </span>
                </div>
                <div
                  className="terminal-dot bg-yellow-500 cursor-pointer hover:opacity-80 relative group"
                  onClick={toggleCollapse}
                  title="Collapse"
                >
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronUp size={10} className="text-yellow-900" />
                  </span>
                </div>
                <div
                  className="terminal-dot bg-green-500 cursor-pointer hover:opacity-80 relative group"
                  onClick={toggleFullScreen}
                  title="Exit Full Screen"
                >
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Minimize2 size={10} className="text-green-900" />
                  </span>
                </div>
                <span className="ml-2">{fileName || "Code"}</span>
              </div>
              <button
                onClick={() => setIsFullScreen(false)}
                className="text-gray-400 hover:text-white p-1"
                title="Exit Full Screen"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <SyntaxHighlighter
                language={language}
                style={twilight}
                showLineNumbers={showLineNumbers || true}
                customStyle={{
                  margin: 0,
                  background: "black",
                  height: "100%",
                  borderRadius: 0,
                }}
                className="text-sm h-full"
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

