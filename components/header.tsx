"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Command } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

type HeaderProps = {
  setIsOpen: (isOpen: boolean) => void
}

export default function Header({ setIsOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Determine active section for highlighting in navbar
      const sections = ["hero", "about", "projects", "skills", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        const offset = 100

        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { label: "Home", href: "hero" },
    { label: "About", href: "about" },
    { label: "Projects", href: "projects" },
    { label: "Skills", href: "skills" },
    { label: "Contact", href: "contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-xl font-bold font-heading">
            <span className="text-primary">Meghana</span> Pidaparthi
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}

            <ThemeToggle />

            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Command size={14} />
              <span>Cmd + K</span>
            </button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-muted-foreground hover:text-foreground"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="container mx-auto px-4 py-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="text-xl font-bold font-heading">
                  <span className="text-primary">Meghana</span> Pidaparthi
                </Link>

                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-muted-foreground hover:text-foreground"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <nav className="flex flex-col space-y-6 items-center justify-center flex-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className={`text-2xl font-medium transition-colors ${
                        activeSection === item.href ? "text-primary" : "hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-8 flex justify-center">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsOpen(true)
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm"
                >
                  <Command size={16} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
