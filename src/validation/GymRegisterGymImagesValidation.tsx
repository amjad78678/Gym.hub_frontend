import * as Yup from "yup";

export const gymRegisterGymImagesValidation = Yup.object().shape({
  files: Yup.array()
    .required("At least 4 images are required")
    .test("fileCount", "Exactly 4 images are required", (files) => files?.length === 4)
    .test("totalSize", "Total image size exceeds 9MB", (files) => {
      if (!files || !Array.isArray(files)) return false;
      const totalSize = files.reduce((sum, file) => {
        if (!file || typeof file !== "object" || !("size" in file)) return sum;
        return sum + (file as File).size;
      }, 0);
      
      return totalSize <= 9 * 1024 * 1024; // 9MB
    })
    .of(
      Yup.mixed()
        .test("fileType", "Only images are allowed", (file) => {
          if (!file || typeof file !== "object") return false;
          if ("type" in file) {
            return (file as File).type.startsWith("image/");
          }
          return false;
        })
    )
});