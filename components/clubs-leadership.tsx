"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Trophy, Target, Award } from "lucide-react"

type ClubActivity = {
  title: string
  organization: string
  description: string
  achievements?: string[]
  type: "leadership" | "membership"
}

const clubsData: ClubActivity[] = [
  {
    title: "Marketing Lead",
    organization: "Microsoft Learn Student Chapter (MLSC), Malla Reddy University",
    description:
      "Spearheaded marketing and outreach initiatives for student-led tech events, including Her Hustle Hour. Designed digital assets, planned promotions, and fostered engagement across campus communities.",
    achievements: ["Led marketing for Her Hustle Hour", "Designed digital assets", "Campus community engagement"],
    type: "leadership",
  },
  {
    title: "Member",
    organization: "Google Developer Groups (GDG)",
    description:
      "Successfully completed the Gen AI Study Jams, earning a certificate and swags by tackling real-world Generative AI challenges. Engaged with the developer community to expand hands-on AI knowledge.",
    achievements: ["Gen AI Study Jams Certificate", "Real-world AI challenges", "Developer community engagement"],
    type: "membership",
  },
]

export default function ClubsLeadership() {
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
      case "leadership":
        return <Trophy className="w-6 h-6" />
      case "membership":
        return <Users className="w-6 h-6" />
      default:
        return <Users className="w-6 h-6" />
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "leadership":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
      case "membership":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400"
      default:
        return "bg-primary/10 text-primary"
    }
  }

  return (
    <section id="clubs-leadership" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Community Involvement</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Clubs & Leadership</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Active participation in tech communities and leadership roles that have shaped my collaborative and
            organizational skills.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {clubsData.map((club, index) => (
            <motion.div
              key={club.organization}
              variants={itemVariants}
              className="bg-button/5 border border-border/20 rounded-xl p-6 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-2 rounded-lg ${getIconColor(club.type)}`}>{getIcon(club.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold font-heading">{club.title}</h3>
                    {club.type === "leadership" && (
                      <div className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-medium">
                        Leadership
                      </div>
                    )}
                  </div>
                  <p className="text-primary font-medium mb-3">{club.organization}</p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{club.description}</p>

                  {club.achievements && club.achievements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        Key Highlights
                      </h4>
                      <div className="space-y-2">
                        {club.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional stats or call to action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Active in tech communities and leadership development</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
