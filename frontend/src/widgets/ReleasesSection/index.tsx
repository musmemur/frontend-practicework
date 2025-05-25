import './index.scss';
import './adaptive.scss';
import {MusicRelease} from "../MusicRelease";
import React, {useState} from "react";
import {Release} from "../../entities/Release.ts";
import {ReleaseWithRating} from "../../entities/ReleaseWithRating.ts";
import {SavedRelease} from "../../entities/SavedRelease.ts";

interface ReleaseSectionProps {
    sectionTitle: string;
    releases: Release[] | ReleaseWithRating[] | SavedRelease[];
}

const ReleasesSection: React.FC<ReleaseSectionProps> = ({sectionTitle, releases}) => {
    const [showAll, setShowAll] = useState(false);

    const releasesToShow = showAll ? releases : releases.slice(0, 4);

    function isReleaseWithRating(release: Release | ReleaseWithRating | SavedRelease): release is ReleaseWithRating {
        return (release as ReleaseWithRating).rating !== undefined;
    }

    return(
        <div className="releases-section">
            <div className="releases-section-top">
                <div>{sectionTitle}</div>
                {releases.length > 4 && (
                    <button
                        className="more-button"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? 'Скрыть' : 'Больше'}
                    </button>
                )}
            </div>

            <div className="releases">
                {releasesToShow.map((release) => {
                    if (isReleaseWithRating(release)) {
                        return (
                            <MusicRelease
                                key={release.url}
                                name={release.name}
                                artist={release.artist}
                                image={release.image}
                                rating={release.rating}
                            />
                        );
                    }
                    return (
                        <MusicRelease
                            key={release.url}
                            name={release.name}
                            artist={release.artist}
                            image={release.image}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default ReleasesSection;