import {Header} from "../widgets/Header";
import {ReleasesSection} from "../widgets/ReleasesSection";
import '../app/styles/searchPage.css';
import {ArtistResult} from "../entities/ArtistResult";
import {NavLink, useLocation} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";

export const SearchPage = () => {
    const [query, _] = useState("dua lipa");
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("search");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:1792/Search?query=${encodeURIComponent(searchValue)}`);
            setAlbums(response.data.albums);
            setArtists(response.data.artists);
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
                Результаты по запросу "{searchValue}"
            </div>
            <ReleasesSection sectionTitle="Альбомы" releases={albums}/>
            <ReleasesSection sectionTitle="Артисты" releases={artists}/>
        </div>
    )
}