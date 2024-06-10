import * as Yup from "yup";

export const chatDropZoneValidation = Yup.object().shape({
  files: Yup.array()
    .required("At least one file is required")
    .of(
      Yup.mixed()
        .test("fileType", "Only images or videos are allowed", (file) => {
          if (!file || typeof file !== "object") return false;
          if ("type" in file) {
            return (
              (file as File).type.startsWith("image/") ||
              (file as File).type.startsWith("video/")
            );
          }
          return false;
        })
        .test("fileSize", "File size exceeds limit", (file) => {
          if (!file || typeof file !== "object") return false;
          if ("type" in file && "size" in file) {
            const maxSizeForVideos = 5 * 1024 * 1024; // 5MB
            if ((file as File).type.startsWith("video/")) {
              return (file as File).size <= maxSizeForVideos;
            }
            if ((file as File).type.startsWith("image/")) {
              return true;
            }
          }
          return false;
        })
    )
    .test("mixedFiles", "Cannot mix images and videos", (value) => {
      const images = value.filter((file) => {
        if (!file || typeof file !== "object") return false;
        return "type" in file && (file as File).type.startsWith("image/");
      });
      const videos = value.filter((file) => {
        if (!file || typeof file !== "object") return false;
        return "type" in file && (file as File).type.startsWith("video/");
      });

      if ((images.length > 0 && videos.length > 0) || videos.length > 1) {
        return false;
      }
      return true;
    })
    .test("maxImages", "You can upload up to 4 images", (value) => {
      const images = value.filter((file) => {
        if (!file || typeof file !== "object") return false;
        return "type" in file && (file as File).type.startsWith("image/");
      });
      return images.length <= 4;
    })
    .test("largeImages", "Some images exceed 1MB", (value) => {
      const images = value.filter((file) => {
        if (!file || typeof file !== "object") return false;
        return "type" in file && (file as File).type.startsWith("image/");
      });
      const largeImages = images.filter((file) => {
        if (!file || typeof file !== "object") return false;
        return "size" in file && (file as File).size > 1024 * 1024;
      });
      return largeImages.length === 0;
    }),
});