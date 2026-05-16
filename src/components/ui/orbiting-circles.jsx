import { Children } from 'react'
import { cn } from '../../lib/utils'

export function OrbitingCircles({
  className,
  children,
  reverse = false,
  radius = 160,
  speed = 1,
  iconSize = 30,
  path = true,
  pathColor = 'rgba(201,168,76,0.18)',
}) {
  const duration = 28 / speed
  const items = Children.toArray(children)
  const count = items.length

  return (
    <>
      {path && (
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke={pathColor}
            strokeWidth="1"
            strokeDasharray="5 5"
          />
        </svg>
      )}
      {items.map((child, i) => {
        const angle = (360 / count) * i
        return (
          <div
            key={i}
            className={cn('absolute flex items-center justify-center', className)}
            style={{
              width: iconSize,
              height: iconSize,
              top: `calc(50% - ${iconSize / 2}px)`,
              left: `calc(50% - ${iconSize / 2}px)`,
              animation: `orbit ${duration}s linear infinite`,
              animationDirection: reverse ? 'reverse' : 'normal',
              '--angle': `${angle}deg`,
              '--radius': `${radius}px`,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}
