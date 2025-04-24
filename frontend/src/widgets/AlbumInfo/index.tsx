import "./albumInfo.css";
import {Link} from "react-router";

import albumPhoto from "../../shared/assets/future-nostalgia.png";

//<section className={cn(styles.container, styles.dssd, { [styles.dsds]: flag })}>

export const AlbumInfo = () => {
    return (
        <section id="album-info">
            <img src={albumPhoto} alt="Картинка альбома" id="album-picture"/>
            <div id="description-info">
                <div>
                    <Link to="/artist" id="artist">Dua Lipa</Link>
                    <div className="release-title-container">
                        <span className="album-title">Future Nostalgia</span>
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