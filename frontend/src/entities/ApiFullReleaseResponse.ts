import {RatingModal} from "./RatingModal.ts";
import {ReviewModal} from "./ReviewModal.ts";

export type ApiFullReleaseResponse = {
    title: string;
    artist: string;
    releasePhoto: string;
    ratings: RatingModal[] | [];
    reviews: ReviewModal[] | [];
}