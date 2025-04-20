import {Header} from "../widgets/Header";
import {AlbumInfo} from "../widgets/AlbumInfo/AlbumInfo.tsx";
import {UserRatingContainer} from "../widgets/UserRatingContainer";
import {UserReviews} from "../widgets/UserReviews";

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