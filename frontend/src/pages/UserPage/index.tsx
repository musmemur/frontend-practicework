import { Suspense, useEffect, useState, lazy } from "react";
import { useParams } from "react-router";
import { fetchFullUserData } from "../../processes/fetchFullUserData.ts";
import { ApiFullUserResponse } from "../../entities/ApiFullUserResponse.ts";
import { ReleaseWithRating } from "../../entities/ReleaseWithRating.ts";
import { fetchReleaseDataById } from "../../processes/fetchReleaseDataById.ts";
import { SavedRelease } from "../../entities/SavedRelease.ts";
import HeaderSkeleton from "../../shared/ui/Skeletons/HeaderSkeleton";
import UserCardSkeleton from "../../shared/ui/Skeletons/UserCardSkeleton";
import ReleasesSectionSkeleton from "../../shared/ui/Skeletons/ReleasesSectionSkeleton";

const Header = lazy(() => import("../../widgets/Header"));
const UserCard = lazy(() => import("../../widgets/UserCard"));
const ReleasesSection = lazy(() => import("../../widgets/ReleasesSection"));

// Скелетон для заголовка


// Скелетон для карточки пользователя

// Скелетон для секции релизов

export const UserPage = () => {
    const { userId } = useParams<{ userId?: string }>();

    const [user, setUser] = useState<ApiFullUserResponse | null>(null);
    const [ratedReleases, setRatedReleases] = useState<ReleaseWithRating[] | []>([]);
    const [savedReleases, setSavedReleases] = useState<SavedRelease[] | []>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const userData = await fetchFullUserData(userId);
                setUser(userData);

                if (userData?.savedReleases) {
                    const releasesPromises = userData.savedReleases.map(release =>
                        fetchReleaseDataById(release.releaseId)
                    );

                    const releasesData = await Promise.all(releasesPromises);

                    const formattedReleases: SavedRelease[] = releasesData.map(release => ({
                        url: `SavedRelease: "${release.title}" by ${release.artist}`,
                        name: release.title,
                        artist: release.artist,
                        image: release.releasePhoto
                    }));

                    setSavedReleases(formattedReleases);
                }

                if (userData?.ratings) {
                    const releasesPromises = userData.ratings.map(rating =>
                        fetchReleaseDataById(rating.releaseId)
                    );
                    const releasesData = await Promise.all(releasesPromises);
                    const formattedReleases: ReleaseWithRating[] = releasesData.map((release, index) => ({
                        url: `RatedRelease: "${release.title}" by ${release.artist}`,
                        name: release.title,
                        artist: release.artist,
                        image: release.releasePhoto,
                        rating: userData.ratings[index].rating
                    }));

                    setRatedReleases(formattedReleases);
                }

            } catch (error) {
                console.error("Error fetching user data:", error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        (async () => {
            await fetchUserData();
        })();
    }, [userId]);

    if (isLoading || !user) {
        return (
            <div style={{ padding: '20px' }}>
                <HeaderSkeleton />
                <UserCardSkeleton />
                <ReleasesSectionSkeleton />
                <ReleasesSectionSkeleton />
            </div>
        );
    }

    return(
        <div>
            <Suspense fallback={
                <div style={{ padding: '20px' }}>
                    <HeaderSkeleton />
                    <UserCardSkeleton />
                    <ReleasesSectionSkeleton />
                    <ReleasesSectionSkeleton />
                </div>
            }>
                <Header />
                <UserCard user={user} />
                <ReleasesSection sectionTitle="Понравившиеся релизы" releases={savedReleases}/>
                <ReleasesSection sectionTitle="Недавние оценки" releases={ratedReleases}/>
            </Suspense>
        </div>
    )
}
