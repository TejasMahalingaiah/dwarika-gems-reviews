import StarRating from "./StarRating";

interface Review {
  name: string;
  email: string;
  rating: number;
  feedback: string;
  date: string;
}

const ReviewCard = ({ name, rating, feedback, date }: Review) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="rounded-lg border gold-border bg-card p-5 gold-shadow transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full gold-gradient font-display text-sm font-semibold text-primary-foreground">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="font-display text-base font-semibold text-foreground">{name}</h3>
            <span className="text-xs text-muted-foreground">{new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="mt-1">
            <StarRating rating={rating} size={16} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
