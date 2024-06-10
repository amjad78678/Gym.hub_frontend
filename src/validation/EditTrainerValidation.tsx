import * as Yup from "yup";

export const EditTrainerValidation = Yup.object({
  imageUrl: Yup.mixed()
    .test("fileSize", "File size must be less than 2MB", (value) => {
      if (!value || typeof value === "string") return true; // Allow empty file or string
      if (value instanceof File) {
        return value.size <= 2 * 1024 * 1024; // 2MB in bytes
      }
      return false; 
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value || typeof value === "string") return true; // Allow empty file or string
      if (value instanceof File) {
        return (
          value.type === "image/jpeg" ||
          value.type === "image/png" ||
          value.type === "image/jpg"
        );
      }
      return false;
    }),
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .required("Age is required")
    .positive()
    .integer(),
  gender: Yup.string().required("Gender is required"),
  experience: Yup.number()
    .typeError("Experience must be a number")
    .required("Experience is required"),
  achievements: Yup.string().required("Achievements is required"),
  monthlyFee: Yup.number()
    .typeError("Monthly Fee must be a number")
    .required("Monthly Fee is required"),
  yearlyFee: Yup.number()
    .typeError("Yearly Fee must be a number")
    .required("Yearly Fee is required"),
});