"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <span className="text-primary font-medium mb-2 block">About Me</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-6">
              Crafting Digital Experiences with Passion
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                A pre-final year CS student with a specialization in AI/ML, passionate about building products that make
                a difference.
              </p>
              <p>
                I work at the intersection of design and development—exploring machine learning, Android, and UX. I've
                earned industry-recognized certifications like Google's UX Design Certificate.
              </p>
              <p>
                Outside tech, I love learning languages (like Korean and Chinese!), connecting with new cultures, and
                staying active in communities like GDG and CSI.
              </p>
              <p>Let's create something meaningful together.</p>
            </div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              {["Problem Solver", "Creative Thinker", "Detail Oriented", "AI Enthusiast"].map((tag) => (
                <span key={tag} className="px-3 py-2 rounded-full border border-border text-sm text-muted-foreground">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 lg:order-2 relative">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60"></div>
              <Image
                src="/profile-image.jpg"
                alt="Profile"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <motion.div
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary z-20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "backOut" }}
            >
              <span className="text-background font-bold text-sm sm:text-lg">Student</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Education Section Integrated */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 sm:mt-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-4">Education</h3>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

              {/* Education Items */}
              <motion.div variants={itemVariants} className="relative mb-8 sm:mb-12">
                <div className="absolute left-4 sm:left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block"></div>
                <div className="md:ml-16 lg:ml-20 bg-button/5 border border-border/20 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold font-heading mb-1">Malla Reddy University</h4>
                      <p className="text-base sm:text-lg text-foreground mb-2">B.Tech (Computer Science Engineering)</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>Hyderabad, India</span>
                        <span>2023 - 2027</span>
                        <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          GPA: 8.92
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Web Development", "Mobile Development", "AI/ML"].map((course) => (
                      <span key={course} className="px-3 py-1 text-xs rounded-full skill-button">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="relative mb-8 sm:mb-12">
                <div className="absolute left-4 sm:left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block"></div>
                <div className="md:ml-16 lg:ml-20 bg-button/5 border border-border/20 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold font-heading mb-1">
                        Bhavans Sri Aurobindo Junior College
                      </h4>
                      <p className="text-base sm:text-lg text-foreground mb-2">Intermediate Education</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>Hyderabad, India</span>
                        <span>2021 - 2023</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Mathematics", "Physics", "Chemistry"].map((course) => (
                      <span key={course} className="px-3 py-1 text-xs rounded-full skill-button">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <div className="absolute left-4 sm:left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block"></div>
                <div className="md:ml-16 lg:ml-20 bg-button/5 border border-border/20 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold font-heading mb-1">SR Digi High School</h4>
                      <p className="text-base sm:text-lg text-foreground mb-2">High School (Grade 10)</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>Hyderabad, India</span>
                        <span>2020 - 2021</span>
                        <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          GPA: 10.0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
