import { gForgotPassword } from "@/api/gym";
import { tForgotPassword } from "@/api/trainer";
import { forgotPassword } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotEmail = ({user, closeModal,otpShow }) => {

    const [email,setEmail]=useState("")

 
    const {mutate: forgotPassMutation}=useMutation({
        mutationFn:forgotPassword,
        onSuccess:(res)=>{
            console.log('iam kittiyathu',res)
            if(res){
                if(res.data.success){
     
                    closeModal()
                    otpShow()
                    toast.success(res.data.message)

                }
            }
         
        }
    })

    const {mutate: gForgotPassMutation}=useMutation({
      mutationFn:gForgotPassword,
      onSuccess:(res)=>{
          console.log('iam kittiyathu',res)
          if(res){
              if(res.data.success){
   
                  closeModal()
                  otpShow()
                  toast.success(res.data.message)

              }
          }
       
      }
  })

    const {mutate: tForgotPassMutation}=useMutation({
      mutationFn:tForgotPassword,
      onSuccess:(res)=>{
          console.log('iam kittiyathu',res)
          if(res){
              if(res.data.success){
   
                  closeModal()
                  otpShow()
                  toast.success(res.data.message)

              }
          }
       
      }
  })



    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if(user==="user"){

        forgotPassMutation(email)

      }else if(user==="gym"){
        
        gForgotPassMutation(email)
        
      }else if(user==="trainer"){

        tForgotPassMutation(email)

      }

    }

  return (
    <div>
      <main id="content" role="main" className="w-[400px] mx-auto">
        <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800  max-w-2xl dark:border-gray-700">
          <div className="flex justify-end pr-1 pt-1">
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => closeModal()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Remember your password?
                <Link to={"/user-login"}
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  
                >
                  Login here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={submitHandler}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e) =>setEmail(e.target.value)}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        aria-describedby="email-error"
                      />
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                   
                  >
                    Reset password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotEmail;
