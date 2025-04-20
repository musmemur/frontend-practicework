import './artistCard.css';

export const ArtistCard = () => {
    return(
        <div className="profile-card">
            <div className='artist-picture-container-artist-page'>
                <img src="../../shared/assets/dua-lipa(artist).png" alt="Картинка артиста" className="profile-picture"/>
            </div>
            <div className="profile-name">
                Dua Lipa
            </div>
        </div>
    )
}