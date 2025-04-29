import {Header} from "../../widgets/Header";
import {AlbumInfo} from "../../widgets/AlbumInfo";
import {UserRatingContainer} from "../../widgets/UserRatingContainer";
import {UserReviews} from "../../widgets/UserReviews";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import {fetchReleaseDataById} from "../../processes/fetchReleaseDataById.ts";

export const AlbumPage = () => {
    const [title, setTitle] = useState<string>("Album");
    const [artist, setArtist] = useState<string>("");
    const [releaseImage, setReleaseImage] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const location = useLocation();
    const navigate = useNavigate();
    const { releaseId } = useParams<{ releaseId?: string }>();

    useEffect(() => {
        if (location.state?.fromSearch !== true) {
            navigate('/search', { replace: true });
            return;
        }

        const fetchFullReleaseData = async () => {
            try {
                setLoading(true);
                const response = await fetchReleaseDataById(releaseId);
                setTitle(response.title);
                setArtist(response.artist);
                setReleaseImage(response.releasePhoto);
            } catch (err) {
                console.error(err);
                setError("Failed to load album data");
                navigate('/not-found');
            } finally {
                setLoading(false);
            }
        };

        fetchFullReleaseData();
    }, [releaseId, location.state, navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // if (!artist || !title) {
    //     return <Link to="/not-found" />;
    // }

    return(
        <div>
            <Header />
            <AlbumInfo title={title} artist={artist} imageUrl={releaseImage} />
            <UserRatingContainer />
            <UserReviews />
        </div>
    )
}