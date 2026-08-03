'use client'

import { motion, useReducedMotion } from 'motion/react'

export default function Section({ children, className = '', id }) {
  const reduce = useReducedMotion()

  return (
    <motion.section
      id={id}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`py-16 md:py-24 ${className}`}
    >
      {children}
    </motion.section>
  )
}
