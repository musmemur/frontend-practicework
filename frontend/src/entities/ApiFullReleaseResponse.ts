export type ApiFullReleaseResponse = {
    releaseId: string;
    title: string;
    artist: string;
    releasePhoto: string;
    ratings: string[] | null;
    reviews: string[] | null;
    savedByUsers: string[] | null
}