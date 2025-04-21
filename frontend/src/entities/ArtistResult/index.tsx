import './artistResult.css';
import {Link} from "react-router";

import artistPhoto from '../../shared/assets/dua-lipa(artist).png';

export const ArtistResult = () => {
    return(
        <Link to="/artist" id="artist-result">
            <div className="artist-picture-container">
                <img src={artistPhoto} alt="Картинка релиза" className="artist-picture"/>
            </div>
            <div id="artist-name">
                Dua Lipa
            </div>
        </Link>
    )
}