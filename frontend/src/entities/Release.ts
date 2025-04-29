import {ApiImage} from "../widgets/MusicRelease";

export type Release = {
    url: string;
    name: string;
    artist: string;
    image: ApiImage[];
}