import {ApiImage} from "../widgets/MusicRelease";

export type Release = {
    releaseId: string;
    name: string;
    artist: string;
    image: ApiImage[];
}