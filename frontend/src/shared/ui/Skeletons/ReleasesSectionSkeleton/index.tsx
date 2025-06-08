import Skeleton from "react-loading-skeleton";
import styles from './index.module.scss';

const ReleasesSectionSkeleton = () => (
    <div className={styles.releasesSectionSkeletonContainer}>
        <Skeleton className={styles.releasesSectionTitleSkeleton} width={350} height={25} />
        <Skeleton className={styles.releasesSkeleton} height={300} />
    </div>
);

export default ReleasesSectionSkeleton;