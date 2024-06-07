import { useFormik } from "formik";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { GymSignupValidation } from "../../../../validation/GymSignupValidation";
import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "@/redux/slices/appSlice";

const EditGymDetails = ({ gym, setDetails }) => {
  const dispatch = useDispatch();
  const initialValues = {
    gymName: gym[0].gymName,
    email: gym[0].email,
    contactNumber: gym[0].contactNumber,
    businessId: gym[0].businessId,
    dailyFee: gym[0].dailyFee,
    monthlyFee: gym[0].monthlyFee,
    yearlyFee: gym[0].yearlyFee,
    description: gym[0].description,
    password: gym[0].password,
    confirmPassword: gym[0].confirmPassword,
  };

  const { handleChange, handleBlur, values, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: GymSignupValidation,
    onSubmit: async (values) => {
      setDetails(values);
    },
  });

  return (
    <Container className="min-h-[320px] text-white">
      <form action="">
        <Row>
          <Col lg={6}>
            <div className="my-3">
              <h1>Gym name</h1>
              <input
                type="text"
                name="gymName"
                className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                onChange={(e) => {
                  handleChange(e);
                  console.log(errors);
                  if (!errors.gymName) {
                    dispatch(
                      setDetails({ ...values, gymName: e.target.value })
                    );
                  }
                }}
                autoComplete="off"
                onBlur={handleBlur}
                value={values.gymName}
              />

              {errors.gymName && (
                <small className="text-red-500">{errors.gymName}</small>
              )}
            </div>
            <div className="my-3">
              <h1>Email</h1>
              <input
                type="text"
                name="email"
                className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                onChange={(e) => {
                  handleChange(e);

                  if (!errors.email) {
                    dispatch(setDetails({ ...values, email: e.target.value }));
                  }
                }}
                autoComplete="off"
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && (
                <small className="text-red-500">{errors.email}</small>
              )}
            </div>
            <div className="my-3">
              <h1>Contact number</h1>
              <input
                type="text"
                name="contactNumber"
                className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                onChange={(e) => {
                  handleChange(e);

                  if (!errors.contactNumber) {
                    dispatch(
                      setDetails({ ...values, contactNumber: e.target.value })
                    );
                  }
                }}
                autoComplete="off"
                onBlur={handleBlur}
                value={values.contactNumber}
              />
              {errors.contactNumber && (
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
                onChange={(e) => {
                  handleChange(e);

                  if (!errors.businessId) {
                    dispatch(
                      setDetails({ ...values, businessId: e.target.value })
                    );
                  }
                }}
                autoComplete="off"
                onBlur={handleBlur}
                value={values.businessId}
              />
              {errors.businessId && (
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
                onChange={(e) => {
                  handleChange(e);

                  if (!errors.description) {
                    dispatch(
                      setDetails({ ...values, description: e.target.value })
                    );
                  }
                }}
                placeholder="Leave a comment here"
                style={{ height: "120px" }}
              />
              {errors.description && (
                <small className="text-red-500">{errors.description}</small>
              )}
            </div>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default EditGymDetails;
