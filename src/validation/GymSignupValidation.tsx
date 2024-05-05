import * as Yup from "yup";

export const GymSignupValidation = Yup.object({



  gymName: Yup.string()
    .required("Gym name is required")
    .min(4, "Gym name must be at least 4 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  contactNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid contact number")
    .required("Contact number is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Invalid pincode")
    .required("Pincode is required"),
  businessId: Yup.string().required("Business ID is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
  .required("Confirm password is required")
  .oneOf([Yup.ref("password")], "Passwords do not match"),
  dailyFee: Yup.string()
    .required("Fee is required")
    .matches(/^[0-9]+$/, "Invalid quarterly fee"),
  monthlyFee: Yup.string()
    .required("Fee is required")
    .matches(/^[0-9]+$/, "Invalid monthly fee"),
  yearlyFee: Yup.string()
    .required("Fee is required")
    .matches(/^[0-9]+$/, "Invalid yearly fee"),
  description: Yup.string().required("Description is required"),
  
});
