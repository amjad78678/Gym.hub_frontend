import * as Yup from "yup";

export const EditBannerValidation = Yup.object().shape({
  bannerImage: Yup.mixed()
    .nullable(true)
    .test("fileSize", "File size must be less than 2MB", (value) => {
      if (!value || !value.size) return true;
      return value.size <= 3 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value || !value.type) return true;
      return (
        value.type === "image/jpeg" ||
        value.type === "image/png" ||
        value.type === "image/jpg"
      );
    }),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});
