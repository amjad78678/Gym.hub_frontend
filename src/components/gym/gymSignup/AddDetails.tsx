import { Field, Form, Formik } from "formik";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GymSignupValidation } from "../../../validation/GymSignupValidation"
import toast from "react-hot-toast";


const AddDetails = () => {
    const initialValues = {
        gymName: "",
        email: "",
        contactNumber: "",
        state: "",
        city:"",
        pincode: "",
        businessId: "",
        password: "",
        confirmPassword:""
      };
  return (
    <Container className="min-h-[320px] text-white">



<Formik
initialValues={initialValues}
validationSchema={GymSignupValidation}
onSubmit={async (values)=>{

    console.log(values)
  

}}
>


{({  touched, errors }) => (
    
      <Form action="">
        <Row>
          <Col xs={6}>
            <div className="my-3">
              <h1>Gym name</h1>
              <Field
                type="text"
                name="gymName"
                className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
              />
                {errors.gymName&&<small className="text-red-500">{errors.gymName}</small>}
            </div>
            <div className="my-3">
              <h1>Email</h1>
              <Field
                type="text"
                name="email"
                className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
              />
                {errors.email&&<small className="text-red-500">{errors.email}</small>}
            </div>
            <div className="my-3">
              <h1>Contact number</h1>
              <Field
                type="text"
                name="contactNumber"
                className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
              />
                {errors.contactNumber&&<small className="text-red-500">{errors.contactNumber}</small>}

            </div>
          </Col>
          <Col xs={6}>
            <Row>
              <Col xs={6}>
                <div className="my-3">
                  <h1>State</h1>
                  <Field
                    type="text"
                    name="state"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                  />
                {errors.state&&<small className="text-red-500">{errors.state}</small>}

                </div>
              </Col>
              <Col xs={6}>
                <div className="my-3">
                  <h1>City</h1>
                  <Field
                    type="text"
                    name="city"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                  />
                {errors.city&&<small className="text-red-500">{errors.city}</small>}

                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <div className="">
                  <h1>Pincode</h1>
                  <Field
                    type="text"
                    name="pincode"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                  />
                {errors.pincode&&<small className="text-red-500">{errors.pincode}</small>}

                </div>
              </Col>
              <Col xs={6}>
                <div className="">
                  <h1>Business Id</h1>
                  <Field
                    type="text"
                    name="businessId"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                  />
                {errors.businessId&&<small className="text-red-500">{errors.businessId}</small>}
                  
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <div className="mt-3">
                  <h1>Password</h1>
                  <Field
                    type="text"
                    name="password"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                  />
                {errors.password&&<small className="text-red-500">{errors.password}</small>}

                </div>
              </Col>
              <Col xs={6}>
                <div className="mt-3">
                  <h1>Confirm Password</h1>
                  <Field
                    type="text"
                    name="confirmPassword"
                    className=" w-full rounded-lg text-white p-1.5 bg-black border border-white my-2"
                  />
                {errors.confirmPassword&&<small className="text-red-500">{errors.confirmPassword}</small>}

                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
)}

      </Formik>
    </Container>
  );
};

export default AddDetails;
