import './artistResult.css';

export const ArtistResult = () => {
    return(
        <a id="artist-result" href="/artist">
            <div className="artist-picture-container">
                <img src="src/assets/dua-lipa(artist).png" alt="Картинка релиза" className="artist-picture"/>
            </div>
            <div id="artist-name">
                Dua Lipa
            </div>
        </a>
    )
}