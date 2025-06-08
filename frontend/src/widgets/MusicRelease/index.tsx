import styles from './index.module.scss';
import {Link, useNavigate} from "react-router";
import React from "react";
import {fetchReleaseData} from "../../processes/fetchReleaseData.ts";
import {ApiReleaseRequest} from "../../entities/ApiReleaseRequest.ts";
import {ReleaseRating} from "../../shared/ui/ReleaseRating";
import {albumImgPlaceholder} from "../../shared/assets/AlbumImgPlaceholder.tsx";

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
                navigate(`/album/${encodeURIComponent(fetchedRelease.releaseId)}`);
            } catch(e) {
                console.error(e);
            }
        };

        (async () => {
            await loadRelease();
        })();
    };

    return (
        <Link to="#" onClick={handleClick} className={styles.musicRelease}>
            <img src={imageUrl} alt={name} className={styles.releasePicture}/>
            <div className={styles.releaseTitle}>{name}</div>
            <div>{artist}</div>
            {rating && (
                <ReleaseRating rating={rating} />
            )}
        </Link>
    );
};
