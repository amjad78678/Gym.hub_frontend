import { Paper } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { setImages } from "@/redux/slices/appSlice";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import { gymRegisterGymImagesValidation } from "@/validation/GymRegisterGymImagesValidation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const AddGymImages = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<File[]>([]);

  const handleImageRemove = (index: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  //----------------------------------------------------------------------------
  const [uploadProgress, setUploadProgress] = useState({});
  const preset_key = import.meta.env.VITE_CLOUDINARY_PRESET_KEY;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const uploadImages = async () => {
    setUploadProgress({});
    try {
      const uploadedImages = await Promise.all(
        files.map(async (file, index) => {
          try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", preset_key);

            const res = await axios.post(
              `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload?folder=gymRegisterClient`,
              formData,
              {
                onUploadProgress: (progressEvent: any) => {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  setUploadProgress((prev) => ({
                    ...prev,
                    [index]: percentCompleted,
                  }));
                },
              }
            );

            return {
              imageUrl: res.data.secure_url,
              public_id: res.data.public_id,
            };
          } catch (error) {
            console.error(`Error uploading image ${file.name}:`, error);
            return null;
          }
        })
      );

      const successfulUploads = uploadedImages.filter((img) => img !== null);
      console.log("Successfully uploaded images:", successfulUploads);
      dispatch(setImages(successfulUploads));

      if (successfulUploads.length !== files.length) {
        toast.error(
          `${files.length - successfulUploads.length} images failed to upload.`
        );
      }
    } catch (error) {
      console.error("Error in uploadImages:", error);
    }
  };

  const { status: uploadStatus, mutate: uploadImagesMutation } = useMutation({
    mutationFn: uploadImages,
    onSuccess: (res) => {
      console.log(res);
    },
  });

  useEffect(() => {
    if (files.length > 0) {
      uploadImagesMutation();
    }
  }, [files, dispatch]);

  //------------------------------------------------------------------------
  // useEffect(() => {
  //   if (files.length > 0) {
  //     dispatch(setImages(files));
  //   }
  // }, [files, dispatch]);

  return (
    <div className="min-h-[320px]">
      <Paper
        sx={{
          cursor: "pointer",
          color: "#bdbdbd",
          border: "1px dashed #ccc",
          "&:hover": {
            border: "1px solid #ccc",
          },
        }}
      >
        <Formik
          initialValues={{ files: [] }}
          validationSchema={gymRegisterGymImagesValidation}
          onSubmit={(values) => {
            setFiles(values.files);
          }}
        >
          {({
            setFieldValue,
            errors,
            touched,
            values,
            setErrors,
            submitForm,
            resetForm,
          }) => (
            <>
              <Form>
                <Field name="files">
                  {({ field }) => (
                    <Dropzone
                      accept={{
                        "image/*": [".jpeg", ".png", ".jpg", ".gif"],
                      }}
                      onDrop={(acceptedFiles) => {
                        resetForm(); // Reset form state and errors
                        const newValue = [...acceptedFiles];

                        setFieldValue("files", newValue);
                        if (!errors.files) {
                          setTimeout(() => {
                            submitForm();
                          }, 0);
                        }
                      }}
                    >
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <div className="p-4 bg-black" {...getRootProps()}>
                          <input type="text" {...getInputProps()} />

                          {isDragActive ? (
                            <p className="text-green-500">
                              Drop the files here
                            </p>
                          ) : (
                            <p>
                              Drag and drop exactly 4 images, then only you can
                              finish your registration{" "}
                            </p>
                          )}

                          <em>
                            images with *.jpeg *.png or *.jpg extension will be
                            accepted{" "}
                          </em>
                        </div>
                      )}
                    </Dropzone>
                  )}
                </Field>
              </Form>

              {errors.files && (
                <div className="text-red-500 bg-black font-mono flex justify-center">
                  <div>{errors.files}</div>
                </div>
              )}
            </>
          )}
        </Formik>
      </Paper>

      {files.map((fileObject, index) => (
        <div
          className="w-full lg:w-1/2 "
          key={index}
          style={{ position: "relative", display: "inline-block" }}
        >
          <img
            className="p-5 lg:w-[600px] lg:h-[400px]"
            src={URL.createObjectURL(fileObject)}
            alt="images"
          />

          {/* Progress Overlay */}
          {uploadProgress[index] !== undefined &&
            uploadProgress[index] < 100 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="w-3/4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress[index]}%` }}
                  ></div>
                </div>
                <span className="absolute text-white font-bold">
                  {uploadProgress[index]}%
                </span>
              </div>
            )}

          <button
            className="absolute top-10 right-10 p-1 bg-transparent border-none cursor-pointer"
            onClick={() => handleImageRemove(index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddGymImages;
