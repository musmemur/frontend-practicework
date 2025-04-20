import {Header} from "../widgets/Header";
import {ArtistCard} from "../entities/ArtistCard";
import {ReleaseSection} from "../widgets/ReleaseSection";

export const ArtistPage = () => {
    return(
        <div>
            <Header />
            <ArtistCard />
            <ReleaseSection sectionTitle="Альбомы"/>
            <ReleaseSection sectionTitle="Синглы"/>
        </div>
    )
}