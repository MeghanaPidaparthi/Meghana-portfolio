"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Calendar, MapPin, Users, Code, Palette } from "lucide-react"

type WorkExperience = {
  title: string
  company: string
  location: string
  duration: string
  responsibilities: string[]
  type: "design" | "development" | "ai"
  current: boolean
}

const workData: WorkExperience[] = [
  {
    title: "UI/UX Design Intern",
    company: "Ozibook",
    location: "Bengaluru, India",
    duration: "June 2025 – Present",
    responsibilities: [
      "Collaborating with cross-functional teams (content writers & web developers) to design user-centric websites using tools like Figma and Wix.",
      "Currently contributing to projects under the mentorship of senior designers, with a focus on accessibility, branding, and design systems.",
    ],
    type: "design",
    current: true,
  },
  {
    title: "AI Developer Intern",
    company: "Viswam AI",
    location: "Hyderabad, India",
    duration: "June 2025 – Present",
    responsibilities: [
      "Selected for a prestigious national internship program focused on building India's first Telugu Large Language Model (LLM).",
      "Participating in hands-on training in Natural Language Processing (NLP) and foundational AI development.",
      "Working alongside experts to contribute to real-world AI models designed to preserve regional languages and culture.",
    ],
    type: "ai",
    current: true,
  },
]

export default function WorkExperience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "design":
        return <Palette className="w-6 h-6" />
      case "development":
        return <Code className="w-6 h-6" />
      case "ai":
        return <Briefcase className="w-6 h-6" />
      default:
        return <Briefcase className="w-6 h-6" />
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "design":
        return "bg-pink-500/10 text-pink-600 dark:text-pink-400"
      case "development":
        return "bg-green-500/10 text-green-600 dark:text-green-400"
      case "ai":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400"
      default:
        return "bg-primary/10 text-primary"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "design":
        return "Design"
      case "development":
        return "Development"
      case "ai":
        return "AI/ML"
      default:
        return "Tech"
    }
  }

  return (
    <section id="work-experience" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Professional Journey</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Work Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hands-on experience in design and AI development through internships that have shaped my professional skills
            and industry knowledge.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

            {workData.map((work, index) => (
              <motion.div
                key={`${work.company}-${work.title}`}
                variants={itemVariants}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block"></div>

                <div className="md:ml-20 bg-button/5 border border-border/20 rounded-xl p-6 hover:border-primary/20 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${getIconColor(work.type)} mt-1`}>{getIcon(work.type)}</div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold font-heading">{work.title}</h3>
                          {work.current && (
                            <div className="px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
                              Current
                            </div>
                          )}
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getIconColor(work.type)}`}>
                            {getTypeLabel(work.type)}
                          </div>
                        </div>
                        <p className="text-lg text-primary font-medium mb-2">{work.company}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {work.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {work.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {work.responsibilities.map((responsibility, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <p className="leading-relaxed">{responsibility}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional highlight */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Gaining real-world experience in design and AI development</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
