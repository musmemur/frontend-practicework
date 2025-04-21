import './releasesSection.css';
import {ApiImage, MusicRelease} from "../../entities/MusicRelease";
import React from "react";

interface ReleaseSectionProps {
    sectionTitle: string;
    releases: Release[];
}

export type Release = {
    releaseId: string;
    name: string;
    artist: string;
    image: ApiImage[];
}

export const ReleasesSection: React.FC<ReleaseSectionProps> = ({sectionTitle, releases}) => {
    return(
        <div className="release-section">
            <div className="release-section-top">
                <div>{sectionTitle}</div>
                <button className="more-button">Больше</button>
            </div>

            <div className="releases">
                {releases.map((release) => (
                    <MusicRelease
                        key={release.releaseId}
                        name={release.name}
                        artist={release.artist}
                        image={release.image}
                    />
                ))}
            </div>
        </div>
    )
}