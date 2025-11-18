import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Box, Settings, Code, Shield } from "lucide-react"

export default function ServicesExpertise() {
  const certifications = ["Award-Winning", "Trusted by Leading Enterprises", "Exsurioon Certified"]

 

  const stats = [
    { number: "2,500+", label: "Projects Completed" },
    { number: "20", label: "Years of Innovation" },
    { number: "300+", label: "Customers" },
    { number: "0", label: "Non-Conformities in our Last Audit" },
  ]

  return (
    <section className=" py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Certification badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {certifications.map((cert, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-gradient-to-r from-stone-100 to-orange-200 text-gray-800 hover:from-stone-200 hover:to-orange-300 px-2 py-1 text-xs font-medium rounded-full transition-all duration-300"
            >
              {cert}
            </Badge>
          ))}
        </div>

        {/* Main heading */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-medium mb-6 text-balance">
            All-in-One Product Design, Engineering & Software Development Expertise
          </h1>
          <p className="md:text-xl text-gray-300 max-w-4xl mx-auto text-pretty">
            Our multidisciplinary team turns your ideas into market-ready innovations. Guided by structured and
            compliant processes, we ensure a smooth, end-to-end development journey from concept to launch.
          </p>
        </div>


        {/* Stats section */}
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-5xl font-normal mb-2">{stat.number}</div>
              <div className="text-sm md:text-sm text-gray-400 max-w-32 text-balance">{stat.label}</div>
            </div>
          ))}

          {/* BSI Certification badge */}
          <div className="flex items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <div className="text-black text-xs font-bold text-center">
                <div>Exsursion</div>
                <div className="text-[8px]">Best</div>
                <div className="text-[8px]">Quality</div>
                <div className="text-[8px]">Management</div>
                <div className="text-[8px]">CERTIFIED</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
          >
            Explore What We Do
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button size="lg" className=" font-medium">
            Get in Touch
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
