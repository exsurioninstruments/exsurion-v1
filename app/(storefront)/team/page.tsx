"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

type Props = {}

const teamMembers = [
  {
    id: 1,
    name: "M. Yaqoob",
    role: "Chief Executive Officer (CEO)",
    expertise: ["Business Leadership", "Strategy", "Operations Management"],
    description:
      "Since being the founder of Exsurion, M. Yaqoob has been the driving force behind strategy, direction, and sheer determination towards innovation. His leadership credo is straightforward — engage people, create quality, and gain trust. Under his vision, Exsurion expands as a global brand in dental expertise.Expertise: Business Leadership | Strategy | Operations Management",
    image: "/team-member-ceo-professional-portrait.jpg",
  },
  {
    id: 2,
    name: "Dr. Faizan Whla",
    role: "Clinical Advisor",
    expertise: ["Oral Surgery", "Restorative Dentistry", "Product Evaluation"],
    description:
      "A dental professional dedicated to excellence, Dr. Faizan ensures that all products of Exsurion are of the highest clinical standards. His extensive knowledge of oral surgery and restorative treatments informs our innovations towards real-world precision and dependability",
    image: "/team-member-clinical-advisor-portrait.jpg",
  },
  {
    id: 3,
    name: "M. Shahzaib Yaqoob",
    role: "Technical Head / AI-ML Engineer",
    expertise: ["Artificial Intelligence", "Machine Learning", "Digital Systems"],
    description:
      "An ardent entrepreneur, Shahzaib Yaqoob oversees Exsurion's digital and technological side. He is dedicated to smart automation and data-driven solutions that ensure efficiency, accuracy, and global capabilities.",
    image: "/team-member-technical-head-portrait.jpg",
  },
  {
    id: 4,
    name: "Burhan Zulfiqar",
    role: "Team Leader",
    expertise: ["Team Management", "Project Coordination", "Operational Leadership"],
    description:
      "A performance-driven individual, Burhan Zulfiqar ensures the smooth flow of team coordination department-wise. His leadership promotes collaboration, efficiency, and excellence in each project.",
    image: "/team-member-team-leader-portrait.jpg",
  },
  {
    id: 5,
    name: "Areeba Choudhary",
    role: "Graphic Designer",
    expertise: ["Graphic Design", "Brand Identity", "Product Visualization"],
    description:
      "A mind that thinks creatively and sees things with precision, Areeba Choudhary brings ideas to life through visuals that reflect the identity of Exsurion. Her creations reflect elegance, clarity, and trust — values that form the foundation of our brand.",
    image: "/team-member-designer-portrait.png",
  },
  {
    id: 6,
    name: "Aleeza Tariq",
    role: "Client Support Specialist",
    expertise: ["Client Relations", "Order Fulfillment", "Global Logistics"],
    description:
      "A mind that thinks creatively and sees things with precision, Areeba Choudhary brings ideas to life through visuals that reflect the identity of Exsurion. Her creations reflect elegance, clarity, and trust — values that form the foundation of our brand.",
    image: "/team-member-support-specialist-portrait.jpg",
  },
]

const TeamsPage = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + teamMembers.length) % teamMembers.length)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our People — The Power Behind Exsurion
          </motion.h1>
          <motion.p
            className="text-xl text-foreground/70 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our greatest strength at Exsurion is our people. Collectively, our engineers, designers, strategists, and 
            medical experts craft innovative dental solutions that redefine precision and instill confidence
          </motion.p>
          <motion.p
            className="text-lg text-foreground/60 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our greatest strength at Exsurion is our people. Collectively, our engineers, designers, strategists, 
            and medical experts craft innovative dental solutions that redefine precision and instill confidence
          </motion.p>
        </div>
      </section>

      {/* Infinite Carousel Section */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Meet Our Leadership</h2>
            <div className="w-20 h-1 bg-accent rounded-full mx-auto mb-4" />
            <p className="text-lg text-foreground/60">
              Driven by precision and passion, our team continues to innovate and refine.
            </p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative h-[600px] md:h-[500px] flex items-center justify-center overflow-hidden rounded-2xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
                className="absolute w-full h-full"
              >
                <div className="grid md:grid-cols-2 gap-8 h-full items-center px-4 md:px-8">
                  {/* Image Side */}
                  <motion.div
                    className="relative h-full rounded-2xl overflow-hidden border-2 border-accent/30 shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={teamMembers[currentIndex].image || "/background.png"}
                      alt={teamMembers[currentIndex].name}
                      className="w-full h-full object-cover"
                      width={1000}
                      height={1000}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </motion.div>

                  {/* Content Side */}
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div>
                      <motion.h3
                        className="text-4xl font-bold text-foreground mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {teamMembers[currentIndex].name}
                      </motion.h3>
                      <motion.p
                        className="text-xl font-semibold mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {teamMembers[currentIndex].role}
                      </motion.p>
                    </div>

                    <motion.p
                      className="text-lg text-foreground/70 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {teamMembers[currentIndex].description}
                    </motion.p>

                    <motion.div
                      className="flex flex-wrap gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {teamMembers[currentIndex].expertise.map((skill, idx) => (
                        <motion.span
                          key={skill}
                          className="px-4 py-2 bg-white/10  rounded-full text-sm font-medium border border-accent/30"
                          whileHover={{ scale: 1.05, backgroundColor: "var(--accent)" }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.button
              onClick={() => paginate(-1)}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-accent/20 hover:bg-accent/40 text-foreground transition-all border border-accent/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              onClick={() => paginate(1)}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-accent/20 hover:bg-accent/40 text-foreground transition-all border border-accent/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {teamMembers.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1)
                    setCurrentIndex(idx)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-white w-8" : "bg-white/40 w-2"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid View Section */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Full Team Overview</h2>
            <div className="w-20 h-1 bg-accent rounded-full mx-auto" />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, idx) => (
              <motion.div key={member.id} variants={itemVariants} className="group relative" whileHover={{ y: -8 }}>
                {/* Card Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />

                {/* Card */}
                <div className="relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-accent/50 transition-all h-full flex flex-col">
                  {/* Image Container with Overlay */}
                  <div className="relative h-83 overflow-hidden bg-gradient-to-br from-accent/10 to-primary/10">
                    <Image
                      src={member.image || "/background.png"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      width={1000}
                      height={1000}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-white">
                        <p className="text-sm font-medium text-accent mb-2">Click to view details</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <motion.h3
                      className="text-2xl font-semibold text-foreground mb-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      {member.name}
                    </motion.h3>
                    <motion.p
                      className="text-sm font-medium mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      viewport={{ once: true }}
                    >
                      {member.role}
                    </motion.p>
                    <motion.p
                      className="text-foreground/70 leading-relaxed mb-6 flex-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {member.description}
                    </motion.p>

                    {/* Expertise Tags */}
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      viewport={{ once: true }}
                    >
                      {member.expertise.map((skill) => (
                        <motion.span
                          key={skill}
                          className="text-xs px-3 py-1 bg-white/10 rounded-full border border-accent/20 hover:border-accent/50 transition-all"
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "var(--accent)",
                            color: "var(--accent-foreground)",
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Closing Section */}
      <section
        className="py-20 md:py-28 px-4 md:px-8 bg-primary/5 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/join-us.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Together, We Shape the Future
          </motion.h2>
          <motion.p
            className="text-xl text-foreground/70 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            
            Inspired by accuracy and devotion, the Exsurion team innovates and improves continually
              designing instruments that define new standards in quality, performance, and trust
          </motion.p>
        </div>
      </section>
    </main>
  )
}

export default TeamsPage
