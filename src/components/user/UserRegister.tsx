import userlogin from "../../assets/userlogin.png";
import * as React from "react";
import { FormEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";

import { UserSignupValidation } from "../../validation/UserSignupValidation";
import { signUp } from "@/api/user";

const UserRegister = () => {
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        mobilenumber: "",
        age: "",
        state: "",
        city: "",
        pincode: "",
        password: "",
        confirmpassword: "",
      },
      validationSchema: UserSignupValidation,
onSubmit: async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  console.log('submitting button');
  if (values.password && !values.confirmpassword) {
    toast.error("Please enter confirm password");
  } else {
    const res = await signUp({
      username: values.username,
      email: values.email,
      mobilenumber: values.mobilenumber,
      age: values.age,
      state: values.state,
      city: values.city,
      pincode: values.pincode,
      password: values.password,
    });

    if (res) {
      console.log('response', res);
    }
  }
},
    });

  return (
    <div>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 text-white bg-black">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h1 className="text-xl py-4">
                Welcome back! Please enter your details.
              </h1>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                Sign up
              </h2>

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="" className="text-base font-medium ">
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter your username"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                      ></input>
                    </div>
                  </div>
                  {errors.username && (
                    <>
                      <small className="text-red-500 float-start">
                        {errors.username}
                      </small>
                      <br />
                    </>
                  )}
                  <div>
                    <label htmlFor="" className="text-base font-medium ">
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      ></input>
                    </div>
                  </div>
                  {errors.email && (
                    <>
                      <small className="text-red-500 float-start">
                        {errors.email}
                      </small>
                      <br />
                    </>
                  )}
                  <div>
                    <label htmlFor="" className="text-base font-medium ">
                      {" "}
                      Mobile number{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Enter your mobile number"
                        name="mobilenumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.mobilenumber}
                      ></input>
                    </div>
                  </div>

                  {errors.mobilenumber && (
                    <>
                      <small className="text-red-500 float-start">
                        {errors.mobilenumber}
                      </small>
                      <br />
                    </>
                  )}

                  <div className="flex w-full">
                    <div className="w-1/2 inline-block">
                      <label
                        htmlFor=""
                        className="text-base font-medium inline"
                      >
                        Gender
                      </label>
                      <Select>
                        <SelectTrigger className="w-[180px] bg-black">
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-1/2 inline">
                      <label
                        htmlFor=""
                        className="text-base font-medium inline"
                      >
                        Age
                      </label>
                      <div className="">
                        <input
                          className="h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="Age"
                          name="age"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.age}
                        ></input>
                      </div>
                    </div>
                  </div>
                  {errors.age && (
                    <>
                      <small className="text-red-500 float-start">
                        {errors.age}
                      </small>
                      <br />
                      <br />
                    </>
                  )}
              

    <div className="flex">
  <div className="flex flex-col w-1/3">
    <label htmlFor="" className="text-base font-medium">
      State
    </label>
    <input
      type="text"
      placeholder="State"
      className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
      name="state"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.state}
    />
    {errors.state && touched.state && (
      <small className="text-red-500 mt-1">
        {errors.state}
      </small>
    )}
  </div>

  <div className="flex flex-col w-1/3">
    <label htmlFor="" className="text-base font-medium">
      City
    </label>
    <input
      type="text"
      placeholder="City"
      className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
      name="city"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.city}
    />
    {errors.city && touched.city && (
      <small className="text-red-500 mt-1">
        {errors.city}
      </small>
    )}
  </div>

  <div className="flex flex-col w-1/3">
    <label htmlFor="" className="text-base font-medium">
      Pincode
    </label>
    <input
      type="text"
      placeholder="Pincode"
      className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
      name="pincode"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.pincode}
    />
    {errors.pincode && touched.pincode && (
      <small className="text-red-500 mt-1">
        {errors.pincode}
      </small>
    )}
  </div>
</div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="" className="text-base font-medium">
                        Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      ></input>
                    </div>
                  </div>
                  {errors.password && (
                    <>
                      <small className="text-red-500 float-start">
                        {errors.password}
                      </small>
                      <br />
                      <br />
                    </>
                  )}
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="" className="text-base font-medium">
                        {" "}
                        Confirm Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="confirmpassword"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmpassword}
                      ></input>
                    </div>
                  </div>
                  {errors.confirmpassword && (
                    <>
                      <small className="text-red-500 float-start">
                        {errors.confirmpassword}
                      </small>
                      <br />
                    </>
                  )}
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-red-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-red-700"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-3 space-y-3">
                <button
                  type="button"
                  className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-black px-3.5 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                >
                  <span className="mr-2 inline-block">
                    <svg
                      className="h-6 w-6 text-rose-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                  </span>
                  Sign in with Google
                </button>

                <p className="text-sm text-center">
                  Already have an account?{" "}
                  <span className="text-red-500">
                    <Link to={"/user-login"}>Login now</Link>
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full rounded-md object-cover"
              src={userlogin}
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserRegister;
