import "./index.scss";
import './adaptive.scss';
import {Link} from "react-router";
import React from "react";
import {RatingModal} from "../../entities/RatingModal.ts";
import {calculateAverageReleaseRating} from "../../shared/utils/calculateAverageReleaseRating.ts";

type AlbumInfoProps = {
    title: string;
    artist: string;
    imageUrl: string;
    ratings: RatingModal[];
};

export const AlbumInfo: React.FC<AlbumInfoProps> = ({title, artist, imageUrl, ratings}) => {
    return (
        <section className="album-info">
            <picture>
                <img
                    src={imageUrl}
                    alt={`Обложка ${title}`}
                    className="album-picture"
                />
            </picture>
            <div className="description-info">
                <div>
                    <div>
                        <span className="album-title">{title}</span>
                    </div>
                    <Link to={`/search?search=${artist}`}>
                        {artist}
                    </Link>
                </div>
                {ratings.length > 0 && (
                    <div className="album-score">
                        <span>Общая оценка</span>
                        <div>
                            <span>★</span>
                            <span>{calculateAverageReleaseRating(ratings)}</span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}