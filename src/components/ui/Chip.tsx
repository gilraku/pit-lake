import { Rating } from '@/types';
import { ratingClass } from '@/lib/scoring';

interface ChipProps {
  rating: Rating;
  size?: 'sm' | 'md';
}

export default function Chip({ rating, size = 'md' }: ChipProps) {
  return (
    <span
      className={`chip ${ratingClass(rating)}`}
      style={{ fontSize: size === 'sm' ? 10 : 11 }}
    >
      {rating}
    </span>
  );
}
