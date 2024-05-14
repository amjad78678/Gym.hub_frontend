import * as Yup from "yup";

export const AddTrainerValidation = Yup.object({
  imageUrl: Yup.mixed()
    .required("Image is required")
    .test("fileSize", "File size must be less than 2MB", (value) => {
      if (!value || !value.size) return true;
      return value.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value || !value.type) return true;
      return (
        value.type === "image/jpeg" ||
        value.type === "image/png" ||
        value.type === "image/jpg"
      );
    }),
  name: Yup.string().required("Name is required"),
  age: Yup.number().typeError("Age must be a number").required("Age is required").positive().integer(),
  gender: Yup.string().required("Gender is required"),
  experience: Yup.number()
    .typeError("Experience must be a number")
    .required("Experience is required"),
  achievements: Yup.string().required("Achievements is required"),
  monthlyFee: Yup.number().typeError("Monthly Fee must be a number").required("Monthly Fee is required"),
  yearlyFee: Yup.number().typeError("Yearly Fee must be a number").required("Yearly Fee is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
