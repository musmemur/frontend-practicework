import Skeleton from "react-loading-skeleton";

const UserCardSkeleton = () => (
    <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Skeleton circle height={100} width={100} />
            <div style={{ flex: 1 }}>
                <Skeleton width={200} height={30} style={{ marginBottom: '10px' }} />
                <Skeleton width={150} height={20} />
            </div>
        </div>
    </div>
);

export default UserCardSkeleton;