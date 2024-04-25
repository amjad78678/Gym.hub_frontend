import { useMutation } from '@tanstack/react-query';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { adminLogin } from '@/api/admin';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAdminLogin } from '@/redux/slices/authSlice';

const AdminLogin = () => {

    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });

      const navigate=useNavigate()
      const dispatch=useDispatch()

      const { email, password } = formData;
    
      const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };

      const {mutate}=useMutation({
        mutationFn: adminLogin,
        onSuccess:(res)=>{
          toast.success(res.data.message)
          dispatch(setAdminLogin())
          navigate('/admin/dashboard')

        }
      })

      const submitHandler=(e: FormEvent<HTMLFormElement>)=>{

        e.preventDefault()

        if (email.trim().length === 0 || password.trim().length === 0) {
            toast.error('Fields cannot be empty!');
            return;
        }

         mutate(formData)

      }



  return (
    <section>
    <div className="grid grid-cols-1 lg:grid-cols-2 text-white bg-black">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h1 className="text-xl py-4">
          Welcome Admin! Please enter your details.
          </h1>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            Sign in
          </h2>

          <form onSubmit={submitHandler} className="mt-8">
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
                    href="#"
                    title=""
                    className="text-sm font-semibold text-black hover:underline"
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
     
        </div>
      </div>
      <div className="h-full w-full">
        <img
          className="mx-auto h-full w-full rounded-md object-cover"
          src='/adminLogin.jpg'
          alt=""
        />
      </div>
    </div>
  </section>
  )
}

export default AdminLogin