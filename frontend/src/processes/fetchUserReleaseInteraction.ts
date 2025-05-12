import {checkSavedReleaseByUser} from "./checkSavedReleaseByUser.ts";
import {fetchUserRating} from "./fetchUserRating.ts";
import {fetchUserReview} from "./fetchUserReview.ts";

interface UserReleaseInteraction {
    isSaved: boolean;
    userRating: number | null;
    userReview: string | null;
}

export async function fetchUserReleaseInteraction(
    userId: string,
    releaseId: string
): Promise<UserReleaseInteraction> {
    const [isSaved, userRating, userReview] = await Promise.all([
        checkSavedReleaseByUser(userId, releaseId),
        fetchUserRating(userId, releaseId),
        fetchUserReview(userId, releaseId),
    ]);

    return { isSaved, userRating, userReview };
}