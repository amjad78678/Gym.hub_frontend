import * as Yup from "yup";

export const UserSignupValidation = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),

  mobilenumber: Yup.string()
    .required("Mobile number is required")
    .min(10, "Mobile number must be 10 characters")
    .max(10, "Mobile number must be 10 characters"),

  age: Yup.number()
    .required("Age is required")
    .min(18, "Minimum age is 18")
    .max(55, "Maximum age is 55"),

  state: Yup.string()
    .required("State is required")
    .matches(/^[a-zA-Z\s]+$/, "State must contain only letters"),

  city: Yup.string()
    .required("City is required")
    .matches(/^[a-zA-Z\s]+$/, "City must contain only letters"),

  pincode: Yup.string()
    .required("Pincode is required")
    .min(6, "Pincode must be 6 characters")
    .max(6, "Pincode must be 6 characters"),

  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, and one number"
    ),

  confirmpassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
