import { useFormik } from "formik";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GymSignupValidation } from "../../../validation/GymSignupValidation";
import { useDispatch } from "react-redux";
import { setDetails } from "@/redux/slices/appSlice";

const AddDetails = () => {
  const dispatch = useDispatch();
  const initialValues = {
    gymName: "",
    email: "",
    contactNumber: "",
    state: "",
    city: "",
    pincode: "",
    businessId: "",
    password: "",
    confirmPassword: "",
  };

  const { handleChange, handleBlur, values, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: GymSignupValidation,
    onSubmit: async (values) => {
      console.log("val", values);
    },
  });

  return (
    <Container className="min-h-[320px] text-white">
      <form action="">
        <Row>
          <Col xs={6}>
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
          <Col xs={6}>
            <Row>
              <Col xs={6}>
                <div className="my-3">
                  <h1>State</h1>
                  <input
                    type="text"
                    name="state"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                    onChange={(e) => {
                      handleChange(e);

                      if (!errors.state) {
                        dispatch(
                          setDetails({ ...values, state: e.target.value })
                        );
                      }
                    }}
                    autoComplete="off"
                    onBlur={handleBlur}
                    value={values.state}
                  />
                  {errors.state && (
                    <small className="text-red-500">{errors.state}</small>
                  )}
                </div>
              </Col>
              <Col xs={6}>
                <div className="my-3">
                  <h1>City</h1>
                  <input
                    type="text"
                    name="city"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                    onChange={(e) => {
                      handleChange(e);

                      if (!errors.city) {
                        dispatch(
                          setDetails({ ...values, city: e.target.value })
                        );
                      }
                    }}
                    autoComplete="off"
                    onBlur={handleBlur}
                    value={values.city}
                  />
                  {errors.city && (
                    <small className="text-red-500">{errors.city}</small>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <div className="">
                  <h1>Pincode</h1>
                  <input
                    type="text"
                    name="pincode"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                    onChange={(e) => {
                      handleChange(e);

                      if (!errors.pincode) {
                        dispatch(
                          setDetails({ ...values, pincode: e.target.value })
                        );
                      }
                    }}
                    autoComplete="off"
                    onBlur={handleBlur}
                    value={values.pincode}
                  />
                  {errors.pincode && (
                    <small className="text-red-500">{errors.pincode}</small>
                  )}
                </div>
              </Col>
              <Col xs={6}>
                <div className="">
                  <h1>Business Id</h1>
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
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <div className="mt-3">
                  <h1>Password</h1>
                  <input
                    type="text"
                    name="password"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                    onChange={(e) => {
                      handleChange(e);

                      if (!errors.password ) {
                        dispatch(
                          setDetails({ ...values, password: e.target.value })
                        );
                      }
                    }}
                    autoComplete="off"
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && (
                    <small className="text-red-500">{errors.password}</small>
                  )}
                </div>
              </Col>
              <Col xs={6}>
                <div className="mt-3">
                  <h1>Confirm Password</h1>
                  <input
                    type="text"
                    name="confirmPassword"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                    onChange={(e) => {
                      handleChange(e);

                      dispatch(
                        setDetails({
                          ...values,
                          confirmPassword: e.target.value,
                        })
                      );
                    }}
                    autoComplete="off"
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <small className="text-red-500">
                      {errors.confirmPassword}
                    </small>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default AddDetails;
