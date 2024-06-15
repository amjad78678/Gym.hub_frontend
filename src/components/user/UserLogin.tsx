import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import userlogin from "../../assets/userlogin.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "@/api/user";
import toast from "react-hot-toast";
import Loader from "../common/Loader";
import { setUserDetails, setUserLogin } from "@/redux/slices/authSlice";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { RootState } from "@/redux/store";

const G_PASSWORD = import.meta.env.VITE_GOOGLE_PASSWORD;

interface UserLoginProps {
  showForgotEmail: () => void;
}
const UserLogin: React.FC<UserLoginProps> = ({ showForgotEmail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { uLoggedIn } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (uLoggedIn) {
      navigate("/");
    }
  }, [navigate, uLoggedIn]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const gSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        console.log(res.data);

        const data = {
          email: res.data.email,
          password: G_PASSWORD,
        };

        const response2 = await userLogin(data);
        if (response2) {
          dispatch(setUserLogin());
          dispatch(
            setUserDetails({
              name: response2.data.message.username,
              profilePic: response2.data.message.profilePic.imageUrl,
              userId: response2.data.message._id,
            })
          );
          toast.success("Successfully logined");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      toast.error("Please enter email and password");
      return;
    }

    const data = { email, password };
    userLoginMutate(data);
  };

  const { status: userLoginStatus, mutate: userLoginMutate } = useMutation({
    mutationFn: userLogin,
    onSuccess: (response) => {
      if (response) {
        navigate("/");
        console.log("iam response in mutation", response);

        const data = {
          name: response.data.message.username,
          profilePic: response.data.message.profilePic.imageUrl,
          userId: response.data.message._id,
        };

        dispatch(setUserLogin());
        dispatch(setUserDetails(data));
      }
    },
  });

  return (
    <div className="h-3/4">
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 text-white bg-black">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto lg:mb-36 xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h1 className="text-xl pb-4">
                Welcome back! Please enter your details.
              </h1>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                Sign in
              </h2>

              <form onSubmit={submitHandler}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="" className="text-base font-medium ">
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        id="email"
                        value={email}
                        onChange={inputHandler}
                        placeholder="Email"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="" className="text-base font-medium">
                        {" "}
                        Password{" "}
                      </label>
                      <a
                        onClick={() => showForgotEmail()}
                        title=""
                        className="text-sm font-semibold text-blue-500 hover:underline"
                      >
                        {" "}
                        Forgot password?{" "}
                      </a>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        id="password"
                        value={password}
                        onChange={inputHandler}
                        placeholder="Password"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-red-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-red-700"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-3 space-y-3">
                <button className="inline-flex w-full items-center justify-center rounded-md  font-semibold leading-7 text-white">
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-red-700"
                    onClick={() => gSignIn()}
                  >
                    Login with Google{" "}
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
                  Dont have an account?{" "}
                  <span className="text-red-500">
                    <Link to={"/user-register"}>Signup for free</Link>
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <img
              className="mx-auto h-3.5/4 w-3.5/4  rounded-md object-cover"
              src={userlogin}
              alt=""
            />
          </div>
        </div>
      </section>
      {userLoginStatus === "pending" && <Loader />}
    </div>
  );
};

export default UserLogin;
