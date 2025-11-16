"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const companies = [
  {
    name: "Johnson & Johnson",
    logo: "/image1.jpg",
  },
  {
    name: "Regenesis",
    logo: "/image2.jpg",
  },
  {
    name: "Smardii",
    logo: "/image3.jpg",
  },
  {
    name: "KIN",
    logo: "/image4.jpg",
  },
  {
    name: "Henry Schein",
    logo: "/image5.jpg",
  },
  {
    name: "Kongsberg",
    logo: "/image6.jpg",
  },
]

export function TrustedBySection() {
  // Create enough duplicates for seamless looping
  const duplicatedCompanies = [...companies, ...companies, ...companies]

  return (
    <section className="bg-black text-white py-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-gray-400 text-lg mb-12">Trusted by Industry Leaders</h3>

        <div className="relative overflow-hidden container mx-auto">
          {/* Left fade effect */}
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10" />

          {/* Right fade effect */}
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

          <motion.div
            className="flex items-center gap-16"
            animate={{
              x: [0, -companies.length * 256], // 200px (gap) + 56px (estimated logo width)
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image src={company.logo || "/background.png"} alt={`${company.name} logo`} className="h-12 w-auto" width={100} height={100} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
