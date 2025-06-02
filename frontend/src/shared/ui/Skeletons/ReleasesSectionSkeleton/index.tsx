import Skeleton from "react-loading-skeleton";
import './index.scss';

const ReleasesSectionSkeleton = () => (
    <div className="releases-section-skeleton-container">
        <Skeleton className="releases-section-title-skeleton" width={350} height={25} />
        <Skeleton className="releases-skeleton" height={300} />
    </div>
);

export default ReleasesSectionSkeleton;