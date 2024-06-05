import React from "react";
import * as Yup from "yup";

export const TrainerEditProfileValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Invalid gender")
    .required("Gender is required"),
  age: Yup.number()
    .min(18, "Age must be at least 18")
    .required("Age is required"),
  experience: Yup.number()
    .min(0, "Experience cannot be negative")
    .required("Experience is required"),
  achievements: Yup.string(),
  monthlyFee: Yup.number()
    .min(0, "Monthly fee cannot be negative")
    .required("Monthly fee is required"),
  yearlyFee: Yup.number()
    .min(0, "Yearly fee cannot be negative")
    .required("Yearly fee is required"),
  image: Yup.mixed()
    .test("fileSize", "File size is too large", (value) => {
      if (!value || typeof value === "string") {
        return true;
      }

      return value.size <= 5 * 1024 * 1024; // 5 MB
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value || typeof value === "string") {
        return true;
      }

      const supportedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      return supportedTypes.includes(value.type);
    }).nullable(),
});
