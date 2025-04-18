import {Header} from "../components/Header/Header.tsx";
import {ReleaseSection} from "../components/ReleaseSection/ReleaseSection.tsx";
import '../styles/searchPage.css';
import {ArtistResult} from "../components/ArtistResult/ArtistResult.tsx";

export const SearchPage = () => {
    return(
        <div id="search-section">
            <Header/>
            <div id="select-search">
                <a href='/' className="selected">ВСЕ</a>
                <a href='/'>АЛЬБОМЫ</a>
                <a href='/'>АРТИСТЫ</a>
            </div>
            <div id="search-result">
                Результаты по запросу "dua lipa"
            </div>
            <ReleaseSection sectionTitle="Альбомы"/>
            <div className="release-section">
                <div className="release-section-top">
                    <div>Артисты</div>
                    <button className="more-button">Больше</button>
                </div>
                <div className="search-artist">
                    <ArtistResult/>
                    <ArtistResult/>
                    <ArtistResult/>
                    <ArtistResult/>
                </div>
            </div>
        </div>
    )
}