import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HomeSkeleton = () => {
  return (
    <div className="px-5 md:px-14 xl:px-28 mt-28 mb-20 bg-black">
    <div>
        <Skeleton height={400} />
    </div>
    <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-10  items-center">
        <div className=" w-full sm:w-auto md:w-full shadow lg:w-full  rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
            <div>
                <Skeleton height={240} />
                <div className="p-4 px-7">
                    <Skeleton height={40} />
                    <div className="flex mt-4">
                        <div><Skeleton circle width={20} height={20} /></div>
                        <div className="ml-2"><Skeleton width={100} /></div>
                    </div>
                </div>
                <div className="flex justify-between  ml-4 mr-4 p-2 pl-2 pr-2 rounded-md">
                    <Skeleton width={80} height={20} />
                    <div className="flex items-center">
                        
                        <div className="ml-3"><Skeleton width={80} height={40} /></div>
                    </div>
                </div>
            </div>
        </div>
        <div className=" w-full sm:w-auto md:w-full shadow lg:w-full  rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
            <div>
                <Skeleton height={240} />
                <div className="p-4 px-7">
                    <Skeleton height={40} />
                    <div className="flex mt-4">
                        <div><Skeleton circle width={20} height={20} /></div>
                        <div className="ml-2"><Skeleton width={100} /></div>
                    </div>
                </div>
                <div className="flex justify-between  ml-4 mr-4 p-2 pl-2 pr-2 rounded-md">
                    <Skeleton width={80} height={20} />
                    <div className="flex items-center">
                        
                        <div className="ml-3"><Skeleton width={80} height={40} /></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full sm:w-auto md:w-full shadow lg:w-full  rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
            <div>
                <Skeleton height={240} />
                <div className="p-4 px-7">
                    <Skeleton height={40} />
                    <div className="flex mt-4">
                        <div><Skeleton circle width={20} height={20} /></div>
                        <div className="ml-2"><Skeleton width={100} /></div>
                    </div>
                </div>
                <div className="flex justify-between  ml-4 mr-4 p-2 pl-2 pr-2 rounded-md">
                    <Skeleton width={80} height={20} />
                    <div className="flex items-center">
                        
                        <div className="ml-3"><Skeleton width={80} height={40} /></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
  )
}

export default HomeSkeleton