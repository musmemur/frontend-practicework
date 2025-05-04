import {Header} from "../../widgets/Header";
import {ReleasesSection} from "../../widgets/ReleasesSection";
import './searchPage.css';
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../app/axiosInstance.ts";

export const SearchPage = () => {
    const [albums, setAlbums] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("search");

    useEffect(() => {
        const fetchData = async () => {
            const queryString = searchValue ? encodeURIComponent(searchValue) : '';
            const response = await axiosInstance.get(`/Search?query=${encodeURIComponent(queryString)}`);
            setAlbums(response.data.albums);
        };

        (async () => {
            await fetchData();
        })();

    }, [searchValue]);

    return(
        <div id="search-section">
            <Header/>
            <div id="search-result">
                Результаты по запросу "{searchValue}"
            </div>
            <ReleasesSection sectionTitle="Альбомы" releases={albums}/>
        </div>
    )
}