import {Header} from "../components/Header/Header.tsx";
import {UserCard} from "../components/UserCard/UserCard.tsx";
import {ReleaseSection} from "../components/ReleaseSection/ReleaseSection.tsx";

export const UserPage = () => {
    return(
        <div>
            <Header />
            <UserCard />
            <ReleaseSection sectionTitle="Понравившиеся релизы"/>
            <ReleaseSection sectionTitle="Недавние оценки"/>
        </div>
    )
}