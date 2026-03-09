import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  max?: number
  size?: number
  showNumber?: boolean
  reviewCount?: number
}

export function StarRating({
  rating,
  max = 5,
  size = 14,
  showNumber = false,
  reviewCount,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating)
          const partial = !filled && i < rating
          return (
            <Star
              key={i}
              size={size}
              className={cn(
                filled
                  ? 'text-yellow-400 fill-yellow-400'
                  : partial
                  ? 'text-yellow-400 fill-yellow-400/40'
                  : 'text-slate-600'
              )}
            />
          )
        })}
      </div>
      {showNumber && (
        <span className="text-sm font-medium text-slate-300">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-slate-500">({reviewCount})</span>
      )}
    </div>
  )
}
