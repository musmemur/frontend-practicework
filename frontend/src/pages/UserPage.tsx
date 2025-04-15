import {Header} from "../components/Header.tsx";
import {UserCard} from "../components/UserCard.tsx";
import {ReleaseSection} from "../components/ReleaseSection.tsx";

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