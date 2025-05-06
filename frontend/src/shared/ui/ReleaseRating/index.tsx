import React, {useId} from "react";
import "./index.scss";

type ReleaseRatingProps = {
    rating: number;
}

export const ReleaseRating: React.FC<ReleaseRatingProps> = ({rating}) => {
    const uniqueId = useId();

    return (
        <div className="release-rating">
            {[5, 4, 3, 2, 1].map((value) => (
                <React.Fragment key={value}>
                    <label>
                        {value}
                        <input
                            type="radio"
                            value={value}
                            name={`rating-${uniqueId}`}
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