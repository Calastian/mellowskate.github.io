'use client'

import { motion, useReducedMotion } from 'motion/react'

export default function RevealList({ children, className = '', itemClassName = '' }) {
  const reduce = useReducedMotion()

  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={itemClassName}
            >
              {child}
            </motion.div>
          ))
        : children}
    </div>
  )
}
