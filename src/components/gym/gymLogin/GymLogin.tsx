import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import gymlogin from "../../../assets/gymlogin.png";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { gymLogin } from "@/api/gym";
import { useDispatch, useSelector } from "react-redux"; 
import { setGymLogin } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";

const GymLogin = ({showForgotEmail}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { gLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (gLoggedIn) {
      navigate("/gym/dashboard");
    }
  }, [navigate, gLoggedIn]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.email.trim().length === 0 ||
      formData.password.trim().length === 0
    ) {
      toast.error("Please enter email and password");
      return;
    }

    const data = {
      email: formData.email,
      password: formData.password,
    };

    gymLoginMutate(data);
  };

  const { status, mutate: gymLoginMutate } = useMutation({
    mutationFn: gymLogin,
    onSuccess: (res) => {

      if (res) {
      toast.success(res.data.message);
        navigate("/gym/dashboard");
        const data = {
          name: res.data.gym.gymName,
          gymImage: res.data.gym.images[0].imageUrl,
          token: res.data.token,
        };
        dispatch(setGymLogin(data));
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
                Welcome back! Please enter Gym details.
              </h1>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-gray-300">
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  title=""
                  className="font-semibold text-black transition-all duration-200 hover:underline"
                >
                  Create a free account
                </a>
              </p>
              <form className="mt-8" onSubmit={submitHandler}>
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
                        value={formData.email}
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
                        onClick={showForgotEmail}
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
                        value={formData.password}
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
                <p className="text-sm text-center">
                  Dont have an account?{" "}
                  <span className="text-red-500">
                    <Link to={"/gym/gym-register"}>Signup for free</Link>
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex h-full w-full  justify-center items-center">
            <img
              className="mx-auto h-3/4 w-3/4 rounded-md object-cover"
              src={gymlogin}
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GymLogin;
