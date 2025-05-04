import {Header} from "../../widgets/Header";
import {UserCard} from "../../widgets/UserCard";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {fetchFullUserData} from "../../processes/fetchFullUserData.ts";
import {ApiFullUserResponse} from "../../entities/ApiFullUserResponse.ts";
import {ReleasesSection} from "../../widgets/ReleasesSection";
import {ReleaseWithRating} from "../../entities/ReleaseWithRating.ts";
import {fetchReleaseDataById} from "../../processes/fetchReleaseDataById.ts";
import {SavedRelease} from "../../entities/SavedRelease.ts";

export const UserPage = () => {
    const { userId } = useParams<{ userId?: string }>();

    const [user, setUser] = useState<ApiFullUserResponse | null>(null);
    const [ratedReleases, setRatedReleases] = useState<ReleaseWithRating[] | []>([]);
    const [savedReleases, setSavedReleases] = useState<SavedRelease[] | []>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
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
            }
        };

        fetchUserData();
    }, [userId]);

    if (!user) return <div>Не найдено</div>;

    return(
        <div>
            <Header />
            <UserCard user={user} />
            <ReleasesSection sectionTitle="Понравившиеся релизы" releases={savedReleases}/>
            <ReleasesSection sectionTitle="Недавние оценки" releases={ratedReleases}/>
        </div>
    )
}
