import {Header} from "../widgets/Header";
import {ReleaseSection} from "../widgets/ReleaseSection";
import '../app/styles/searchPage.css';
import {ArtistResult} from "../entities/ArtistResult";
import {NavLink} from "react-router";

export const SearchPage = () => {
    return(
        <div id="search-section">
            <Header/>
            <nav id="select-search">
                <NavLink to='/' className="selected">ВСЕ</NavLink>
                <NavLink to='/'>АЛЬБОМЫ</NavLink>
                <NavLink to='/'>АРТИСТЫ</NavLink>
            </nav>
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