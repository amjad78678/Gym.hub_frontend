import userlogin from "../../assets/userlogin.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { UserSignupValidation } from "../../validation/UserSignupValidation";
import axios from "axios";
import { signUp } from "@/api/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails, setUserLogin } from "@/redux/slices/authSlice";

const G_PASSWORD = import.meta.env.VITE_GOOGLE_PASSWORD;

interface UserType {
  setShowOtp: () => void;
}
const UserRegister: React.FC<UserType> = ({ setShowOtp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {uLoggedIn}= useSelector((state)=>state.auth)
  useEffect(()=>{


   if(uLoggedIn){
    navigate('/')
   }


  },[navigate,uLoggedIn])

  
  const gSignup = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
        );

        console.log(res.data);

        const data = {
          username: res.data.name,
          email: res.data.email,
          password: G_PASSWORD,
          isGoogle: true,
          profilePic: res.data.picture,
        };

        const response2 = await signUp(data);
        if (response2) {
          toast.success(response2.data.message);
          dispatch(setUserLogin());
          dispatch(
            setUserDetails({
              name: response2.data.user.username,
              profilePic: response2.data.user.profilePic,
              token: response2.data.token,
            })
          )
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, errors } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        mobilenumber: "",
        age: "",
        password: "",
        confirmpassword: "",
        gender: "",
      },
      validationSchema: UserSignupValidation,
      onSubmit: async (values) => {
        console.log("submitting button");
        if (values.password && !values.confirmpassword) {
          toast.error("Please enter confirm password");
        } else {
          const res = await signUp({
            username: values.username,
            email: values.email,
            mobileNumber: values.mobilenumber,
            age: values.age,
            password: values.password,
            gender: values.gender,
          });

          if (res) {

            if(res.data.status){
              setShowOtp();
            }
            
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
                      <br />

                      <select
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-black border border-white rounded-lg py-2"
                      >
                        <option value="" label="Select a Gender" />
                        <option value="Male" label="Male" />
                        <option value="Female" label="Female" />
                        <option value="Others" label="Others" />
                      </select>
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
                        {errors.age && (
                          <>
                            <small className="text-red-500 float-start">
                              {errors.age}
                            </small>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <div className="flex">
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
                  </div> */}

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
                <button className="inline-flex w-full items-center justify-center rounded-md  font-semibold leading-7 text-white">
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-red-700"
                    onClick={() => gSignup()}
                  >
                    Sign Up with Google{" "}
                    <svg
                      className="ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                  </button>
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
