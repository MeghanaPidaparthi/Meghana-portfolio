"use client"

import { useState, useEffect } from "react"

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "education",
        "work-experience",
        "projects",
        "skills",
        "certifications",
        "clubs-leadership",
        "contact",
      ]

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

  return { isOpen, setIsOpen, activeSection, setActiveSection }
}
