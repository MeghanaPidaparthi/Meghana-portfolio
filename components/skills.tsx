"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Palette, Globe, Layers, Briefcase, Users, Award, ExternalLink } from "lucide-react"

type SkillCategory = {
  title: string
  icon: React.ReactNode
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
    skills: ["Python", "JavaScript", "TypeScript", "Java"],
  },
  {
    title: "Web Development",
    icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
    skills: ["HTML", "CSS", "React", "Next.js", "Node.js", "Tailwind CSS", "REST APIs", "Responsive Design"],
  },
  {
    title: "Design",
    icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />,
    skills: ["Figma", "UI/UX", "Wireframing", "Canva"],
  },
  {
    title: "Tools",
    icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6" />,
    skills: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Google Colab", "Android Studio"],
  },
  {
    title: "Workspaces",
    icon: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />,
    skills: ["Google Workspace", "Microsoft 365"],
  },
  {
    title: "Soft Skills",
    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    skills: ["Problem Solving", "Team Collaboration", "Time Management", "Communication", "Adaptability"],
  },
]

const certifications = [
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    date: "2024",
    link: "https://coursera.org/share/1ffbbe27b95dd23b6fa314ac1f6294ee",
  },
  {
    title: "First Step Korean",
    issuer: "Yonsei University",
    date: "2025",
    link: "https://coursera.org/share/31e6a6030f3dfcc413552cd5a5021bbc",
  },
  {
    title: "Korean II- NPTEL",
    issuer: "NPTEL",
    date: "2025",
    link: "https://drive.google.com/file/d/1V3LjatVqAlK-AKb8fNu9fzgihnndmH63/view?usp=sharing",
  },
]

export default function Skills() {
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

  return (
    <section id="skills" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-primary font-medium mb-2 block">My Expertise</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4">Skills & Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive collection of technologies and skills I've mastered throughout my journey.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="bg-button/5 border border-border/20 rounded-xl p-4 sm:p-6 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">{category.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold font-heading">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                    className="skill-button px-3 py-1 text-xs sm:text-sm rounded-full"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={itemVariants}>
            <span className="text-primary font-medium mb-2 block">My Achievements</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-4">Certifications</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and courses I've completed to expand my knowledge and skills.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={itemVariants}
              className="bg-button/5 border border-border/20 rounded-xl p-4 sm:p-6 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-bold font-heading mb-2">{cert.title}</h4>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-muted-foreground text-sm sm:text-base">{cert.issuer}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{cert.date}</p>
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline text-sm font-medium"
                  >
                    View Certificate
                    <ExternalLink className="ml-1 w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
