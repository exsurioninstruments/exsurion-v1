"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
    image: "/team-member-designer-portrait.jpg",
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

// --- TYPEWRITER HOOK ---
const useTypewriter = (text: string, speed = 30) => {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    setDisplayedText("")

    if (text) {
      let i = 0
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i))
          i++
        } else {
          clearInterval(intervalId)
        }
      }, speed)

      return () => clearInterval(intervalId)
    }
  }, [text, speed])

  return displayedText
}

// --- VARIANT DEFINITIONS ----
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// --- TEAM MEMBER CARD COMPONENT ---
type TeamMemberCardProps = {
  member: (typeof teamMembers)[0]
  isRevealed: boolean
  onToggle: () => void
}

const TeamMemberCard = ({ member, isRevealed, onToggle }: TeamMemberCardProps) => {
  const typedDescription = useTypewriter(
    isRevealed ? member.description : "",
    30
  )

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
  }

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      variants={itemVariants}
      className="group relative"
      whileHover={{ y: -8 }}
      onClick={onToggle}
      style={{
        gridRow: isRevealed ? 'span 2' : 'span 1'
      }}
    >
      {/* Card Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />

      {/* Card */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all h-full flex flex-col cursor-pointer">
        {/* Image Container with Overlay */}
        <div className="relative h-80 overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <img
            src={member.image || "https://via.placeholder.com/400x400?text=Team+Member"}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Overlay - only show when NOT revealed */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={overlayVariants}
              >
                <motion.p
                  className="text-sm font-bold text-white mb-2"
                  variants={textVariants}
                >
                  Click to view details
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <motion.h3
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            {member.name}
          </motion.h3>
          <motion.p
            className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
          >
            {member.role}
          </motion.p>

          {/* Click-to-Reveal Content */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col"
              >
                <motion.p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 flex-1">
                  {typedDescription}
                  <span className="animate-pulse">|</span>
                </motion.p>

                {/* Expertise Tags */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  {member.expertise.map((skill) => (
                    <motion.span
                      key={skill}
                      className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-500/20 hover:border-blue-500 transition-all text-blue-700 dark:text-blue-300"
                      whileHover={{
                        scale: 1.05,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// --- MAIN TEAMS PAGE COMPONENT ---
const TeamsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set())

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
    setCurrentIndex(
      (prev) => (prev + newDirection + teamMembers.length) % teamMembers.length
    )
  }

  const toggleCardReveal = (memberId: number) => {
    setRevealedCards((prev) => {
      const newSet = new Set<number>()
      // If clicking the same card, close it. Otherwise, open only the clicked card
      if (!prev.has(memberId)) {
        newSet.add(memberId)
      }
      return newSet
    })
  }

  return (
    <main className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-950 relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our People The Power Behind Exsurion
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our greatest strength at Exsurion is our people. Collectively, our
            engineers, designers, strategists, and medical experts craft
            innovative dental solutions that redefine precision and instill
            confidence
          </motion.p>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our greatest strength at Exsurion is our people. Collectively, our
            engineers, designers, strategists, and medical experts craft
            innovative dental solutions that redefine precision and instill
            confidence
          </motion.p>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Leadership
            </h2>
            <div className="w-20 h-1 bg-blue-500 rounded-full mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Driven by precision and passion, our team continues to innovate
              and refine.
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
                    className="relative h-full rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={teamMembers[currentIndex].image || "https://via.placeholder.com/600x600?text=Team+Member"}
                      alt={teamMembers[currentIndex].name}
                      className="w-full h-full object-cover"
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
                        className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {teamMembers[currentIndex].name}
                      </motion.h3>
                      <motion.p
                        className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {teamMembers[currentIndex].role}
                      </motion.p>
                    </div>

                    <motion.p
                      className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
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
                      {teamMembers[currentIndex].expertise.map((skill) => (
                        <motion.span
                          key={skill}
                          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300"
                          whileHover={{
                            scale: 1.05,
                          }}
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
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-gray-900 dark:text-white transition-all border border-blue-500/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              onClick={() => paginate(1)}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-gray-900 dark:text-white transition-all border border-blue-500/30"
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
      <section className="py-20 md:py-28 px-4 md:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Full Team Overview
            </h2>
            <div className="w-20 h-1 bg-blue-500 rounded-full mx-auto" />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              gridAutoRows: 'auto'
            }}
          >
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                isRevealed={revealedCards.has(member.id)}
                onToggle={() => toggleCardReveal(member.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Closing Section */}
      <section
        className="py-20 md:py-28 px-4 md:px-8 bg-blue-950/90 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/join-us.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Together, We Shape the Future
          </motion.h2>
          <motion.p
            className="text-xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Inspired by accuracy and devotion, the Exsurion team innovates and
            improves continually designing instruments that define new
            standards in quality, performance, and trust
          </motion.p>
        </div>
      </section>
    </main>
  )
}

export default TeamsPage