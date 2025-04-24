import {Header} from "../widgets/Header";
import {ArtistCard} from "../entities/ArtistCard";
import {ReleasesSection} from "../widgets/ReleasesSection";

//<ReleasesSection sectionTitle="Альбомы" />

export const ArtistPage = () => {
    return(
        <div>
            <Header />
            <ArtistCard />
        </div>
    )
}