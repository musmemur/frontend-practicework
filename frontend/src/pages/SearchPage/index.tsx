import Header from "../../widgets/Header";
import ReleasesSection from "../../widgets/ReleasesSection";
import './index.scss';
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
        <>
            <Header/>
            <div className="search-result">Результаты по запросу <span>"{searchValue}"</span></div>
            <ReleasesSection sectionTitle="Альбомы" releases={albums}/>
        </>
    )
}