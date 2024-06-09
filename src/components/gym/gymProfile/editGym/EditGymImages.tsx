import { IconButton, Paper } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { setImages } from "@/redux/slices/appSlice";
import { useDispatch } from "react-redux";
import {
  Cancel,
  ChangeCircle,
  Filter1,
  Filter2,
  Filter3,
  Filter4,
  Undo,
} from "@mui/icons-material";
import { BeatLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { editImageProfile } from "@/api/gym";
import toast from "react-hot-toast";

const EditGymImages = ({ gym, refetch }) => {
  const [updatedImageFiles, setUpdatedImageFiles] = useState({});

  const handlePreviewImage = (index) => {
    if (updatedImageFiles[index]) {
      return URL.createObjectURL(updatedImageFiles[index]);
    }
    return gym[0].images[index].imageUrl;
  };

  const handleCancelChange = (index) => {
    setUpdatedImageFiles((prevState) => {
      const newState = { ...prevState };
      delete newState[index];
      return newState;
    });
  };

  const { isPending, mutate: imageEditMutation } = useMutation({
    mutationFn: editImageProfile,
    onSuccess: (res) => {
      console.log("success");
      if (res && res.data.success) {
        refetch();
        toast.success(res.data.message);
      }
    },
  });
  const handleSubmit = () => {
    const formData = new FormData();

    gym[0]?.images.forEach((img, index) => {
      if (updatedImageFiles[index]) {
        formData.append("images", updatedImageFiles[index], `image_${index}`);
      }
    });

    imageEditMutation(formData);
  };

  return (
    <div>
      {gym &&
        gym[0].images &&
        gym[0].images.length > 0 &&
        gym[0]?.images.map((img, index) => (
          <>
            <div
              className="w-full lg:w-1/2 mx-auto"
              key={index}
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                className="p-5 lg:w-[600px] lg:h-[400px]"
                src={handlePreviewImage(index)}
                alt="images"
              />
              <div className="w-full inline-flex justify-center">
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    console.log(acceptedFiles, "hamare index", index);
                    setUpdatedImageFiles((prevState) => ({
                      ...prevState,
                      [index]: acceptedFiles[0],
                    }));
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input type="text" {...getInputProps()} />

                      <IconButton>
                        <span>
                          <span className="mt-3">CHANGE</span>
                          <span>
                            <ChangeCircle />
                          </span>
                        </span>
                      </IconButton>
                    </div>
                  )}
                </Dropzone>
                {updatedImageFiles[index] && (
                  <>
                    <IconButton onClick={() => handleCancelChange(index)}>
                      <span>
                        <span className="mt-3">CANCEL</span>
                        <span>
                          <Cancel />
                        </span>
                      </span>
                    </IconButton>
                  </>
                )}
              </div>

              <button className="absolute top-10 right-10 p-1 bg-transparent border-none cursor-pointer">
                <IconButton>
                  {index === 0 ? (
                    <Filter1 sx={{ color: "" }} />
                  ) : index === 1 ? (
                    <Filter2 sx={{ color: "" }} />
                  ) : index === 2 ? (
                    <Filter3 sx={{ color: "" }} />
                  ) : (
                    <Filter4 sx={{ color: "" }} />
                  )}
                </IconButton>
              </button>
            </div>
          </>
        ))}

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          type="submit"
          className="relative my-4 px-14 py-1 rounded-lg  text-black bg-white hover:bg-slate-600"
        >
          <span>{isPending ? "Saving..." : "Save"}</span>
          {isPending && (
            <span className="absolute right-4">
              <BeatLoader color="black" size={7} />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditGymImages;
