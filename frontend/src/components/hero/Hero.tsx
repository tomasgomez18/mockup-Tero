import { motion, type Variants } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import ButtonLink from '@/components/buttonLink/ButtonLink'
import type { NavItem } from '@/types/navigation'

interface HeroProps {
  eyebrow?: string
  title: string
  description?: string
  image: string
  primaryAction: NavItem
  secondaryAction?: NavItem
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function Hero({ eyebrow, title, description, image, primaryAction, secondaryAction }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-600">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]"
      />
      <div aria-hidden="true" className="absolute -right-24 -bottom-32 -z-10 size-96 rounded-full bg-brand-700" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-32 pb-24 sm:px-6 md:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-36 lg:pb-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 text-white sm:gap-5"
        >
          {eyebrow && (
            <motion.span
              variants={item}
              className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-600"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            variants={item}
            className="text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p variants={item} className="max-w-lg text-base text-white/90 sm:text-lg">
              {description}
            </motion.p>
          )}
          <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
            <ButtonLink to={primaryAction.to} variant="light" size="lg" className="group font-semibold text-brand-600">
              {primaryAction.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            {secondaryAction && (
              <ButtonLink to={secondaryAction.to} variant="outlineLight" size="lg">
                {secondaryAction.label}
              </ButtonLink>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="hidden md:block"
        >
          <div className="rotate-2 overflow-hidden rounded-3xl bg-white p-3 shadow-2xl shadow-black/30">
            <img src={image} alt="" className="aspect-square w-full rounded-2xl object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
