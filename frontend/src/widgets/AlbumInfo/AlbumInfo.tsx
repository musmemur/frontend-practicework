import "./albumInfo.css";
import {Link} from "react-router";

export const AlbumInfo = () => {
    return(
        <section id="album-info">
            <img src="src/assets/future-nostalgia.png" alt="Картинка альбома" id="album-picture"/>
            <div id="description-info">
                <div>
                    <Link to="/artist" id="artist">Dua Lipa</Link>
                    <div className="release-title-container">
                        <span className="album-title">Future Nostalgia</span>
                        <span className="release-type">/album</span>
                    </div>
                </div>
                <div id="album-score-container">
                    <span>Общая оценка</span>
                    <div id="score">
                        <span>★★★★★</span>
                        <span>(4.0)</span>
                    </div>
                </div>
            </div>
        </section>
    )
}