import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Shows 4.3 as four and a half stars, plus the number of reviews.
const Rating = ({ value = 0, reviews, size = "text-sm" }) => {
    const rounded = Math.round(value * 2) / 2; // nearest half star

    return (
        <div
            className="flex items-center gap-1.5"
            role="img"
            aria-label={`Rated ${value} out of 5`}
        >
            <span className={`flex gap-0.5 text-accent-500 ${size}`}>
                {[1, 2, 3, 4, 5].map((n) => {
                    if (n <= rounded) return <FaStar key={n} />;
                    if (n - 0.5 === rounded) return <FaStarHalfAlt key={n} />;
                    return <FaRegStar key={n} />;
                })}
            </span>
            {reviews != null && (
                <span className="text-xs text-gray-500">({reviews})</span>
            )}
        </div>
    );
};

export default Rating;