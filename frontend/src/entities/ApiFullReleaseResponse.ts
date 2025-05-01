import {RatingModal, ReviewModal} from "../pages/AlbumPage/AlbumPage.tsx";

export type ApiFullReleaseResponse = {
    title: string;
    artist: string;
    releasePhoto: string;
    ratings: RatingModal[] | [];
    reviews: ReviewModal[] | [];
}