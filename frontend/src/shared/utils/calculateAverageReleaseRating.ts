import {RatingModal} from "../../entities/RatingModal.ts";

export function calculateAverageReleaseRating(ratings: RatingModal[]) {
    let sum = 0;
    ratings.forEach(rating => sum += rating.rating);
    const averageNum = sum / ratings.length;
    return averageNum.toFixed(2);
}