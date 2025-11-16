"use client"
import { motion } from "framer-motion"
import Image from "next/image"


const benefits = [
  {
    title: "Innovation-Driven Culture",
    description:
      "Be part of a team that constantly challenges boundaries, embraces new ideas, and refines every detail.",
    icon: "🚀",
  },
  {
    title: "Professional Growth",
    description:
      "Access learning opportunities, mentorship, and exposure to cutting-edge dental manufacturing processes.",
    icon: "📈",
  },
  {
    title: "Global Impact",
    description:
      "Your work will support clients and dental professionals around the world, making a tangible difference in healthcare.",
    icon: "🌍",
  },
  {
    title: "Collaborative Environment",
    description: "Work alongside skilled professionals who value teamwork, creativity, and excellence.",
    icon: "🤝",
  },
  {
    title: "Flexible Hours",
    description: "Balance your work and personal life with schedules that support your productivity.",
    icon: "⏰",
  },
  {
    title: "Employee Benefits",
    description: "Enjoy competitive compensation, health coverage, and other perks that value your contributions.",
    icon: "🎁",
  },
]

const opportunities = [
  {
    category: "Engineering & Design",
    description: "Innovate and develop precision dental instruments.",
    icon: "⚙️",
    image: "/engineering.webp",
  },
  {
    category: "Medical & Clinical Expertise",
    description: "Ensure products meet the highest dental standards.",
    icon: "🏥",
    image: "/medical.jpg",
  },
  {
    category: "Business & Operations",
    description: "Drive strategy, logistics, and customer success.",
    icon: "💼",
    image: "/business.jpg",
  },
  {
    category: "Creative & Digital Roles",
    description: "Graphic design, branding, and digital systems management.",
    icon: "🎨",
    image: "/creative.webp",
  },
]

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



const CardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: { duration: 0.3 },
  },
}

const CareerPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden">
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

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Join Us — Shape the Future of Dental Excellence
              </motion.h1>

              <motion.p
                className="text-xl text-foreground/70 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                At Exsurion Instruments, our greatest strength lies in our people. We are a team of engineers,
                designers, strategists, and dental professionals committed to delivering precision-made dental
                instruments that set global standards.
              </motion.p>
            </motion.div>

            <motion.div
              className="rounded-2xl overflow-hidden border border-accent/20 shadow-2xl relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ boxShadow: "0 30px 60px rgba(0,0,0,0.15)" }}
            >
              <Image src="/join-us.jpg" alt="Exsurion team" className="w-full h-auto object-cover" width={1000} height={1000} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Work With Us?</h2>
            <div className="w-20 h-1 bg-accent rounded-full mx-auto mb-4" />
            <p className="text-lg text-foreground/60">
              We offer more than just a job — we offer a career with purpose and impact.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit) => (
              <motion.div key={benefit.title} variants={CardVariants} whileHover="hover" className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative p-8 bg-card rounded-2xl border border-border/50 hover:border-accent/50 transition-all h-full flex flex-col">
                  <motion.div
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-foreground/70 leading-relaxed flex-grow">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Opportunities Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Open Opportunities</h2>
            <div className="w-20 h-1 bg-accent rounded-full mx-auto mb-4" />
            <p className="text-lg text-foreground/60">
              We are always on the lookout for passionate individuals in these areas.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {opportunities.map((opp) => (
              <motion.div key={opp.category} variants={CardVariants} whileHover="hover" className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative bg-card rounded-2xl border border-border/50 hover:border-accent/50 transition-all overflow-hidden h-full flex flex-col">
                  <div className="h-48 overflow-hidden border-b border-border/50">
                    <motion.img
                      src={opp.image}
                      alt={opp.category}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <motion.div
                      className="text-4xl mb-4"
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {opp.icon}
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-primary mb-3">{opp.category}</h3>
                    <p className="text-foreground/70 leading-relaxed text-lg flex-grow">{opp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Look For Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What We Look For</h2>
            <div className="w-20 h-1 bg-accent rounded-full mx-auto" />
          </motion.div>

          <motion.div
            className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          >
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-2xl"
              animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
            />
            <div className="relative z-10">
              <p className="text-lg text-foreground/70 leading-relaxed">
                We seek curious, motivated, and solution-oriented professionals who thrive in a collaborative
                environment and share our commitment to quality, innovation, and customer satisfaction. Previous
                experience is valued, but passion, dedication, and a willingness to learn are equally important.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ready to Join Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Join Us?
          </motion.h2>

          <motion.div
            className="bg-[rgb(230, 228, 220)] p-12 rounded-2xl border border-border/50 mb-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
            <div className="relative z-10">
              <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                If you are interested in joining Exsurion Instruments, please send your resume/CV and a brief cover
                letter highlighting your skills and experience to:
              </p>
              <motion.a
                href="mailto:careers@exsurion.com"
                className="inline-block px-8 py-4 bg-white text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors border border-primary/50"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.98 }}
              >
                careers@exsurion.com
              </motion.a>
            </div>
          </motion.div>

          <motion.p
            className="text-foreground/60 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            We look forward to hearing from you and exploring how you can contribute to the future of dental excellence!
          </motion.p>
        </div>
      </section>
    </main>
  )
}

export default CareerPage
