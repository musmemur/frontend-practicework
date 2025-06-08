import React, {Fragment, useId} from "react";
import styles from "./index.module.scss";

type ReleaseRatingProps = {
    rating: number;
}

export const ReleaseRating: React.FC<ReleaseRatingProps> = ({rating}) => {
    const uniqueId = useId();

    return (
        <div className={styles.releaseRating}>
            {[5, 4, 3, 2, 1].map((value) => (
                <Fragment key={value}>
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
                </Fragment>
            ))}
        </div>
    )
}