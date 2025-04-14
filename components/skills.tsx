"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Palette, Globe, Layers, Cpu, Users } from "lucide-react"

type SkillCategory = {
  title: string
  icon: React.ReactNode
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    icon: <Code className="w-6 h-6" />,
    skills: ["Python", "JavaScript", "TypeScript", "Java", "C++", "HTML/CSS"],
  },
  {
    title: "AI/ML",
    icon: <Cpu className="w-6 h-6" />,
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Computer Vision", "NLP", "Data Analysis"],
  },
  {
    title: "Web Development",
    icon: <Globe className="w-6 h-6" />,
    skills: ["React", "Next.js", "Node.js", "Tailwind CSS", "REST APIs", "Responsive Design"],
  },
  {
    title: "Design",
    icon: <Palette className="w-6 h-6" />,
    skills: ["Figma", "UI/UX", "Wireframing", "Prototyping", "Color Theory"],
  },
  {
    title: "Tools",
    icon: <Layers className="w-6 h-6" />,
    skills: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Google Colab"],
  },
  {
    title: "Soft Skills",
    icon: <Users className="w-6 h-6" />,
    skills: ["Problem Solving", "Team Collaboration", "Time Management", "Communication", "Adaptability"],
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
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">My Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Skills & Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive collection of technologies and skills I've mastered throughout my journey.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="bg-button/5 border border-border/20 rounded-xl p-6 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">{category.icon}</div>
                <h3 className="text-xl font-bold font-heading">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                    className="px-3 py-1 text-sm rounded-full bg-button text-muted-foreground hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
