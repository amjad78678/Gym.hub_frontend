import * as Yup from "yup";

export const ProfileEditValidation = Yup.object().shape({
    username: Yup.string()
        .required("Username is required")
        .min(4, "Username must be at least 4 characters"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    mobileNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Invalid mobile number"),
    profilePic: Yup.mixed()
        .test("fileSize", "File size must be less than 2MB", (value) => {
            if (!value || !value.size) return true;  // Allow empty file
            return value.size <= 2 * 1024 * 1024;   // 2MB in bytes
        })
        .test("fileType", "Unsupported file type", (value) => {
            if (!value || !value.type) return true;  // Allow empty file
            return (
                value.type === "image/jpeg" ||
                value.type === "image/jpg" ||
                value.type === "image/png"
            );
        }),
    oldPassword: Yup.string(),
    newPassword: Yup.string().when('oldPassword', {
        is: (value) => !!value,
        then: (schema) => schema.required('New password is required'),
        otherwise: (schema) => schema
    }),
    confirmPassword: Yup.string().when('oldPassword', {
        is: (value) => !!value,
        then: (schema) => schema
            .required('Confirm password is required')
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
        otherwise: (schema) => schema
    })
});
