import './artistResult.css';
import {Link} from "react-router";

export const ArtistResult = () => {
    return(
        <Link to="/artist" id="artist-result">
            <div className="artist-picture-container">
                <img src="../../shared/assets/dua-lipa(artist).png" alt="Картинка релиза" className="artist-picture"/>
            </div>
            <div id="artist-name">
                Dua Lipa
            </div>
        </Link>
    )
}