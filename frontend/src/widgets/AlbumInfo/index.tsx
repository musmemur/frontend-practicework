import "./albumInfo.css";
import {Link} from "react-router";
import React from "react";
import {RatingModal} from "../../entities/RatingModal.ts";

//<section className={cn(styles.container, styles.dssd, { [styles.dsds]: flag })}>

type AlbumInfoProps = {
    title: string;
    artist: string;
    imageUrl?: string;
    ratings: RatingModal[];
};

export function calculateAverageReleaseRating(ratings: RatingModal[]) {
    let sum = 0;
    ratings.forEach(rating => sum += rating.rating);
    return sum;
}

export const AlbumInfo: React.FC<AlbumInfoProps> = ({title, artist, imageUrl, ratings}) => {
    return (
        <section id="album-info">
            <img
                src={imageUrl || "/fallback.jpg"}
                alt={`Обложка ${title}`}
                id="album-picture"
            />
            <div id="description-info">
                <div>
                    <Link to={`/search?search=${artist}`}>
                        {artist}
                    </Link>
                    <div className="release-title-container">
                        <span className="album-title">{title}</span>
                    </div>
                </div>
                {ratings.length > 0 && (
                    <div id="album-score-container">
                        <span>Общая оценка</span>
                        <div id="score">
                            <span>★</span>
                            <span>{calculateAverageReleaseRating(ratings)}</span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}