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
                        url: '',
                        name: release.title,
                        artist: release.artist,
                        image: release.releasePhoto
                    }));

                    setSavedReleases(formattedReleases);
                }

                if (userData?.ratings) {
                    // Создаём массив промисов для загрузки данных о релизах
                    const releasesPromises = userData.ratings.map(rating =>
                        fetchReleaseDataById(rating.releaseId)
                    );

                    // Ожидаем завершения всех промисов
                    const releasesData = await Promise.all(releasesPromises);

                    // Сопоставляем данные релизов с их рейтингами
                    const formattedReleases: ReleaseWithRating[] = releasesData.map((release, index) => ({
                        url: '', // Заполните соответствующим значением
                        name: release.title,
                        artist: release.artist,
                        image: release.releasePhoto,
                        rating: userData.ratings[index].rating // Сохраняем рейтинг из исходных данных
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
            <UserCard />
            <ReleasesSection sectionTitle="Понравившиеся релизы" releases={savedReleases}/>
            <ReleasesSection sectionTitle="Недавние оценки" releases={ratedReleases}/>
        </div>
    )
}
