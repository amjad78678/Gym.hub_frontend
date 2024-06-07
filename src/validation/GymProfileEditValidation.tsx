import * as Yup from "yup";

export const GymProfileEditValidation = Yup.object({
  gymName: Yup.string()
    .required("Gym name is required")
    .min(4, "Gym name must be at least 4 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  contactNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid contact number")
    .required("Contact number is required"),
  businessId: Yup.string().required("Business ID is required"),
  description: Yup.string().required("Description is required"),
});
