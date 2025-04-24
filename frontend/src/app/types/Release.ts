import {ApiImage} from "../../entities/MusicRelease";

export type Release = {
    releaseId: string;
    name: string;
    artist: string;
    image: ApiImage[];
}