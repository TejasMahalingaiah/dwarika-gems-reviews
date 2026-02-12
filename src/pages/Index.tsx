import { useState, useEffect } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewCard from "../components/ReviewCard";
import StarRating from "../components/StarRating";
import dnjLogo from "@/assets/dnj-logo.png";

interface Review {
  name: string;
  email: string;
  rating: number;
  feedback: string;
  date: string;
}

const STORAGE_KEY = "dnj-reviews";

const defaultReviews: Review[] = [
  { name: "Priya Sharma", email: "priya@email.com", rating: 5, feedback: "Absolutely stunning craftsmanship! The gold necklace I purchased exceeded my expectations. Every detail is perfection.", date: "2026-01-15" },
  { name: "Anita Verma", email: "anita@email.com", rating: 4, feedback: "Beautiful collection and wonderful customer service. The bangles I got for my wedding were gorgeous.", date: "2026-01-28" },
  { name: "Meera Patel", email: "meera@email.com", rating: 5, feedback: "Dwarika Naari Jewellery has the most elegant designs. I always receive compliments when I wear their pieces!", date: "2026-02-05" },
];

const Index = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultReviews;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (review: Omit<Review, "date">) => {
    setReviews((prev) => [{ ...review, date: new Date().toISOString() }, ...prev]);
  };

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b gold-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-5xl flex items-center justify-center py-4 px-4">
          <img src={dnjLogo} alt="Dwarika Naari Jewellery" className="h-16 w-auto" />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold gold-text mb-2">Customer Reviews</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            We treasure every piece of feedback. Share your experience with Dwarika Naari Jewellery.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <StarRating rating={Math.round(avgRating)} size={22} />
            <span className="text-sm font-medium text-foreground">{avgRating.toFixed(1)} out of 5</span>
            <span className="text-xs text-muted-foreground">({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Form */}
          <div>
            <div className="rounded-xl border gold-border bg-card p-6 gold-shadow sticky top-28">
              <h2 className="font-display text-xl font-semibold text-foreground mb-5">Write a Review</h2>
              <ReviewForm onSubmit={handleSubmit} />
            </div>
          </div>

          {/* Reviews List */}
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-5">
              What Our Customers Say
            </h2>
            <div className="space-y-4">
              {reviews.map((review, i) => (
                <ReviewCard key={`${review.email}-${i}`} {...review} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t gold-border py-6 mt-16 text-center">
        <p className="text-xs text-muted-foreground">© 2026 Dwarika Naari Jewellery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
