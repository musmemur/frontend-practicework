import './index.scss';
import './adaptive.scss';
import {useLocation} from "react-router";
import {lazy, Suspense, useEffect, useState} from "react";
import {axiosInstance} from "../../app/axiosInstance.ts";
import HeaderSkeleton from "../../shared/ui/Skeletons/HeaderSkeleton";
import ReleasesSectionSkeleton from "../../shared/ui/Skeletons/ReleasesSectionSkeleton";
import Skeleton from "react-loading-skeleton";

const Header = lazy(() => import("../../widgets/Header"));
const ReleasesSection = lazy(() => import("../../widgets/ReleasesSection"));

export const SearchPage = () => {
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("search");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const queryString = searchValue ? encodeURIComponent(searchValue) : '';
            const response = await axiosInstance.get(`/Search?query=${encodeURIComponent(queryString)}`);
            setAlbums(response.data.albums);
            setIsLoading(false);
        };

        (async () => {
            await fetchData();
        })();

    }, [searchValue]);

    if (isLoading) {
        return (
            <>
                <HeaderSkeleton/>
                <Skeleton width={500} height={20} style={{marginLeft: '2rem', marginTop: '1rem'}} />
                <ReleasesSectionSkeleton/>
            </>
        );
    }

    return(
        <>
            <Suspense fallback={
                <>
                    <HeaderSkeleton/>
                    <Skeleton width={500} height={20} style={{marginLeft: '2rem', marginTop: '1rem'}} />
                    <ReleasesSectionSkeleton/>
                </>
            }>
                <Header/>
                <div className="search-result">Результаты по запросу <span>"{searchValue}"</span></div>
                <ReleasesSection sectionTitle="Альбомы" releases={albums}/>
            </Suspense>
        </>
    )
}