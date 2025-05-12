import HeaderSkeleton from "../../shared/ui/Skeletons/HeaderSkeleton";
import UserCardSkeleton from "../../shared/ui/Skeletons/UserCardSkeleton";
import ReleasesSectionSkeleton from "../../shared/ui/Skeletons/ReleasesSectionSkeleton";

export const UserPageSkeleton = () => {
    return (
        <>
            <HeaderSkeleton />
            <UserCardSkeleton />
            <ReleasesSectionSkeleton />
            <ReleasesSectionSkeleton />
        </>
    );
}