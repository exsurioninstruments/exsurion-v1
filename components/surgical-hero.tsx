import Image from "next/image"

type SurgicalHeroProps = {
  overline?: string
  title?: string
  subheading?: string
  description?: string
  imageSrc?: string
  logoSrc?: string
}

export function SurgicalHero({
  overline = "Exsurion MEDICAL",
  title = "SURGICAL INSTRUMENTS",
  subheading = "PRODUCTS",
  description = "The name Exsurion stands for advanced manufacturing technology, highest precision and perfect performance in terms of surgical instruments. Our product range contains a wide range of forceps, scalpels, scissors, needle holders, retractors as well as all types of hemostatic forceps. We also offer instruments for bone surgery, gynecology, ophthalmology, dermatology, anaesthesia and in the area of ENT and much more.",
  imageSrc = "/instrument.png",
}: SurgicalHeroProps) {
  return (
    <section aria-labelledby="surgical-hero-title" className="relative">
      {/* Left / Right split - Added fixed heights: 96 on mobile, screen height on md and up */}
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] h-96 md:h-[750px]">
        {/* Visual panel */}
        <div className="bg-secondary flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            {/* Product imagery */}
            <Image
              src={imageSrc || "/background.png"}
              alt="Surgical instruments hero"
              className="block w-full h-full object-cover md:object-contain md:pt-16"
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* Content panel - Added flex layout to center content vertically and horizontally */}
        <div className="bg-background flex items-center justify-center overflow-auto">
          <div className="mx-auto max-w-2xl px-6 py-10 md:py-16 lg:py-20">
            <p className="text-sm tracking-widest uppercase text-foreground/60">{overline}</p>
            <h1
              id="surgical-hero-title"
              className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl leading-tight text-balance"
            >
              {title}
            </h1>
            <h2 className="mt-6 text-xl font-semibold tracking-wide text-foreground">{subheading}</h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">{description}</p>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div aria-hidden="true" className="h-1 w-full" style={{ backgroundColor: "var(--color-brand-accent)" }} />
    </section>
  )
}
