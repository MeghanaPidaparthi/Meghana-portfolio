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
    id: 1,
    title: "AI Study Assistant",
    description:
      "An AI-powered study assistant that helps students organize notes, create flashcards, and prepare for exams.",
    longDescription:
      "This AI-powered study assistant leverages natural language processing to help students organize their study materials effectively. The application can automatically generate flashcards from notes, create practice quizzes based on study material, and provide personalized study schedules. Built with React for the frontend and Python with TensorFlow for the NLP backend, this project demonstrates my interest in applying AI to solve real educational challenges.",
    tags: ["React", "Python", "NLP", "TensorFlow"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://ai-study-assistant-demo.vercel.app",
    github: "https://github.com/MeghanaPidaparthi/ai-study-assistant",
  },
  {
    id: 2,
    title: "Student Portfolio",
    description:
      "A responsive portfolio website showcasing academic projects and achievements with modern design principles.",
    longDescription:
      "This portfolio website was designed to showcase student projects and academic achievements in a visually appealing way. The site features smooth animations, responsive design for all device sizes, and an intuitive navigation system. Built with Next.js and TypeScript, the project demonstrates my frontend development skills and attention to design details. The site includes sections for projects, skills, and contact information, making it easy for potential employers or collaborators to learn about the student's capabilities.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://student-portfolio-demo.vercel.app",
    github: "https://github.com/MeghanaPidaparthi/student-portfolio",
  },
  {
    id: 3,
    title: "ML Image Classifier",
    description:
      "A machine learning project that classifies images using convolutional neural networks with a user-friendly interface.",
    longDescription:
      "This machine learning project uses convolutional neural networks to classify images with high accuracy. The model was trained on a diverse dataset to recognize various objects, animals, and scenes. The web interface allows users to upload their own images for classification or use their webcam for real-time object detection. The backend is built with Python and TensorFlow, while the frontend uses React to provide an intuitive user experience. This project demonstrates my skills in machine learning model development and creating user-friendly interfaces for AI applications.",
    tags: ["Python", "TensorFlow", "React", "Flask"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://ml-image-classifier-demo.vercel.app",
    github: "https://github.com/MeghanaPidaparthi/ml-image-classifier",
  },
  {
    id: 4,
    title: "Academic Planner App",
    description:
      "A mobile-first web application for students to track assignments, schedule study sessions, and manage deadlines.",
    longDescription:
      "The Academic Planner App is designed to help students manage their academic responsibilities effectively. It features a clean, intuitive interface for tracking assignments, scheduling study sessions, and managing deadlines. The app includes smart notifications to remind students of upcoming due dates, a progress tracker for long-term projects, and integration with calendar applications. Built with React and Firebase, this application demonstrates my ability to create practical tools that solve real problems for students. The responsive design ensures a seamless experience across all devices.",
    tags: ["React", "Firebase", "Redux", "Material UI"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://academic-planner-demo.vercel.app",
    github: "https://github.com/MeghanaPidaparthi/academic-planner",
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
