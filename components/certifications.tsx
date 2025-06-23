"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, ExternalLink } from "lucide-react"

type Certification = {
  title: string
  issuer: string
  date: string
  link: string
}

const certifications: Certification[] = [
  {
    title: "Foundations of UX Design",
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
    title: "Korean II(TOPIK I equivalent)",
    issuer: "NPTEL",
    date: "2025",
    link: "https://drive.google.com/file/d/1V3LjatVqAlK-AKb8fNu9fzgihnndmH63/view?usp=sharing",
  },
]

export default function Certifications() {
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
    <section id="certifications" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">My Achievements</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and courses I've completed to expand my knowledge and skills.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={itemVariants}
              className="bg-button/5 border border-border/20 rounded-xl p-6 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold font-heading mb-2">{cert.title}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-muted-foreground">{cert.issuer}</p>
                    <p className="text-sm text-muted-foreground">{cert.date}</p>
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
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
