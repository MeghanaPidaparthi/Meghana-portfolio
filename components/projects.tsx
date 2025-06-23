"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, X, ExternalLink, Github } from "lucide-react"

type Project = {
  id: number
  title: string
  description: string
  longDescription: string
  tags: string[]
  image: string
  link: string
  github: string
}

const projects: Project[] = [
  {
    id: 2,
    title: "AI Interview App – Smart Interview Preparation Platform",
    description:
      "A web app that simulates real-time AI-driven interviews using voice agents and provides instant feedback with detailed transcripts.",
    longDescription:
      "This project is designed to help users prepare for interviews using advanced AI tools. It enables users to create mock interviews, converse with AI voice agents powered by Vapi and Google Gemini, and receive performance feedback instantly. Built with Next.js, Firebase Auth, and Tailwind CSS, the app also includes a dashboard to track past interviews, a dynamic interview page, and responsive UI/UX design with reusable components using shadcn/ui and Zod. It’s a personal initiative to enhance interview readiness through conversational AI.",
    tags: ["Next.js", "Firebase", "Tailwind CSS", "Vapi AI", "Gemini", "Zod", "shadcn/ui"],
    image: "/interview.svg",
    link: "https://interviewprep-ai.vercel.app", // update this if you deploy!
    github: "https://github.com/MeghanaPidaparthi/interviewprep",
  },
  {
    id: 2,
    title: "Tech Stack Comparer",
    description:
      "A clean, responsive tool that helps developers compare programming tools and frameworks through interactive charts and intuitive UI design.",
    longDescription:
      "Tech Stack Comparer helps developers evaluate and compare frameworks, libraries, and technologies based on criteria like performance, popularity, and use cases. With a clean UI and sortable charts, it’s built to simplify decision-making for both junior and experienced developers.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    image: "/techstack.svg",
    link: "https://student-portfolio-demo.vercel.app",
    github: "https://github.com/MeghanaPidaparthi/student-portfolio",
  },
  {
    id: 3,
    title: "RightsRevive",
    description:
      "A legal assistant app that simplifies information on fundamental rights and laws, with regional language and accessibility support.",
    longDescription:
      "RightsRevive is built to empower marginalized communities by offering simplified legal information in multiple regional languages. It includes features like speech-to-text input and aims to introduce AI-based document understanding and qualitative legal guidance to enhance accessibility for differently-abled users.",
    tags: ["React", "Spring Boot", "MongoDB"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://rights-revive.vercel.app",
    github: "https://github.com/MeghanaPidaparthi/rights-revive",
  },
  {
    id: 4,
    title: "KalaaBazaar",
    description:
      "A digital marketplace connecting local artisans with buyers to promote Indian handicrafts and culture.",
    longDescription:
      "KalaaBazaar helps local artisans showcase and sell handmade crafts through a user-friendly web app. It highlights India’s cultural heritage while ensuring affordability and accessibility. Features include artisan profiles, category-wise listings, and responsive design.",
    tags: ["React", "Firebase", "Firestore", "Material UI"],
    image: "/placeholder.svg?height=600&width=800",
    link: "",
    github: "https://github.com/MeghanaPidaparthi/KalaaBazaar",
  },
]

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-visible">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">My Work</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work spanning web applications, interactive experiences, and design systems.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative bg-button/5 rounded-xl overflow-hidden border border-border/20 hover:border-primary/20 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 font-heading">{project.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center text-sm font-medium text-primary group-hover:underline"
                >
                  View Details
                  <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-card rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/20 text-foreground hover:bg-background/40 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="relative h-72 sm:h-96">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-70"></div>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 font-heading">{selectedProject.title}</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-muted-foreground mb-6">{selectedProject.longDescription}</p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>

                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-transparent hover:bg-button/80 transition-colors"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
