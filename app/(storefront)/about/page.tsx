"use client"

import Image from "next/image"
import { motion } from "framer-motion"


const leaders = [
  {
    name: "M. Yaqoob",
    role: "CEO",
    description: "Leads with vision, strategy, and a commitment to global excellence.",
    image: "/about1.jpg",
  },
  {
    name: "Dr. Faizan Whla",
    role: "Clinical Advisor",
    description: "Ensures every instrument meets strict clinical standards.",
    image: "/about2.jpg",
  },
  {
    name: "M. Shahzaib",
    role: "Technical Head / AI-ML Engineer",
    description: "Implements smart digital solutions to enhance operations.",
    image: "/about3.webp",
  },
  {
    name: "Burhan Zulfiqar",
    role: "Team Leader",
    description: "Oversees seamless collaboration and project success.",
    image: "/about4.avif",
  },
  {
    name: "Areeba Choudhary",
    role: "Graphic Designer",
    description: "Crafts visuals that embody precision, trust, and brand identity.",
    image: "/about5.jpg",
  },
]



const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
}





const AboutPage = () => {
  return (
    <main>
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src={"/surgical-instruments-precision-dental-tools.jpg"}
          alt="Precision dental instruments"
          fill
          className="object-cover"
          priority
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 md:px-8">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Precision You Can Trust
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl text-white/90 font-light mb-8 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Innovation You Can Rely On
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We create high-quality dental instruments that empower professionals worldwide. Our foundation is built on
            precision, innovation, and reliability.
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-2 md:order-1"
            >
              <Image
                src="/dental-instruments-manufacturing-precision-tools.jpg"
                alt="Our Mission"
                width={500}
                height={500}
                className="rounded-xl shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 md:order-2"
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Our Mission</h2>
                  <div className="w-16 h-1 bg-primary rounded-full mb-8" />
                </div>
                <p className="text-lg md:text-xl text-foreground/75 leading-relaxed">
                  To promote dental healthcare worldwide by providing instruments that unite precision, longevity, and 
                  user-friendliness. Each product embodies our commitment to craftsmanship, innovation, and professional confidence
                </p>
                <p className="text-base text-foreground/60 leading-relaxed">
                  We are committed to setting new standards in the dental instrumentation industry through continuous
                  innovation and unwavering quality.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Vision Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Our Vision</h2>
                  <div className="w-16 h-1 bg-primary rounded-full mb-8" />
                </div>
                <p className="text-lg md:text-xl text-foreground/75 leading-relaxed">
                  To be a global leader in dental instrumentation, defining the future of dental healthcare with
                   innovative solutions, uncompromising quality, and superior service.
                </p>
                <p className="text-base text-foreground/60 leading-relaxed">
                  We aspire to be recognized globally as the preferred partner for dental professionals who demand
                  excellence and reliability in every instrument.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image
                src="/dental-care-innovation-future-technology-clinical-.jpg"
                alt="Our Vision"
                width={500}
                height={500}
                className="rounded-xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 px-4 md:px-8 bg-background/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl  font-bold text-foreground mb-6">Our People The Heart of Exsurion</h2>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                Our people are our biggest asset. Engineers, designers, strategists, and dental professionals collaborate
              to develop innovative dental solutions. From initial idea to last product, our individuals implement passion,
                       imagination, and experience, fueling each innovation and setting high standards of accuracy.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {leaders.map((leader) => (
              <motion.div
                key={leader.name}
                className="relative h-80 rounded-lg overflow-hidden cursor-pointer group"
                variants={fadeInScale}
                whileHover={{ scale: 1.02 }}
              >
                <Image src={leader.image || "/background.png"} alt={leader.name} fill className="object-cover"  />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold text-white mb-1">{leader.name}</h3>
                  <p className="text-sm font-medium text-primary mb-3">{leader.role}</p>
                  <p className="text-sm text-white/90 leading-relaxed">{leader.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="py-20 md:py-28 px-4 md:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl  font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Our Commitment
          </motion.h2>
          <motion.p
            className="text-lg leading-relaxed mb-8 opacity-95"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
             we're committed to building the future of dental healthcare. With collaboration, creativity, and a never-ending
            pursuit of excellence, we guarantee that every instrument we provide empowers professionals to deliver their best
          </motion.p>
          <motion.div
            className="pt-8 border-t border-primary-foreground/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-xl  italic">
              Exsurion Instruments Precision You Can Trust, Innovation You Can Rely On
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
