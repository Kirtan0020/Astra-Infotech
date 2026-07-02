import { Link } from 'react-router-dom'

export default function GradientButton({ href, children, className = '', onClick }) {
  const isRoute = href?.startsWith('/')
  const sheen = (
    <span
      aria-hidden="true"
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full"
    />
  )
  const content = <span className="relative flex items-center gap-2">{children}</span>
  const classes = `btn-primary group/btn relative overflow-hidden ${className}`

  if (isRoute) {
    return (
      <Link to={href} onClick={onClick} className={classes}>
        {sheen}
        {content}
      </Link>
    )
  }

  return (
    <a href={href} onClick={onClick} className={classes}>
      {sheen}
      {content}
    </a>
  )
}
