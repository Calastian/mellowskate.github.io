import { forwardRef } from 'react'

const variants = {
  primary:
    'bg-accent text-surface hover:bg-accent/90 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  secondary:
    'border border-border text-text-primary hover:bg-surface-hover hover:border-text-muted active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-surface-hover active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', href, className = '', ...props },
  ref
) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 ease-out cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...props}
      />
    )
  }

  return (
    <button
      ref={ref}
      className={classes}
      {...props}
    />
  )
})

export default Button
