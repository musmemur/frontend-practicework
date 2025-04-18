import {Header} from "../components/Header/Header.tsx";
import {ArtistCard} from "../components/ArtistCard/ArtistCard.tsx";
import {ReleaseSection} from "../components/ReleaseSection/ReleaseSection.tsx";

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