import Skeleton from "react-loading-skeleton";

const ReleasesSectionSkeleton = () => (
    <div style={{ marginBottom: '40px' }}>
        <Skeleton width={250} height={25} style={{ marginBottom: '20px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
            {[...Array(4)].map((_, i) => (
                <div key={i}>
                    <Skeleton height={150} style={{ marginBottom: '10px' }} />
                    <Skeleton width={100} height={20} style={{ marginBottom: '5px' }} />
                    <Skeleton width={80} height={16} />
                </div>
            ))}
        </div>
    </div>
);

export default ReleasesSectionSkeleton;