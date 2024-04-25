import React, { useEffect, useState } from "react";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getGymDetails, gymAdminResponse } from "@/api/admin";
import Loader from "@/components/common/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { blockAdminAction,deleteGym } from "@/api/admin";

const MySwal = withReactContent(Swal);

const Gym = () => {
  const {
    isLoading,
    data: gyms,
    refetch,
  } = useQuery({
    queryKey: ["gyms"],
    queryFn: getGymDetails,
  });


  console.log('gyms',gyms)
  
  const [gymList, setGymList] = useState([]);
  console.log('iamgyms',gymList)

  useEffect(() => {
    if (gyms) {
      setGymList(gyms.data.message);
    }
  }, [gyms]);



  const {status,mutate: DeleteGym}=useMutation({
    mutationFn: deleteGym,
    onSuccess:(data)=>{
      console.log(data)
      refetch()
    }
  })
  const handleDelete = (gymId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {

        await DeleteGym(gymId)


        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };


  const {mutate: handleBlockAction}=useMutation({
    mutationFn: blockAdminAction,
    onSuccess:(data)=>{
      console.log(data)
      refetch()
    }
  })

  const handleApproval = (gymId) => {
    console.log("gymIdappro", gymId);
    MySwal.fire({
      title: "Are you sure you want to verify this gym?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await gymAdminResponse({
          type: "accepted",
          reason: "",
          id: gymId,
        });

        if (response.data.status) {
          toast.success(response?.data.message);
          refetch()
        }

        Swal.fire({
          title: "Confirmed!",
          text: "This gym is verified.",
          icon: "success",
        });
      }
    });
  };

  let reasonInput: HTMLInputElement;
  const handleReject = (gymId) => {
    MySwal.fire({
      title: "Enter Reason for Rejection",
      html: `
              <input type="text" id="reason" class="swal2-input w-3/4" placeholder="Reason for rejection...">
        
            `,
      confirmButtonText: "Submit",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!;
        reasonInput = popup.querySelector("#reason") as HTMLInputElement;
        reasonInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
      },
      preConfirm: async () => {
        const reason = reasonInput.value;
        if (!reason) {
          Swal.showValidationMessage(`Please enter reason then submit`);
          return;
        }
        const response = await gymAdminResponse({
          type: "rejected",
          reason: reason,
          id: gymId,
        });

        if (response.data.status) {
          toast.success(response?.data.message);
          refetch()
        }
      },
    });
  };



  return (
    <div className="mt-4 mx-2">
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Gym name</th>
                <th className="px-4 py-3">Details</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 ">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {/* Repeat the following block for each row */}

              {gymList.map((gym: any) => ( !gym.isDeleted &&

                <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="relative hidden w-24 h-24 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={gym.images[0].imageUrl}
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{gym.gymName}</td>
                  <td className="px-4 py-3 text-sm text-blue-600">
                    View details
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {gym.isVerified ? (
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                        {" "}
                        Approved{" "}
                      </span>
                    ) : (
                      <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                        {" "}
                        Pending{" "}
                      </span>
                    )}
                  </td>
                  {gym.isVerified ? (
                    <td>
                      {gym.isBlocked ? (
                        <Button
                          onClick={() => handleBlockAction(gym._id)}
                          sx={{
                            color: "white",
                            backgroundColor: "green",
                            "&:hover": {
                              backgroundColor: "#4caf50",
                              color: "white",
                            },
                          }}
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleBlockAction(gym._id)}
                          sx={{
                            color: "white",
                            backgroundColor: "red",
                            "&:hover": {
                              backgroundColor: "#cf5557",
                              color: "white",
                            },
                          }}
                        >
                          Block
                        </Button>
                      )}

                      <DeleteOutlineOutlinedIcon
                        onClick={() => handleDelete(gym._id)}
                        sx={{ color: "red", fontSize: "35px" }}
                        className="ms-2"
                      />
                    </td>
                  ) : (
                    <td className="px-4 py-3 text-xs">
                      <span
                        onClick={() => handleReject(gym._id)}
                        className="px-1 cursor-pointer py-1 me-2 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100"
                      >
                        <CancelOutlinedIcon />
                      </span>
                      <span
                        onClick={() => handleApproval(gym._id)}
                        className="px-1 cursor-pointer py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                      >
                        <TaskAltOutlinedIcon />
                      </span>
                    </td>
                  )}
                </tr>
              ))}

              {/* End of row block */}
              {/* Repeat the row block for each row */}
            </tbody>
          </table>
        </div>
        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
          <span className="flex items-center col-span-3">
            {" "}
            Showing 21-30 of 100{" "}
          </span>
          <span className="col-span-2"></span>
          {/* Pagination */}
          <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul className="inline-flex items-center">
                <li>
                  <button
                    className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Previous"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
                {/* Repeat the following block for each page number */}
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    1
                  </button>
                </li>
                {/* End of page number block */}
                {/* Repeat the page number block for each page number */}
                <li>
                  <button
                    className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Next"
                  >
                    <svg
                      className="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      </div>
      {status === "pending" && <Loader />}
    </div>
  );
};

export default Gym;
