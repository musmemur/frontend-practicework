export type ApiFullUserResponse = {
    userId: string;
    username: string;
    userPhoto: string;
    ratings: RatingDto[] | [];
    savedReleases: SavedReleaseDto[] | [];
}

export type RatingDto = {
    releaseId: string;
    rating: number;
}

export type SavedReleaseDto = {
    releaseId: string;
}