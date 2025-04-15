import '../styles/releaseSection.css';
import {MusicRelease} from "./MusicRelease.tsx";
import React from "react";

interface ReleaseSectionProps {
    sectionTitle: string;
}

export const ReleaseSection: React.FC<ReleaseSectionProps> = ({sectionTitle}) => {
    return(
        <div className="release-section">
            <div className="release-section-top">
                <div>{sectionTitle}</div>
                <button className="more-button">Больше</button>
            </div>

            <div className="releases">
                <MusicRelease />
                <MusicRelease />
                <MusicRelease />
                <MusicRelease />
            </div>
        </div>
    )
}