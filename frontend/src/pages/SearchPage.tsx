import {Header} from "../widgets/Header";
import {ReleasesSection} from "../widgets/ReleasesSection";
import '../app/styles/searchPage.css';
import {ArtistResult} from "../entities/ArtistResult";
import {NavLink} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";

export const SearchPage = () => {
    const [query, _] = useState("dua lipa"); // или получай из URL
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:1792/Search?query=${encodeURIComponent(query)}`);
            setAlbums(response.data.albums);
        };

        fetchData();
    }, [query]);

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
            <ReleasesSection sectionTitle="Альбомы" releases={albums}/>
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