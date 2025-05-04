import './musicRelease.css';
import {Link, useNavigate} from "react-router";
import React from "react";
import {fetchReleaseData} from "../../processes/fetchReleaseData.ts";
import {ApiReleaseRequest} from "../../entities/ApiReleaseRequest.ts";
import {ReleaseRating} from "../../shared/ui/ReleaseRating";

type MusicReleaseProps = {
    name: string;
    artist: string;
    image: ApiImage[] | string;
    rating?: number;
}

export type ApiImage = {
    ['#text']: string;
    size: string;
}

const albumImgPlaceholder = "https://lastfm.freetls.fastly.net/i/u/64s/c6f59c1e5e7240a4c0d427abd71f3dbb.jpg";

export const MusicRelease: React.FC<MusicReleaseProps> = ({ name, artist, image, rating }) => {
    const navigate = useNavigate();
    let imageUrl = "";
    if(typeof image != "string") {
        imageUrl = image?.[3]?.['#text'] || albumImgPlaceholder;
    }
    else {
        imageUrl = image;
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const loadRelease = async () => {
            try {
                const release: ApiReleaseRequest = {
                    title: name,
                    artist: artist,
                    releasePhoto: imageUrl,
                }
                const fetchedRelease = await fetchReleaseData(release);
                navigate(`/album/${encodeURIComponent(fetchedRelease.releaseId)}`, {
                    state: { fromSearch: true }
                });
            } catch(e) {
                console.error(e);
            }
        };
        loadRelease();
    };

    return (
        <Link
            to="#"
            state={{fromSearch: true}}
            onClick={handleClick}
            className="music-release"
        >
            <img src={imageUrl} alt={name} className="release-picture"/>
            <div className="release-title">{name}</div>
            <div className="release-artist">{artist}</div>
            {rating && (
                <ReleaseRating rating={rating} />
            )}
        </Link>
    );
};
