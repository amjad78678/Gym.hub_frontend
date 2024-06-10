import { useState } from "react";
import BannerCard from "./BannerCard";
import AddBannerModal from "./AddBannerModal";

const AdminBanner = ({ bannerData, refetch }) => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selected, setSelected] = useState(null);
  const handleModal = (value: string) => {
    setModalType(value);
    setOpen(!open);
  };

  return (
    <>
      <div className="grid grid-cols-12 ">
        <div className="col-span-10 max-h-[80vh] overflow-y-scroll no-scrollbar">
          <div className=" w-full  flex flex-col items-center justify-center">
            {bannerData.map((banner) => (
              <BannerCard
                key={banner._id}
                banner={banner}
                handleModal={handleModal}
                setSelected={setSelected}
                refetch={refetch}
              />
            ))}
          </div>
        </div>
        <div className="col-span-2 mx-auto">
          <button className="btn group mt-2 border-yellow-500 flex items-center bg-transparent p-2 px-6 text-lG font-thin tracking-widest text-white">
            <span
              onClick={() => handleModal("add")}
              className=" relative text-center  pb-1 text-white after:transition-transform after:duration-500 after:ease-out after:absolute after:bottom-0 after:left-0 after:block after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-500 after:content-[''] after:group-hover:origin-bottom-left after:group-hover:scale-x-100"
            >
              ADD BANNER
            </span>
          </button>
        </div>
      </div>

      {open && (
        <AddBannerModal {...{ open, setOpen, refetch, modalType, selected }} />
      )}
    </>
  );
};

export default AdminBanner;
