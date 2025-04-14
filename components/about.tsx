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
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <span className="text-primary font-medium mb-2 block">About Me</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Crafting Digital Experiences with Passion
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a sophomore student pursuing B.Tech in Computer Science with AI/ML Specialization. My journey began
                with a fascination for the intersection of design and technology, which has evolved into a passion for
                creating intuitive, engaging digital products.
              </p>
              <p>
                My approach combines technical precision with creative vision, allowing me to transform complex ideas
                into elegant solutions. I believe in the power of thoughtful design and clean code to create meaningful
                user experiences.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new design trends, experimenting with digital art, or
                hiking in nature to find fresh inspiration.
              </p>
              <p>
                I'm actively involved in tech communities, being a member of Google Developer Groups and CSI (Computer
                Society of India), which helps me stay connected with the latest industry trends and network with
                like-minded individuals.
              </p>
            </div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              {["Problem Solver", "Creative Thinker", "Detail Oriented", "AI Enthusiast"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 md:order-2 relative">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60"></div>
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="Profile"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-primary z-20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "backOut" }}
            >
              <span className="text-background font-bold text-lg">Student</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
