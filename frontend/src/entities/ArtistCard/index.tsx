import './artistCard.css';

import artistPhoto from '../../shared/assets/dua-lipa(artist).png';

export const ArtistCard = () => {
    return(
        <div className="profile-card">
            <div className='artist-picture-container-artist-page'>
                <img src={artistPhoto} alt="Картинка артиста" className="profile-picture"/>
            </div>
            <div className="profile-name">
                Dua Lipa
            </div>
        </div>
    )
}