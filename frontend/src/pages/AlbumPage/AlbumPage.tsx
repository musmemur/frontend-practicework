import {Header} from "../../widgets/Header";
import {AlbumInfo} from "../../widgets/AlbumInfo";
import {UserRatingContainer} from "../../widgets/UserRatingContainer";
import {UserReviews} from "../../widgets/UserReviews";
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router";

export const AlbumPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { artist, name } = useParams<{ artist?: string; name?: string }>();
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        if (location.state?.fromSearch !== true) {
            navigate('/search', { replace: true });
        }
    }, [location.state, navigate]);

    useEffect(() => {
        const cachedAlbum = localStorage.getItem(`album_${artist}_${name}`);
        if (cachedAlbum) {
            const { image } = JSON.parse(cachedAlbum);
            setImageUrl(image?.[3]?.['#text']);
        }
    }, [artist, name]);

    if (!artist || !name) {
        return <Link to="/not-found" />;
    }

    return(
        <div>
            <Header />
            <AlbumInfo title={name} artist={artist} imageUrl={imageUrl} />
            <UserRatingContainer />
            <UserReviews />
        </div>
    )
}