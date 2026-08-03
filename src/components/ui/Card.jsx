export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface-alt p-6 transition-all duration-300 ease-out hover:border-text-muted ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
