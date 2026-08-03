export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-accent-muted text-accent border border-accent/20 ${className}`}
    >
      {children}
    </span>
  )
}
