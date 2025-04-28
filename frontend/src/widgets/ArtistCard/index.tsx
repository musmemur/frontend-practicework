import './artistCard.css';

import artistPhoto from '../../shared/assets/dua-lipa(artist).png';
import {useParams} from "react-router";

export const ArtistCard = () => {
    const {artist} = useParams< {artist?: string} >();

    return(
        <div className="profile-card">
            <div className='artist-picture-container-artist-page'>
                <img src={artistPhoto} alt="Картинка артиста" className="profile-picture"/>
            </div>
            <div className="profile-name">
                {artist}
            </div>
        </div>
    )
}