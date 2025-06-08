import Skeleton from "react-loading-skeleton";
import styles from './index.module.scss';

const UserCardSkeleton = () => (
    <div className={styles.userCardSkeletonContainer}>
        <div className={styles.userCardSkeleton}>
            <Skeleton circle height={150} width={150} />
            <div className={styles.userCardInfoSkeleton}>
                <Skeleton width={200} height={30} />
                <Skeleton width={50} height={40} />
            </div>
        </div>
    </div>
);

export default UserCardSkeleton;