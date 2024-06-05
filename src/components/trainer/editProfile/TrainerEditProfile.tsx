import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TrainerEditProfileValidation } from "@/validation/TrainerEditProfileValidation";
import { useMutation } from "@tanstack/react-query";
import { editProfile } from "@/api/trainer";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const TrainerEditProfile = ({ trainerData, refetch }) => {
  const [previewImage, setPreviewImage] = useState(trainerData.image.imageUrl);
  const initialValues = {
    name: trainerData.name,
    gender: trainerData.gender,
    age: trainerData.age,
    experience: trainerData.experience,
    achievements: trainerData.achievements,
    monthlyFee: trainerData.monthlyFee,
    yearlyFee: trainerData.yearlyFee,
    image: null,
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const { isPending, mutate: editProfileMutate } = useMutation({
    mutationFn: editProfile,
    onSuccess: (res) => {
      if (res) {
        toast.success(res.data.message);
        refetch();
      }
    },
  });

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-11/12 p-12 bg-black text-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        <h1 className="text-4xl text-center font-serif">Edit Profile</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={TrainerEditProfileValidation}
          onSubmit={(values, { setSubmitting }) => {
            try {
              console.log("Values from formik:", values);
              const formData = new FormData();

              formData.append("name", values.name);
              formData.append("gender", values.gender);
              formData.append("age", values.age);
              formData.append("experience", values.experience);
              formData.append("achievements", values.achievements);
              formData.append("monthlyFee", values.monthlyFee);
              formData.append("yearlyFee", values.yearlyFee);

              if (values.image) {
                formData.append("image", values.image);
              }
              editProfileMutate(formData);
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-4">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-full h-44 rounded-lg mx-auto object-contain"
                />
                <label
                  htmlFor="image"
                  className="block mt-2 text-xs font-semibold text-gray-200 uppercase"
                >
                  Update Profile Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  className="block w-full p-3 mt-2 text-gray-200 bg-black border border-white rounded-md appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <label
                htmlFor="name"
                className="block mt-2 text-xs font-semibold text-gray-200 uppercase"
              >
                Name
              </label>
              <Field
                type="text"
                name="name"
                placeholder="Enter new name"
                className="block w-full p-3 mt-2 text-gray-200 bg-black border border-white rounded-md appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs mt-1"
              />

              <label
                htmlFor="gender"
                className="block mt-2 text-xs font-semibold text-gray-200 uppercase"
              >
                Gender
              </label>
              <Field
                as="select"
                name="gender"
                className="block w-full p-3 mt-2 text-gray-200 bg-black border border-white rounded-md appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
              <label
                htmlFor="achievements"
                className="block mt-2 text-xs font-semibold text-gray-200 uppercase"
              >
                Achievements
              </label>
              <Field
                type="text"
                name="achievements"
                placeholder="Enter achievements"
                className="block w-full p-3 mt-2 text-gray-200 bg-black border border-white rounded-md appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              />
              <ErrorMessage
                name="achievements"
                component="div"
                className="text-red-500 text-xs mt-1"
              />

              <div className="grid sm:grid-cols-2 sm:gap-2">
                <div>
                  <label
                    htmlFor="age"
                    className="block mt-2 text-xs font-semibold text-gray-200 uppercase"
                  >
                    Age
                  </label>
                  <Field
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    className="block w-full p-3 mt-2 text-gray-200 bg-black border border-white rounded-md appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="experience"
                    className="block mt-2 text-xs font-semibold text-gray-200 uppercase"
                  >
                    Experience (years)
                  </label>
                  <Field
                    type="number"
                    name="experience"
                    placeholder="Enter experience"
                    className="block w-full p-3 mt-2 text-gray-200 bg-black border border-white rounded-md appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  />
                  <ErrorMessage
                    name="experience"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 sm:gap-2">
                <div>
                  <label
                    htmlFor="monthlyFee"
                    className="block mt-2 text-xs font-semibold text-gray-200 uppercase"
                  >
                    Monthly Fee
                  </label>
                  <Field
                    type="number"
                    name="monthlyFee"
                    placeholder="Enter monthly fee"
                    className="block w-full p-3 mt-2 text-gray-200 bg-black border border-white rounded-md appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  />
                  <ErrorMessage
                    name="monthlyFee"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="yearlyFee"
                    className="block mt-2 text-xs font-semibold text-gray-200 uppercase"
                  >
                    Yearly Fee
                  </label>
                  <Field
                    type="number"
                    name="yearlyFee"
                    placeholder="Enter yearly fee"
                    className="block w-full p-3 mt-2 text-gray-200 bg-black border border-white rounded-md appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  />
                  <ErrorMessage
                    name="yearlyFee"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-3 mt-6 font-medium tracking-widest text-white uppercase ${
                  isPending
                    ? "bg-gray-600 cursor-not-allowed opacity-75"
                    : "bg-gray-700 hover:bg-gray-900 hover:shadow-none"
                } relative flex justify-center rounded-md items-center shadow-lg focus:outline-none`}
              >
                <span>{isPending ? "Updating..." : "Update Profile"}</span>
                {isPending && (
                  <span className="absolute right-4">
                    <BeatLoader size={8} color="#ffffff" />
                  </span>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TrainerEditProfile;
