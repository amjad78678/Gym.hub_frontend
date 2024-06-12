import * as Yup from "yup";

export const ProfileEditValidation = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobileNumber: Yup.string().matches(/^[0-9]{10}$/, "Invalid mobile number"),
  profilePic: Yup.mixed()
    .nullable()
    .test("fileSize", "File size must be less than 2MB", (value) => {
      if (
        !value ||
        typeof value === "string" ||
        value === null ||
        value === undefined
      )
        return true;
      if (value instanceof File) {
        return value.size <= 2 * 1024 * 1024;
      }
      return false;
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (
        !value ||
        typeof value === "string" ||
        value === null ||
        value === undefined
      )
        return true;
      if (value instanceof File) {
        return (
          value.type === "image/jpeg" ||
          value.type === "image/jpg" ||
          value.type === "image/png"
        );
      }
      return false;
    }),
  oldPassword: Yup.string(),
  newPassword: Yup.string().when("oldPassword", {
    is: (value) => !!value,
    then: (schema) => schema.required("New password is required"),
    otherwise: (schema) => schema,
  }),
  confirmPassword: Yup.string()
    .nullable()
    .when("oldPassword", {
      is: (value) => !!value,
      then: (schema) =>
        schema
          .required("Confirm password is required")
          .oneOf([Yup.ref("newPassword")], "Passwords must match"),
      otherwise: (schema) => schema,
    }),
});
