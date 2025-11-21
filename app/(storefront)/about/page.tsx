"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"





const AboutPage = () => {
  return (
    <main>
      <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
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
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-5 md:mb-6 text-balance leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Precision You Can Trust
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light mb-6 sm:mb-7 md:mb-8 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Innovation You Can Rely On
          </motion.p>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We create high-quality dental instruments that empower professionals worldwide. Our foundation is built on
            precision, innovation, and reliability.
          </motion.p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-16 sm:mb-20 md:mb-24">
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
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 md:order-2"
            >
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground w-full border-b-4 border-primary pb-3 sm:pb-4 mb-6 sm:mb-7 md:mb-8">Ourbur Mission</h2>
                  
                </div>
                <p className="text-base sm:text-lg md:text-xl text-foreground/75 leading-relaxed">
                  To promote dental healthcare worldwide by providing instruments that unite precision, longevity, and 
                  user-friendliness. Each product embodies our commitment to craftsmanship, innovation, and professional confidence
                </p>
                <p className="text-sm sm:text-base text-foreground/60 leading-relaxed">
                  We are committed to setting new standards in the dental instrumentation industry through continuous
                  innovation and unwavering quality.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Vision Section */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4">Our Vision</h2>
                  <div className="w-12 sm:w-16 h-1 bg-primary rounded-full mb-6 sm:mb-7 md:mb-8" />
                </div>
                <p className="text-base sm:text-lg md:text-xl text-foreground/75 leading-relaxed">
                  To be a global leader in dental instrumentation, defining the future of dental healthcare with
                   innovative solutions, uncompromising quality, and superior service.
                </p>
                <p className="text-sm sm:text-base text-foreground/60 leading-relaxed">
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
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 overflow-hidden">
        {/* Background Image */}
        <Image
          src={"/surgical-instruments-precision-dental-tools.jpg"}
          alt="Precision dental instruments"
          fill
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-6">
              Our Product Catalogue
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8">
              Explore our comprehensive range of precision dental instruments. Download our complete catalogue to discover 
              innovative solutions designed for dental professionals worldwide.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button
                onClick={() => window.open('/catalogue.pdf', '_blank')}
                size="lg"
                className="bg-gradient-to-r from-stone-100 to-orange-200 text-gray-800 hover:from-stone-200 hover:to-orange-300 ring-gray-400 rounded-lg font-medium cursor-pointer px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg"
              >
                View Catalogue
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-2 sm:px-0">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-7 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Our Commitment
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-7 md:mb-8 opacity-95"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
             we're committed to building the future of dental healthcare. With collaboration, creativity, and a never-ending
            pursuit of excellence, we guarantee that every instrument we provide empowers professionals to deliver their best
          </motion.p>
          <motion.div
            className="pt-6 sm:pt-7 md:pt-8 border-t border-primary-foreground/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-base sm:text-lg md:text-xl italic">
              Exsurion Instruments Precision You Can Trust, Innovation You Can Rely On
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
