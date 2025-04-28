import "./albumInfo.css";
import {Link} from "react-router";

//<section className={cn(styles.container, styles.dssd, { [styles.dsds]: flag })}>

type AlbumInfoProps = {
    title: string;
    artist: string;
    imageUrl?: string;
};

export const AlbumInfo: React.FC<AlbumInfoProps> = ({title, artist, imageUrl}) => {
    return (
        <section id="album-info">
            <img
                src={imageUrl || "/fallback.jpg"}
                alt={`Обложка ${title}`}
                id="album-picture"
            />
            <div id="description-info">
                <div>
                    <Link to={`/artist/${encodeURIComponent(artist)}`} id="artist">
                        {artist}
                    </Link>
                    <div className="release-title-container">
                        <span className="album-title">{title}</span>
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