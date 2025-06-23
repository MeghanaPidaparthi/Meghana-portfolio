"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"

type CommandPaletteProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function CommandPalette({ isOpen, setIsOpen, activeSection, setActiveSection }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }

      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, setIsOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const commands = [
    { id: "hero", name: "Home", shortcut: "H", href: "#hero" },
    { id: "about", name: "About", shortcut: "A", href: "#about" },
    { id: "education", name: "Education", shortcut: "E", href: "#education" },
    { id: "projects", name: "Projects", shortcut: "P", href: "#projects" },
    { id: "skills", name: "Skills", shortcut: "S", href: "#skills" },
    { id: "certifications", name: "Certifications", shortcut: "C", href: "#certifications" },
    { id: "clubs-leadership", name: "Leadership", shortcut: "L", href: "#clubs-leadership" },
    { id: "contact", name: "Contact", shortcut: "M", href: "#contact" },
    { id: "resume", name: "Resume", shortcut: "R", href: "/resume.pdf" },
  ]

  const filteredCommands = commands.filter((command) => command.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSelect = (command: (typeof commands)[0]) => {
    setActiveSection(command.id)
    setIsOpen(false)

    if (command.id === "resume") {
      window.open(command.href, "_blank")
    } else {
      document.querySelector(command.href)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center pt-[20vh]"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-card border border-border rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center border-b border-border p-3">
              <Search size={18} className="text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search commands..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">Esc</kbd>
                <span>to close</span>
              </div>
            </div>

            <div className="py-2 max-h-[300px] overflow-y-auto">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command) => (
                  <button
                    key={command.id}
                    className={`w-full px-3 py-2 flex items-center justify-between hover:bg-primary/10 transition-colors ${
                      activeSection === command.id ? "bg-primary/10 text-primary" : ""
                    }`}
                    onClick={() => handleSelect(command)}
                  >
                    <span>{command.name}</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-xs">
                      {command.shortcut}
                    </kbd>
                  </button>
                ))
              ) : (
                <div className="px-3 py-8 text-center text-muted-foreground">No commands found</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
