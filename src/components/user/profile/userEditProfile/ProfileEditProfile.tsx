import { editProfile, fetchUserDetails } from "@/api/user";
import { ProfileEditValidation } from "@/validation/ProfileEditValidation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const ProfileEditProfile = ({ selected, setSelected, refetch, userData }) => {
  useEffect(() => {
    setSelected(selected);
  }, []);

  console.log("iam userdata kittunnu .........", userData);
  const [image, setImage] = useState<File | null>(null);
  const { isPending, mutate } = useMutation({
    mutationFn: editProfile,
    onSuccess: (res) => {
      if (res) {
        if (res.data.success) {
          toast.success(res.data.message);
          refetch();
        }
      }
    },
  });

  console.log("iam userdaata", userData);
  return (
    <Formik
      initialValues={{
        username: userData.username,
        email: userData.email,
        mobileNumber: userData.mobileNumber ? userData.mobileNumber : "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        profilePic: null,
      }}
      validationSchema={ProfileEditValidation}
      onSubmit={(values) => {
        console.log("iam formik values", values);

        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("mobileNumber", values.mobileNumber);
        formData.append("oldPassword", values.oldPassword);
        formData.append("password", values.newPassword);
        if (values.profilePic) {
          if (image != null) {
            formData.append("profilePic", image);
          }
          mutate(formData);
        } else {
          mutate(formData);
        }
      }}
    >
      {({ setFieldValue, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col justify-center items-center lg:mx-auto  rounded-md">
            <div className="flex flex-col">
              <div className="grid lg:grid-cols-2">
                <div>
                  <img
                    className="rounded-xl mx-auto object-cover lg:w-2/3"
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : userData.profilePic.imageUrl
                    }
                    alt="Selected Profile Pic"
                  />
                  <input
                    type="file"
                    placeholder="Upload your profile picture"
                    name="profilePic"
                    accept="image/*"
                    className="border w-11/12 mx-auto sm:mx-0 py-1 px-2 border-gray-200 my-2 bg-gray-800 rounded-lg"
                    onChange={(e) => {
                      if (e.currentTarget.files && e.currentTarget.files[0]) {
                        console.log(e.currentTarget.files[0]);
                        setFieldValue("profilePic", e.currentTarget.files[0]);
                        setImage(e.currentTarget.files[0]);
                      }
                    }}
                  />

                  <ErrorMessage
                    name="profilePic"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div>
                  <Field
                    type="text"
                    placeholder="Enter your name"
                    name="username"
                    className=" border  w-11/12 py-1 px-2  sm:mx-0 border-gray-200 my-2 bg-gray-800 rounded-lg "
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500"
                  />
                  <Field
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    className=" border w-11/12 py-1 px-2  sm:mx-0 border-gray-200 my-2 bg-gray-800 rounded-lg"
                    readOnly
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                  <Field
                    type="text"
                    placeholder="Enter your mobile number"
                    name="mobileNumber"
                    className=" border w-11/12 py-1 px-2  sm:mx-0 border-gray-200 my-2 bg-gray-800 rounded-lg "
                  />
                  <ErrorMessage
                    name="mobileNumber"
                    component="div"
                    className="text-red-500"
                  />
                  <Field
                    type="password"
                    name="oldPassword"
                    placeholder="Enter your old password"
                    className=" border w-11/12 py-1 px-2  sm:mx-0 border-gray-200 my-2 bg-gray-800 rounded-lg "
                  />
                  <ErrorMessage
                    name="oldPassword"
                    component="div"
                    className="text-red-500"
                  />
                  <Field
                    type="password"
                    name="newPassword"
                    placeholder="Enter your new password"
                    className="border w-11/12 py-1 px-2  sm:mx-0 border-gray-200 my-2 bg-gray-800 rounded-lg "
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500"
                  />
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter your confirm new password"
                    className=" border w-11/12 py-1 px-2  sm:mx-0 border-gray-200 my-2 bg-gray-800 rounded-lg "
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className={`relative bg-blue-500  ${
                  isPending ? "opacity-50" : ""
                }  text-white my-2 py-2 px-2 w-11/12 mx-auto sm:mx-0 rounded-lg`}
              >
                <span>{isPending ? "Updating..." : "Update Profile"}</span>
                {isPending && (
                  <span className="absolute right-4">
                    <BeatLoader size={8} color="#ffffff" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileEditProfile;
