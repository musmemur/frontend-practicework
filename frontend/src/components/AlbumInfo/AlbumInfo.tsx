import "./albumInfo.css";

export const AlbumInfo = () => {
    return(
        <section id="album-info">
            <img src="src/assets/future-nostalgia.png" alt="Картинка альбома" id="album-picture"/>
            <div id="description-info">
                <div>
                    <a href="/artist" id="artist">Dua Lipa</a>
                    <div className="album-title">Future Nostalgia</div>
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