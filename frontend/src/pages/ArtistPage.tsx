import {Header} from "../components/Header.tsx";
import {ArtistCard} from "../components/ArtistCard.tsx";
import {ReleaseSection} from "../components/ReleaseSection.tsx";

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