import {Header} from "../../widgets/Header";
import {AlbumInfo} from "../../widgets/AlbumInfo";
import {UserRatingContainer} from "../../widgets/UserRatingContainer";
import {UserReviews} from "../../widgets/UserReviews";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import {fetchReleaseDataById} from "../../processes/fetchReleaseDataById.ts";

export type RatingModal = {
    rating: number;
}

export type ReviewModal = {
    userId: string;
    reviewText: string;
}

export const AlbumPage = () => {
    const [title, setTitle] = useState<string>("");
    const [artist, setArtist] = useState<string>("");
    const [releaseImage, setReleaseImage] = useState<string>("");
    const [ratings, setRatings] = useState<RatingModal[] | []>([]);
    const [reviews, setReviews] = useState<ReviewModal[] | []>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const location = useLocation();
    const navigate = useNavigate();
    const { releaseId } = useParams<{ releaseId: string }>();

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
                setRatings(response.ratings);
                setReviews(response.reviews);
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

    return(
        <div>
            <Header />
            <AlbumInfo title={title} artist={artist} imageUrl={releaseImage} ratings={ratings}  />
            {releaseId && <UserRatingContainer releaseId={releaseId} />}
            <UserReviews reviews={reviews} />
        </div>
    )
}