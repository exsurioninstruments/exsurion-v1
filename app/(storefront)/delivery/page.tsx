"use client"
import { AnimatePresence, motion } from "framer-motion"
import AnimatedCounter from "@/components/animated-counter"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const DeliveryPage = () => {
  const [direction, setDirection] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  }

  const teamMembers = [
    {
      id: 1,
      name: "M. Yaqoob",
      role: "Chief Executive Officer (CEO)",
      expertise: ["Business Leadership", "Strategy", "Operations Management"],
      description:
        "As the visionary behind Exsurion, M. Yaqoob leads with strategy, focus, and an unwavering commitment to innovation. His leadership philosophy is simple — empower people, build quality, and earn trust.",
      image: "/team-member-ceo-professional-portrait.jpg",
    },
    {
      id: 2,
      name: "Dr. Faizan Whla",
      role: "Clinical Advisor",
      expertise: ["Oral Surgery", "Restorative Dentistry", "Product Evaluation"],
      description:
        "A dental expert committed to excellence, Dr. Faizan ensures that every Exsurion product meets the highest clinical standards. His deep understanding guides our innovations toward real-world precision.",
      image: "/team-member-clinical-advisor-portrait.jpg",
    },
    {
      id: 3,
      name: "M. Shahzaib Yaqoob",
      role: "Technical Head / AI-ML Engineer",
      expertise: ["Artificial Intelligence", "Machine Learning", "Digital Systems"],
      description:
        "A passionate innovator, Shahzaib manages Exsurion's digital and technical infrastructure. He focuses on intelligent automation and data-driven solutions that enhance efficiency and accuracy.",
      image: "/team-member-technical-head-portrait.jpg",
    },
    {
      id: 4,
      name: "Burhan Zulfiqar",
      role: "Team Leader",
      expertise: ["Team Management", "Project Coordination", "Operational Leadership"],
      description:
        "A results-oriented professional, Burhan ensures smooth team coordination across departments. His leadership fosters collaboration, efficiency, and excellence throughout every project.",
      image: "/team-member-team-leader-portrait.jpg",
    },
    {
      id: 5,
      name: "Areeba Choudhary",
      role: "Graphic Designer",
      expertise: ["Graphic Design", "Brand Identity", "Product Visualization"],
      description:
        "A creative mind with an eye for precision, Areeba transforms ideas into visuals that define Exsurion's identity. Her work captures elegance, clarity, and trust — values at our core.",
      image: "/team-member-designer-portrait.jpg",
    },
    {
      id: 6,
      name: "Aleeza Tariq",
      role: "Client Support Specialist",
      expertise: ["Client Relations", "Order Fulfillment", "Global Logistics"],
      description:
        "Our dedicated support specialist ensures seamless communication, timely delivery, and exceptional service. She upholds Exsurion's commitment to reliability and customer satisfaction globally.",
      image: "/team-member-support-specialist-portrait.jpg",
    },
  ]

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + teamMembers.length) % teamMembers.length)
  }

  return (
    <main>
      {/* Hero Section */}
      <section
      className="relative py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8 overflow-hidden"
      style={{
        backgroundImage: "url(/professional-shipping-logistics-warehouse-with-pac.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      {/* Animated gradient elements */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-accent/3 rounded-full blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6 text-balance leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Delivering Excellence, Wherever You Are
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 md:mb-12 text-balance max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Fast, reliable, and secure shipping worldwide. We ensure your precision instruments arrive in perfect
            condition.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 border border-white/20 hover:border-white/40 transition-all"
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          >
            <div className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 text-white">
              <AnimatedCounter from={0} to={5} duration={2} />
              <span className="text-xl sm:text-2xl">-</span>
              <AnimatedCounter from={0} to={2} duration={2} />
            </div>
            <p className="text-white/70 text-xs sm:text-sm font-medium">Business days for domestic delivery</p>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 border border-white/20 hover:border-white/40 transition-all"
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          >
            <div className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 text-white">
              <AnimatedCounter from={0} to={14} duration={2} />
              <span className="text-xl sm:text-2xl">-</span>
              <AnimatedCounter from={0} to={7} duration={2} />
            </div>
            <p className="text-white/70 text-xs sm:text-sm font-medium">Business days for international delivery</p>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 border border-white/20 hover:border-white/40 transition-all sm:col-span-2 md:col-span-1"
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          >
            <div className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 text-white">
              <AnimatedCounter from={0} to={100} duration={2} />
              <span className="text-xl sm:text-2xl">%</span>
            </div>
            <p className="text-white/70 text-xs sm:text-sm font-medium">Medical-grade protective packaging</p>
          </motion.div>
        </motion.div>
      </div>
    </section>

      {/* Shipping Options Section */}
      {/* Infinite Carousel Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-12 md:mb-16 px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">Shipping Options</h2>
            <div className="w-16 sm:w-20 h-1 bg-accent rounded-full mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base md:text-lg text-foreground/60">
              Driven by precision and passion, our team continues to innovate and refine.
            </p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative min-h-[500px] sm:min-h-[550px] md:h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl">
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
                <div className="grid md:grid-cols-2 gap-6 sm:gap-7 md:gap-8 h-full items-center px-2 sm:px-4 md:px-8 py-4 sm:py-6 md:py-0">
                  {/* Image Side */}
                  <motion.div
                    className="relative h-64 sm:h-72 md:h-full rounded-xl sm:rounded-2xl overflow-hidden border-2 border-accent/30 shadow-2xl"
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
                    className="space-y-4 sm:space-y-5 md:space-y-6"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div>
                      <motion.h3
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {teamMembers[currentIndex].name}
                      </motion.h3>
                      <motion.p
                        className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {teamMembers[currentIndex].role}
                      </motion.p>
                    </div>

                    <motion.p
                      className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {teamMembers[currentIndex].description}
                    </motion.p>

                    {/* <motion.div
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
                    </motion.div> */}
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

      {/* Shipping Charges Section - Image Left */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-12 md:mb-16 px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">Shipping Charges</h2>
            <div className="w-16 sm:w-20 h-1 bg-accent rounded-full mx-auto" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="rounded-t-2xl md:rounded-l-2xl md:rounded-t-none overflow-hidden border border-accent/20 h-64 sm:h-80 md:h-full min-h-64 sm:min-h-80 md:min-h-96">
              <Image
                src="/calculator-pricing-cost-analysis-financial-plannin.jpg"
                alt="Shipping cost calculation"
                className="w-full h-full object-cover"
                width={1000}
                height={1000}
              />
            </div>

            <motion.div
              className="bg-card rounded-b-2xl md:rounded-r-2xl md:rounded-b-none p-6 sm:p-8 md:p-10 lg:p-12 border border-t-0 md:border-t md:border-l-0 border-accent/20 flex flex-col justify-center min-h-64 sm:min-h-80 md:h-full md:min-h-96 space-y-4 sm:space-y-5 md:space-y-6"
              whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">How We Calculate Costs</h3>
                <p className="text-sm sm:text-base text-foreground/70">
                  Shipping costs are calculated based on weight, dimensions, and destination, with the final price
                  displayed at checkout.
                </p>
              </motion.div>

              <motion.div
                className="border-t border-border/50 pt-4 sm:pt-5 md:pt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">Special Offers</h3>
                <motion.ul
                  className="space-y-2 text-foreground/70"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.li className="flex gap-3" variants={itemVariants} whileHover={{ x: 5 }}>
                    <span className="text-accent font-bold text-lg">✨</span>
                    <span>Free shipping may be offered on selected products</span>
                  </motion.li>
                  <motion.li className="flex gap-3" variants={itemVariants} whileHover={{ x: 5 }}>
                    <span className="text-accent font-bold text-lg">✨</span>
                    <span>Free shipping for orders above a certain value</span>
                  </motion.li>
                  <motion.li className="flex gap-3" variants={itemVariants} whileHover={{ x: 5 }}>
                    <span className="text-accent font-bold text-lg">✨</span>
                    <span>Express international shipments incur additional fees</span>
                  </motion.li>
                </motion.ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Packaging & Safety - Image Right */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-card rounded-t-2xl md:rounded-l-2xl md:rounded-t-none p-6 sm:p-8 md:p-10 lg:p-12 border border-b-0 md:border-b md:border-r-0 border-accent/20 flex flex-col justify-center min-h-64 sm:min-h-80 md:h-full md:min-h-96 order-2 md:order-1"
              whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-5 md:mb-6">Packaging & Safety</h2>
              <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-5 md:mb-6">
                All instruments are packed using medical-grade protective materials, ensuring they arrive clean,
                sterile, and ready for professional use.
              </p>
              <motion.div
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div className="flex gap-3" variants={itemVariants} whileHover={{ x: 5 }}>
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="text-foreground/70">Medical-grade materials</span>
                </motion.div>
                <motion.div className="flex gap-3" variants={itemVariants} whileHover={{ x: 5 }}>
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="text-foreground/70">Sterile and clean upon arrival</span>
                </motion.div>
                <motion.div className="flex gap-3" variants={itemVariants} whileHover={{ x: 5 }}>
                  <span className="text-accent font-bold text-xl">✓</span>
                  <span className="text-foreground/70">Professional-grade protection</span>
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="rounded-t-2xl md:rounded-r-2xl md:rounded-t-none overflow-hidden border border-b-0 md:border-b border-accent/20 h-64 sm:h-80 md:h-full min-h-64 sm:min-h-80 md:min-h-96 order-1 md:order-2">
              <Image src="/medical-grade-protective-packaging-sterile-instrum.jpg" alt="Protective packaging" className="w-full h-full object-cover" width={1000} height={1000} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tracking & Support - Image Left */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="rounded-t-2xl md:rounded-l-2xl md:rounded-t-none overflow-hidden border border-accent/20 h-64 sm:h-80 md:h-full min-h-64 sm:min-h-80 md:min-h-96">
              <Image src="/real-time-tracking-gps-location-monitoring-custome.jpg" alt="Real-time tracking" className="w-full h-full object-cover" width={1000} height={1000} />
            </div>

            <motion.div
              className="bg-card rounded-b-2xl md:rounded-r-2xl md:rounded-b-none p-6 sm:p-8 md:p-10 lg:p-12 border border-t-0 md:border-t md:border-l-0 border-accent/20 flex flex-col justify-center min-h-64 sm:min-h-80 md:h-full md:min-h-96"
              whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-5 md:mb-6">Tracking & Support</h2>
              <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-5 md:mb-6">
                Once your order is shipped, you will receive a tracking number via email or SMS to monitor delivery
                through the courier&apos;s website.
              </p>
              <motion.div
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div className="flex gap-3" variants={itemVariants} whileHover={{ x: 5 }}>
                  <span className="text-accent font-bold text-xl">📍</span>
                  <span className="text-foreground/70">Real-time tracking updates</span>
                </motion.div>
                <motion.div className="flex gap-3" variants={itemVariants} whileHover={{ x: 5 }}>
                  <span className="text-accent font-bold text-xl">💬</span>
                  <span className="text-foreground/70">24/7 customer support available</span>
                </motion.div>
                <motion.div className="flex gap-3" variants={itemVariants} whileHover={{ x: 5 }}>
                  <span className="text-accent font-bold text-xl">🚚</span>
                  <span className="text-foreground/70">Express delivery inquiries welcome</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Customs & Duties - Image Right */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-card rounded-t-2xl md:rounded-l-2xl md:rounded-t-none p-6 sm:p-8 md:p-10 lg:p-12 border border-b-0 md:border-b md:border-r-0 border-accent/20 flex flex-col justify-center min-h-64 sm:min-h-80 md:h-full md:min-h-96 order-2 md:order-1"
              whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-5 md:mb-6">Customs, Duties & Taxes</h2>
              <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-5 md:mb-6">
                International recipients are responsible for any customs duties, import taxes, or local fees.
              </p>
              <motion.ul
                className="space-y-3 text-foreground/70"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li className="flex gap-3" variants={itemVariants} whileHover={{ x: 5 }}>
                  <span className="text-accent font-bold">•</span>
                  <span>Not included in product prices or shipping costs</span>
                </motion.li>
                <motion.li className="flex gap-3" variants={itemVariants} whileHover={{ x: 5 }}>
                  <span className="text-accent font-bold">•</span>
                  <span>Check local customs regulations before ordering</span>
                </motion.li>
                <motion.li className="flex gap-3" variants={itemVariants} whileHover={{ x: 5 }}>
                  <span className="text-accent font-bold">•</span>
                  <span>Vary by destination country and product type</span>
                </motion.li>
              </motion.ul>
            </motion.div>

            <div className="rounded-t-2xl md:rounded-r-2xl md:rounded-t-none overflow-hidden border border-b-0 md:border-b border-accent/20 h-64 sm:h-80 md:h-full min-h-64 sm:min-h-80 md:min-h-96 order-1 md:order-2">
              <Image src="/customs-border-inspection-international-regulation.jpg" alt="Customs and duties" className="w-full h-full object-cover" width={1000} height={1000} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Accuracy of Shipping Information - Image Left */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="rounded-t-2xl md:rounded-l-2xl md:rounded-t-none overflow-hidden border border-accent/20 h-64 sm:h-80 md:h-full min-h-64 sm:min-h-80 md:min-h-96">
                <Image src="/address-verification-accuracy-form-data-entry-prec.jpg" alt="Shipping accuracy" className="w-full h-full object-cover" width={1000} height={1000} />
            </div>

            <motion.div
              className="bg-card rounded-b-2xl md:rounded-r-2xl md:rounded-b-none p-6 sm:p-8 md:p-10 lg:p-12 border border-t-0 md:border-t md:border-l-0 border-accent/20 flex flex-col justify-center min-h-64 sm:min-h-80 md:h-full md:min-h-96"
              whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-5 md:mb-6">Accuracy of Shipping Information</h2>
              <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-5 md:mb-6">
                Customers must provide complete and accurate shipping details at checkout.
              </p>
              <motion.ul
                className="space-y-3 text-foreground/70"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li className="flex gap-3" variants={itemVariants}>
                  <span className="text-accent font-bold">⚠</span>
                  <span>We cannot be held responsible for incorrect addresses</span>
                </motion.li>
                <motion.li className="flex gap-3" variants={itemVariants}>
                  <span className="text-accent font-bold">⚠</span>
                  <span>Contact support immediately if errors are found</span>
                </motion.li>
                <motion.li className="flex gap-3" variants={itemVariants}>
                  <span className="text-accent font-bold">⚠</span>
                  <span>Changes cannot be guaranteed once with courier&apos;s</span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* After Delivery Section */}
      
    </main>
  )
}

export default DeliveryPage
