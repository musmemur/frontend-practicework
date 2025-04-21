import './musicRelease.css';
import {Link} from "react-router";
import React from "react";

export type MusicReleaseProps = {
    name: string;
    artist: string;
    image: ApiImage[];
}

export type ApiImage = {
    ['#text']: string;
    size: string;
}

export const MusicRelease: React.FC<MusicReleaseProps> = ({ name, artist, image }) => {
    const imageUrl = image?.[3]?.['#text'] || "/fallback.jpg";

    return (
        <Link to="/album" className="music-release">
            <img src={imageUrl} alt={name} className="release-picture" />
            <div className="release-title">{name}</div>
            <div className="release-artist">{artist}</div>
        </Link>
    );
};
