import "./index.scss";
import './adaptive.scss';
import {Link} from "react-router";
import React from "react";
import {calculateAverageReleaseRating} from "../../shared/utils/calculateAverageReleaseRating.ts";
import {ReleaseInfoType} from "../../entities/ReleaseInfoType.ts";

type AlbumInfoProps = {
    release: ReleaseInfoType;
};

export const AlbumInfo: React.FC<AlbumInfoProps> = ({release}) => {
    return (
        <section className="album-info">
            <picture>
                <img
                    src={release.releasePhoto}
                    alt={`Обложка ${release.title}`}
                    className="album-picture"
                />
            </picture>
            <div className="description-info">
                <div>
                    <div>
                        <span className="album-title">{release.title}</span>
                    </div>
                    <Link to={`/search?search=${release.artist}`}>
                        {release.artist}
                    </Link>
                </div>
                <div className="album-score">
                    {release.ratings.length > 0 ? (
                        <>
                            <span>Общая оценка</span>
                            <div>
                                <span>★</span>
                                <span>{calculateAverageReleaseRating(release.ratings)}</span>
                            </div>
                        </>
                    ) : <span>Нет оценок</span>}
                </div>
            </div>
        </section>
    )
}