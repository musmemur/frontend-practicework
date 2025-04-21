import {Header} from "../widgets/Header";
import {ArtistCard} from "../entities/ArtistCard";
import {ReleasesSection} from "../widgets/ReleasesSection";

// <ReleasesSection sectionTitle="Альбомы"/>
// <ReleasesSection sectionTitle="Синглы"/>

export const ArtistPage = () => {
    return(
        <div>
            <Header />
            <ArtistCard />
        </div>
    )
}