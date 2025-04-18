import {Header} from "../components/Header/Header.tsx";
import {AlbumInfo} from "../components/AlbumInfo/AlbumInfo.tsx";
import {UserRatingContainer} from "../components/UserRatingContainer/UserRatingContainer.tsx";
import {UserReviews} from "../components/UserReviews/UserReviews.tsx";

export const AlbumPage = () => {
    return(
        <div>
            <Header />
            <AlbumInfo />
            <UserRatingContainer />
            <UserReviews />
        </div>
    )
}