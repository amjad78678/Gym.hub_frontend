import * as Yup from "yup";



export const AddCouponValidation = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    discount: Yup.number().required('Discount is required').positive('Discount must be positive').integer('Discount must be an integer'),
    minPrice: Yup.number().required('Minimum price is required').positive('Minimum price must be positive').integer('Minimum price must be an integer'),
    startingDate: Yup.date().required('Start date is required'),
    endingDate: Yup.date().required().min(Yup.ref('startingDate'), 'Ending date must be after starting date'),
  });
  