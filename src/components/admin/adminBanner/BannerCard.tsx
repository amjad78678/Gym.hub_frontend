import { updateBanner } from "@/api/admin";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
 
const BannerCard = ({banner,handleModal,setSelected,refetch}) => {

  const handleClickEdit=()=>{
    handleModal('edit')
    setSelected(banner)
  }

  const {mutate: deleteBannerMutate}=useMutation({
    mutationFn: updateBanner,
    onSuccess: (res) => {
      if(res){
        if(res?.data.success){
          toast.success(res?.data.message)
          refetch()
        }
      }
    }
  })


  const handleClickRemove=()=>{
    
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${banner.title} banner!`,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, cancel!",
      customClass: {
        container: "custom-swal-container",
      },
      width: 400, 
      background: "#f0f0f0",
      iconHtml: '<i class="bi bi-trash" style="font-size:30px"></i>',
    }).then(async (result) => {
      if (result.isConfirmed) {
          deleteBannerMutate({ id: banner._id, isDeleted: true });
      }
    });
  }
  return (
    <div className=" mb-4 p-2 mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden">
    <div className="bg-gray-900 text-center py-4">
      <h1 className="text-3xl font-bold text-white">{banner.title}</h1>
    </div>
    <div className="p-4">
      <p className="text-gray-300 text-2xl"><strong>Description:</strong> {banner.description}</p>
      <div className="mt-4">
        <img className="w-full" src={banner.bannerImage.imageUrl} alt="Event" />
      </div>
    </div>
    <div className="flex justify-between bg-gray-900 p-4">
      <button onClick={handleClickRemove} className="bg-red-500 text-white px-4 py-2 rounded">Remove</button>
      <button onClick={handleClickEdit} className="bg-orange-500 text-white px-4 py-2 rounded">Edit</button>
    </div>
  </div>
  
  );
};

export default BannerCard;
