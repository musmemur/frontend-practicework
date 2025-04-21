import {Header} from "../widgets/Header";
import {UserCard} from "../entities/UserCard";
import {ReleasesSection} from "../widgets/ReleasesSection";

export const UserPage = () => {
    return(
        <div>
            <Header />
            <UserCard />
            <ReleasesSection sectionTitle="Понравившиеся релизы"/>
            <ReleasesSection sectionTitle="Недавние оценки"/>
        </div>
    )
}