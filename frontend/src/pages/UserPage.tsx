import {Header} from "../widgets/Header";
import {UserCard} from "../entities/UserCard";
import {ReleasesSection} from "../widgets/ReleasesSection";

export const UserPage = () => {
    return(
        <div>
            <Header />
            <UserCard />
        </div>
    )
}

// потом надо сделать связь с бэком для получения релизов пользователя
// <ReleasesSection sectionTitle="Понравившиеся релизы"/>
// <ReleasesSection sectionTitle="Недавние оценки"/>