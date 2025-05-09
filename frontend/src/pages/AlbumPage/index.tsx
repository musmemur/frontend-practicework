import "./index.scss";
import Header from "../../widgets/Header";
import {AlbumInfo} from "../../widgets/AlbumInfo";
import {UserRatingContainer} from "../../widgets/UserRatingContainer";
import {UserReviews} from "../../widgets/UserReviews";
import {Suspense, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {fetchReleaseDataById} from "../../processes/fetchReleaseDataById.ts";
import {RatingModal} from "../../entities/RatingModal.ts";
import {ReviewModal} from "../../entities/ReviewModal.ts";

export const AlbumPage = () => {
    const [title, setTitle] = useState<string>("");
    const [artist, setArtist] = useState<string>("");
    const [releaseImage, setReleaseImage] = useState<string>("");
    const [ratings, setRatings] = useState<RatingModal[] | []>([]);
    const [reviews, setReviews] = useState<ReviewModal[] | []>([]);

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { releaseId } = useParams<{ releaseId: string }>();

    useEffect(() => {
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
                navigate('/not-found');
            } finally {
                setLoading(false);
            }
        };

        (async () => {
            await fetchFullReleaseData();
        })();
    }, [releaseId, navigate]);

    if (loading) {
        return (
            <div className="loading-screen">
                <Header />
                <div className="loading-spinner"></div>
                <p>Загружаем альбом...</p>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <AlbumInfo title={title} artist={artist} imageUrl={releaseImage} ratings={ratings} />
            <Suspense fallback={<div>Загрузка отзывов...</div>}>
                {releaseId && <UserRatingContainer releaseId={releaseId} />}
                <UserReviews reviews={reviews} />
            </Suspense>
        </div>
    );
}