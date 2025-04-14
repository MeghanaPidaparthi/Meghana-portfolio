"use client"

import { useRef } from "react"
import { useScroll, useTransform } from "framer-motion"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import CommandPalette from "@/components/command-palette"
import Globe from "@/components/globe"
import { useCommandPalette } from "@/hooks/use-command-palette"

export default function Home() {
  const { isOpen, setIsOpen, activeSection, setActiveSection } = useCommandPalette()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0])

  return (
    <div className="relative bg-background text-foreground min-h-screen" ref={containerRef}>
      <Globe />
      <Header setIsOpen={setIsOpen} />

      {isOpen && (
        <CommandPalette
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}

      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}
