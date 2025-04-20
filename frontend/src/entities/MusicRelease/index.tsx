import './musicRelease.css';
import {Link} from "react-router";

export const MusicRelease = () => {
    return(
        <Link to="/album" id="music-release">
            <img src="../../shared/assets/future-nostalgia.png" alt="Картинка релиза" id="release-picture"/>
            <div id="release-title">
                Future Nostalgia
            </div>
        </Link>
    )
}