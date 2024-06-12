import { useFormik } from "formik";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "@/redux/slices/appSlice";
import { GymProfileEditValidation } from "@/validation/GymProfileEditValidation";
import { BeatLoader } from "react-spinners";

const EditGymDetails = ({
  gym,
  setDetails,
  handleSubmitEditDetails,
  isPending,
}) => {
  const initialValues = {
    gymName: gym[0].gymName,
    email: gym[0].email,
    contactNumber: gym[0].contactNumber,
    businessId: gym[0].businessId,
    dailyFee: gym[0].dailyFee,
    monthlyFee: gym[0].monthlyFee,
    yearlyFee: gym[0].yearlyFee,
    description: gym[0].description,
  };

  const { handleChange, handleBlur, values, errors, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: GymProfileEditValidation,
    onSubmit: async (values) => {
      console.log("submitting", values);
      handleSubmitEditDetails(values);
    },
  });

  return (
    <Container className="min-h-[320px] text-white">
      <form onSubmit={handleSubmit} action="">
        <Row>
          <Col lg={6}>
            <div className="my-3">
              <h1>Gym name</h1>
              <input
                type="text"
                name="gymName"
                className="w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                onChange={handleChange}
                autoComplete="off"
                onBlur={handleBlur}
                value={values.gymName}
              />

             {errors.gymName && typeof errors.gymName === 'string' && (
               <small className="text-red-500">{errors.gymName}</small>
             )}
            </div>
            <div className="my-3">
              <h1>Email</h1>
              <input
                disabled
                type="text"
                name="email"
                className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                onChange={handleChange}
                autoComplete="off"
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && typeof errors.email === 'string' && (
                <small className="text-red-500">{errors.email}</small>
              )}
            </div>
            <div className="my-3">
              <h1>Contact number</h1>
              <input
                type="text"
                name="contactNumber"
                className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                onChange={handleChange}
                autoComplete="off"
                onBlur={handleBlur}
                value={values.contactNumber}
              />
              {errors.contactNumber && typeof errors.contactNumber === 'string' && (
                <small className="text-red-500">{errors.contactNumber}</small>
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="my-3">
              <h1>Businesss id</h1>
              <input
                type="text"
                name="businessId"
                className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                onChange={handleChange}
                autoComplete="off"
                onBlur={handleBlur}
                value={values.businessId}
              />
              {errors.businessId && typeof errors.businessId === 'string' && (
                <small className="text-red-500">{errors.businessId}</small>
              )}
            </div>

            <div>
              <h1 className="my-3">Description</h1>

              <Form.Control
                className="bg-black text-white border border-white"
                as="textarea"
                name="description"
                value={values.description}
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Leave a comment here"
                style={{ height: "120px" }}
              />
              {errors.description && typeof errors.description === 'string' && (
                <small className="text-red-500">{errors.description}</small>
              )}
            </div>
          </Col>
        </Row>
        <div className="flex justify-center">
          <button
            disabled={isPending}
            type="submit"
            className="relative my-4 px-14 py-1 rounded-lg bg-white text-black hover:bg-slate-600"
          >
            <span>{isPending ? "Saving..." : "Save"}</span>
            {isPending && (
              <span className="absolute right-4">
                <BeatLoader color="black" size={7} />
              </span>
            )}
          </button>
        </div>
      </form>
    </Container>
  );
};
// nothing

export default EditGymDetails;
