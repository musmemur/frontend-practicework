import {Header} from "../../widgets/Header";
import {ArtistCard} from "../../widgets/ArtistCard";
import {ReleasesSection} from "../../widgets/ReleasesSection";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../app/axiosInstance.ts";

export const ArtistPage = () => {
    const [albums, setAlbums] = useState([]);
    const {artist} = useParams< {artist?: string} >();

    useEffect(() => {
        const fetchData = async () => {
            const query = artist ? encodeURIComponent(artist) : '';
            const response = await axiosInstance.get(`/Search?query=${encodeURIComponent(query)}`);
            setAlbums(response.data.albums);
        };

        fetchData();
    }, [artist]);

    return(
        <div>
            <Header />
            <ArtistCard />
            <ReleasesSection sectionTitle="Альбомы" releases={albums}/>
        </div>
    )
}