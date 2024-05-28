import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfileSkeleton = () => {
    return (
        <div className="pt-32 px-5 md:px-14 xl:px-28 bg-black">
            <div className=" w-full">
                <Skeleton height={100} />
            </div>
            <div className=" w-full mt-10">
                <Skeleton height={100} />
            </div>
            <div className="hidden sm:block">
                <div className="flex gap-20 mt-10 ">
                    <div className="w-1/3 ">
                        <Skeleton height={200}  />
                    </div>
                    <div className="w-full">
                        <Skeleton height={200} />
                    </div>
                </div>
            </div>
            <div className="w-full  mt-10 mb-10 sm:hidden">
                <Skeleton height={150} />
            </div>
            <div className="w-full mt-10 mb-10 sm:hidden">
                <Skeleton height={150} />
            </div>
        </div>
    );
};

export default ProfileSkeleton;
