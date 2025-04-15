import {Header} from "../components/Header.tsx";
import {AlbumInfo} from "../components/AlbumInfo.tsx";
import {UserRatingContainer} from "../components/UserRatingContainer.tsx";
import {UserReviews} from "../components/UserReviews.tsx";

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