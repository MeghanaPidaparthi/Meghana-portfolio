"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Github, Linkedin, Mail, Globe, AlertCircle, CheckCircle2 } from "lucide-react"
import { sendEmail } from "@/actions/send-email"

type FormState = {
  name: string
  email: string
  message: string
}

type FormErrors = {
  name?: string[]
  email?: string[]
  message?: string[]
}

// Medium logo SVG component
const MediumIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
)

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
    errors?: FormErrors
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })

    // Clear errors when user starts typing again
    if (formStatus.errors && formStatus.errors[e.target.name as keyof FormErrors]) {
      setFormStatus({
        ...formStatus,
        errors: {
          ...formStatus.errors,
          [e.target.name]: undefined,
        },
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})

    try {
      const result = await sendEmail(formState)

      if (result.success) {
        setFormStatus({
          success: true,
          message: result.message,
        })
        setFormState({ name: "", email: "", message: "" })
      } else {
        setFormStatus({
          success: false,
          message: result.message,
          errors: result.errors,
        })
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/MeghanaPidaparthi", label: "GitHub" },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/meghana-pidaparthi/",
      label: "LinkedIn",
    },
    { icon: <MediumIcon className="w-5 h-5" />, href: "https://medium.com/@pidaparthimeghana", label: "Medium" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:pidaparthimeghana@gmail.com", label: "Email" },
  ]

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Get In Touch</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear from you. Let's create something
            exceptional together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-button/5 border border-border/20 rounded-xl p-6 sm:p-8"
          >
            <motion.h3 variants={itemVariants} className="text-xl sm:text-2xl font-bold font-heading mb-6">
              Send Me a Message
            </motion.h3>

            <form onSubmit={handleSubmit}>
              <motion.div variants={itemVariants} className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg form-input transition-colors ${
                    formStatus.errors?.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "focus:border-primary focus:ring-primary"
                  } focus:outline-none focus:ring-1`}
                  placeholder="Your name"
                />
                {formStatus.errors?.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {formStatus.errors.name[0]}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg form-input transition-colors ${
                    formStatus.errors?.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "focus:border-primary focus:ring-primary"
                  } focus:outline-none focus:ring-1`}
                  placeholder="Your email"
                />
                {formStatus.errors?.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {formStatus.errors.email[0]}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg form-input transition-colors resize-none ${
                    formStatus.errors?.message
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "focus:border-primary focus:ring-primary"
                  } focus:outline-none focus:ring-1`}
                  placeholder="Your message"
                ></textarea>
                {formStatus.errors?.message && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {formStatus.errors.message[0]}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>

                {formStatus.message && (
                  <div
                    className={`mt-4 p-3 rounded-lg flex items-start gap-2 ${
                      formStatus.success ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {formStatus.success ? (
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    )}
                    <p>{formStatus.message}</p>
                  </div>
                )}
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col justify-between"
          >
            <div>
              <motion.h3 variants={itemVariants} className="text-xl sm:text-2xl font-bold font-heading mb-6">
                Let's Connect
              </motion.h3>

              <motion.p variants={itemVariants} className="text-muted-foreground mb-8">
                Whether you have a question, a project idea, or just want to say hello, I'm always open to new
                opportunities and collaborations.
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a
                      href="mailto:pidaparthimeghana@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      pidaparthimeghana@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-muted-foreground">Hyderabad, India</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <h4 className="font-medium mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="p-3 rounded-full custom-button hover:scale-110 transition-all duration-300"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
