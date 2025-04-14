"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = () => setIsOpen(false)
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  if (!mounted) {
    return null
  }

  const getIcon = () => {
    if (theme === "light") return <Sun className="h-4 w-4" />
    if (theme === "dark") return <Moon className="h-4 w-4" />
    return <Monitor className="h-4 w-4" />
  }

  const getName = () => {
    if (theme === "light") return "Light"
    if (theme === "dark") return "Dark"
    return "System"
  }

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const handleThemeChange = (newTheme: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setTheme(newTheme)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggleClick}
        className="flex items-center gap-1 p-2 rounded-md bg-button/20 text-foreground hover:bg-button/40 transition-colors"
        aria-label="Toggle theme"
      >
        {getIcon()}
        <span className="text-sm hidden sm:inline">{getName()}</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-36 rounded-md bg-card border border-border shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1">
              <button
                onClick={(e) => handleThemeChange("light", e)}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-primary/10 transition-colors"
              >
                <Sun className="h-4 w-4" />
                Light
              </button>
              <button
                onClick={(e) => handleThemeChange("dark", e)}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-primary/10 transition-colors"
              >
                <Moon className="h-4 w-4" />
                Dark
              </button>
              <button
                onClick={(e) => handleThemeChange("system", e)}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-primary/10 transition-colors"
              >
                <Monitor className="h-4 w-4" />
                System
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
