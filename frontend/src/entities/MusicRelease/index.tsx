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

const albumImgPlaceholder = "https://lastfm.freetls.fastly.net/i/u/64s/c6f59c1e5e7240a4c0d427abd71f3dbb.jpg";

export const MusicRelease: React.FC<MusicReleaseProps> = ({ name, artist, image }) => {
    const imageUrl = image?.[3]?.['#text'] || albumImgPlaceholder;

    const handleClick = () => {
        localStorage.setItem(`album_${artist}_${name}`, JSON.stringify({ name, artist, image }));
    };

    return (
        <Link
            to={`/album/${encodeURIComponent(artist)}/${encodeURIComponent(name)}`}
            state={{ fromSearch: true }}
            onClick={handleClick}
            className="music-release"
        >
                <img src={imageUrl} alt={name} className="release-picture" />
                <div className="release-title">{name}</div>
                <div className="release-artist">{artist}</div>
        </Link>
    );
};
