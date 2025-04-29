import {Header} from "../../widgets/Header";
import {ReleasesSection} from "../../widgets/ReleasesSection";
import '../../app/styles/searchPage.css';
import {NavLink, useLocation} from "react-router";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../app/axiosInstance.ts";

export const SearchPage = () => {
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("search");

    useEffect(() => {
        const fetchData = async () => {
            const queryString = searchValue ? encodeURIComponent(searchValue) : '';
            const response = await axiosInstance.get(`/Search?query=${encodeURIComponent(queryString)}`);
            setAlbums(response.data.albums);
            setArtists(response.data.artists);
        };

        fetchData();
    }, [searchValue]);

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