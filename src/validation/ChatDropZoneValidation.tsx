import * as Yup from "yup";

export const chatDropZoneValidation = Yup.object().shape({
  files: Yup.array()
    .required("At least one file is required")
    .of(
      Yup.mixed()
        .test("fileType", "Only images or videos are allowed", (file) => {
          if (!file) return false;
          return (
            file.type.startsWith("image/") || file.type.startsWith("video/")
          );
        })
        .test("fileSize", "File size exceeds limit", (file) => {
          if (!file) return false;
          const maxSizeForVideos = 5 * 1024 * 1024; // 5MB
          if (file.type.startsWith("video/")) {
            return file.size <= maxSizeForVideos;
          }
          if (file.type.startsWith("image/")) {
            return true;
          }
          return false;
        })
    )
    .test("mixedFiles", "Cannot mix images and videos", (value) => {
      const images = value.filter((file) => file.type.startsWith("image/"));
      const videos = value.filter((file) => file.type.startsWith("video/"));

      if ((images.length > 0 && videos.length > 0) || videos.length > 1) {
        return false;
      }
      return true;
    })
    .test("maxImages", "You can upload up to 4 images", (value) => {
      const images = value.filter((file) => file.type.startsWith("image/"));
      return images.length <= 4;
    })
    .test("largeImages", "Some images exceed 1MB", (value) => {
      const images = value.filter((file) => file.type.startsWith("image/"));
      const largeImages = images.filter((file) => file.size > 1024 * 1024);
      return largeImages.length === 0;
    }),
});
