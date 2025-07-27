"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react"

type Education = {
  institution: string
  degree: string
  location: string
  duration: string
  gpa?: string
  coursework: string[]
  type: "university" | "college" | "school"
}

const educationData: Education[] = [
  {
    institution: "Malla Reddy University",
    degree: "B.Tech (Computer Science Engineering)",
    location: "Hyderabad, India",
    duration: "2023 - 2027",
    gpa: "8.92 CGPA",
    coursework: ["Web Development", "Mobile Development", "AI/ML","Generative AI","Data Structures and Algorithms"],
    type: "university",
  },
  {
    institution: "Bhavans Sri Aurobindo Junior College",
    degree: "Intermediate Education",
    location: "Hyderabad, India",
    duration: "2021 - 2023",
    gpa:"97.1%",
    coursework: ["Mathematics", "Physics", "Chemistry"],
    type: "college",
  },
  {
    institution: "SR Digi High School",
    degree: "High School (Grade 10)",
    location: "Hyderabad, India",
    duration: "2020 - 2021",
    gpa: "10.0 CGPA",
    coursework: [],
    type: "school",
  },
]

export default function Education() {
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
      case "university":
        return <GraduationCap className="w-6 h-6" />
      case "college":
        return <BookOpen className="w-6 h-6" />
      case "school":
        return <BookOpen className="w-5 h-5" />
      default:
        return <GraduationCap className="w-6 h-6" />
    }
  }

  return (
    <section id="education" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">My Journey</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Education</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and the foundation that shaped my passion for technology and innovation.
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

            {educationData.map((edu, index) => (
              <motion.div key={edu.institution} variants={itemVariants} className="relative mb-12 last:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block"></div>

                <div className="md:ml-20 bg-button/5 border border-border/20 rounded-xl p-6 hover:border-primary/20 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">{getIcon(edu.type)}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold font-heading mb-1">{edu.institution}</h3>
                        <p className="text-lg text-foreground mb-2">{edu.degree}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {edu.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {edu.duration}
                          </div>
                          {edu.gpa && (
                            <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              Result: {edu.gpa}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {edu.coursework.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Relevant Coursework:</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course) => (
                          <span key={course} className="px-3 py-1 text-xs rounded-full bg-button text-muted-foreground">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
