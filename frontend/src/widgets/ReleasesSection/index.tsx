import './releasesSection.css';
import {MusicRelease} from "../../entities/MusicRelease";
import React from "react";
import {Release} from "../../app/types/Release.ts";

interface ReleaseSectionProps {
    sectionTitle: string;
    releases: Release[];
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