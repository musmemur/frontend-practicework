import React from "react";
import "./releaseRating.css";

type ReleaseRatingProps = {
    rating: number;
}

export const ReleaseRating: React.FC<ReleaseRatingProps> = ({rating}) => {
    return (
        <div className="release-rating">
            {[5, 4, 3, 2, 1].map((value) => (
                <React.Fragment key={value}>
                    <label>
                        {value}
                        <input
                            type="radio"
                            value={value}
                            name={`rating-${value}`}
                            className={`rating-${value}`}
                            checked={rating === value}
                            disabled
                        />
                    </label>
                </React.Fragment>
            ))}
        </div>
    )
}