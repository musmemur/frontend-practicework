import {checkSavedReleaseByUser} from "./checkSavedReleaseByUser.ts";
import {fetchUserRating} from "./fetchUserRating.ts";
import {fetchUserReview} from "./fetchUserReview.ts";

interface UserReleaseInteraction {
    isSaved: boolean;
    userRating: number | null;
    userReview: string | null;
}

export async function fetchUserReleaseInteraction(releaseId: string): Promise<UserReleaseInteraction> {
    const [isSaved, userRating, userReview] = await Promise.all([
        checkSavedReleaseByUser(releaseId),
        fetchUserRating(releaseId),
        fetchUserReview(releaseId),
    ]);

    return { isSaved, userRating, userReview };
}