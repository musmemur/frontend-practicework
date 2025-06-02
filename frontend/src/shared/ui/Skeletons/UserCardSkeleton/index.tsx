import Skeleton from "react-loading-skeleton";
import './index.scss';

const UserCardSkeleton = () => (
    <div className="user-card-skeleton-container" >
        <div className="user-card-skeleton">
            <Skeleton circle height={150} width={150} />
            <div className="user-card-info-skeleton">
                <Skeleton width={200} height={30} />
                <Skeleton width={50} height={40} />
            </div>
        </div>
    </div>
);

export default UserCardSkeleton;