import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: number;
  interactive?: boolean;
}

const StarRating = ({ rating, onRate, size = 20, interactive = false }: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`transition-colors duration-200 ${
            star <= rating
              ? "fill-gold text-gold"
              : "fill-transparent text-muted-foreground/40"
          } ${interactive ? "cursor-pointer hover:text-gold hover:fill-gold/50" : ""}`}
          onClick={() => interactive && onRate?.(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
