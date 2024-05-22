import { editProfile, fetchUserDetails } from "@/api/user";
import { ProfileEditValidation } from "@/validation/ProfileEditValidation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfileEditProfile = ({ selected, setSelected, refetch, userData }) => {
  useEffect(() => {
    setSelected(selected);
  }, []);


  console.log('iam userdata kittunnu .........',userData)
  const [image, setImage] = useState<File | null>(null);
  const { mutate } = useMutation({
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
    userData && (
      <Formik
        initialValues={{
          username: userData.username,
          email: userData.email,
          mobileNumber: userData.mobileNumber
            ? userData.mobileNumber
            : "",
          profilePic: userData.profilePic,
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
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
            formData.append("profilePic", image);
            mutate(formData);
          } else {
            mutate(formData);
          }
        }}
      >
        {({ setFieldValue, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <div className="w-2/3 flex flex-col justify-center items-center mx-auto  rounded-md">
              <div className="w-2/3 flex flex-col">
                {console.log(errors)}
                <img
                  className="rounded-xl mx-auto object-cover w-1/3"
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
                  className="border py-1 px-2 border-gray-200 my-2 bg-gray-800 rounded-lg"
                  onChange={(e) => {
                    if (e.currentTarget.files[0]) {
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
                <Field
                  type="text"
                  placeholder="Enter your name"
                  name="username"
                  className=" border py-1 px-2 border-gray-200 my-2 bg-gray-800 rounded-lg "
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
                  className=" border py-1 px-2 border-gray-200 my-2 bg-gray-800 rounded-lg"
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
                  className=" border py-1 px-2 border-gray-200 my-2 bg-gray-800 rounded-lg "
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
                  className=" border py-1 px-2 border-gray-200 my-2 bg-gray-800 rounded-lg "
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
                  className=" border py-1 px-2 border-gray-200 my-2 bg-gray-800 rounded-lg "
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
                  className=" border py-1 px-2 border-gray-200 my-2 bg-gray-800 rounded-lg "
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white my-2 py-1 px-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    )
  );
};

export default ProfileEditProfile;
