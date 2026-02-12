import { useState } from "react";
import { z } from "zod";
import StarRating from "./StarRating";

const reviewSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  rating: z.number().min(1, "Please select a rating").max(5),
  feedback: z.string().trim().min(5, "Feedback must be at least 5 characters").max(1000),
});

interface ReviewFormProps {
  onSubmit: (review: { name: string; email: string; rating: number; feedback: string }) => void;
}

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = reviewSchema.safeParse({ name, email, rating, feedback });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit({ name: result.data.name, email: result.data.email, rating: result.data.rating, feedback: result.data.feedback });
    setName("");
    setEmail("");
    setRating(0);
    setFeedback("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitted && (
        <div className="rounded-md bg-primary/10 border gold-border p-3 text-sm text-foreground text-center font-medium">
          ✨ Thank you for your review!
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
        />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
        />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Rating</label>
        <StarRating rating={rating} onRate={setRating} size={28} interactive />
        {errors.rating && <p className="mt-1 text-xs text-destructive">{errors.rating}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Your Feedback</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your experience with us..."
          rows={4}
          className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
        />
        {errors.feedback && <p className="mt-1 text-xs text-destructive">{errors.feedback}</p>}
      </div>
      <button
        type="submit"
        className="w-full rounded-md gold-gradient py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
