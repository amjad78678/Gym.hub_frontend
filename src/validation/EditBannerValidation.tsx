import * as Yup from "yup";
 
export const EditBannerValidation = Yup.object().shape({
  bannerImage: Yup.mixed()
    .nullable() 
    .test("fileSize", "File size must be less than 2MB", (value) => {
      if (!value || typeof value === "string") return true; // Allow empty file or string
      if (value instanceof File) {
        return value.size <= 3 * 1024 * 1024; // 3MB in bytes
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
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});