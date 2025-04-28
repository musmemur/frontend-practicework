import './releasesSection.css';
import {MusicRelease} from "../MusicRelease";
import React, {useState} from "react";
import {Release} from "../../entities/Release.ts";

interface ReleaseSectionProps {
    sectionTitle: string;
    releases: Release[];
}

export const ReleasesSection: React.FC<ReleaseSectionProps> = ({sectionTitle, releases}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return(
        <div className="release-section">
            <div className="release-section-top">
                <div>{sectionTitle}</div>
                <button
                    className={`more-button ${isExpanded ? 'expanded' : ''}`}
                    onClick={toggleExpand}
                >
                    {isExpanded ? 'Свернуть' : 'Больше'}
                </button>
            </div>

            <div
                className="releases"
                style={{
                    flexWrap: isExpanded ? 'wrap' : 'nowrap',
                }}
            >
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