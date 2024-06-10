import { useFormik } from "formik";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { GymSignupValidation } from "../../../../validation/GymSignupValidation";
import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "@/redux/slices/appSlice";
import { RootState } from "@/redux/store";

const AddDetails = () => {
  const dispatch = useDispatch();
  const { details } = useSelector((state: RootState) => state.app);

  const initialValues = {
    gymName: details.gymName,
    email: details.email,
    contactNumber: details.contactNumber,
    state: details.state,
    city: details.city,
    pincode: details.pincode,
    businessId: details.businessId,
    dailyFee: details.dailyFee,
    monthlyFee: details.monthlyFee,
    yearlyFee: details.yearlyFee,
    description: details.description,
    password: details.password,
    confirmPassword: details.confirmPassword,
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

            <Row>
              <Col lg={6}>
                <div className="mt-1">
                  <h1>Password</h1>
                  <input
                    type="password"
                    name="password"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                    onChange={(e) => {
                      handleChange(e);

                      if (!errors.password) {
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
              <Col lg={6}>
                <div className="mt-1">
                  <h1>Confirm Password</h1>
                  <input
                    type="password"
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

            <Row className="my-3">
              <Col xs={6} lg={4}>
                <div className="">
                  <h1>Daily fee</h1>
                  <input
                    type="text"
                    name="dailyFee"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                    onChange={(e) => {
                      handleChange(e);

                      if (!errors.dailyFee) {
                        dispatch(
                          setDetails({ ...values, dailyFee: e.target.value })
                        );
                      }
                    }}
                    autoComplete="off"
                    onBlur={handleBlur}
                    value={values.dailyFee}
                  />
                  {errors.dailyFee && (
                    <small className="text-red-500">{errors.dailyFee}</small>
                  )}
                </div>
              </Col>
              <Col xs={6} lg={4}>
                <div className="">
                  <h1>Monthly fee</h1>
                  <input
                    type="text"
                    name="monthlyFee"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                    onChange={(e) => {
                      handleChange(e);

                      if (!errors.monthlyFee) {
                        dispatch(
                          setDetails({ ...values, monthlyFee: e.target.value })
                        );
                      }
                    }}
                    autoComplete="off"
                    onBlur={handleBlur}
                    value={values.monthlyFee}   
                  />
                  {errors.monthlyFee && (
                    <small className="text-red-500">{errors.monthlyFee}</small>
                  )}
                </div>
              </Col>
              <Col xs={12} lg={4}>
                <div className="">
                  <h1>Yearly fee</h1>
                  <input
                    type="text"
                    name="yearlyFee"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                    onChange={(e) => {
                      handleChange(e);

                      if (!errors.yearlyFee) {
                        dispatch(
                          setDetails({ ...values, yearlyFee: e.target.value })
                        );
                      }
                    }}
                    autoComplete="off"
                    onBlur={handleBlur}
                    value={values.yearlyFee}
                  />
                  {errors.businessId && (
                    <small className="text-red-500">{errors.yearlyFee}</small>
                  )}
                </div>
              </Col>
            </Row>

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

export default AddDetails;
