import {Header} from "../widgets/Header";
import {UserCard} from "../entities/UserCard";
import {ReleaseSection} from "../widgets/ReleaseSection";

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