import { userOtpResend, userOtpVerify } from "@/api/user";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState,KeyboardEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface UserType {
  userType?: string;
  closeOtp: () => void;
}
const OtpPage: React.FC<UserType> = ({ userType, closeOtp }) => {

  const navigate=useNavigate()
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(120); //2minutes in seconds
  const inputRefs = useRef<HTMLInputElement[]>([]);


  const handleResendOtp=async ()=>{
    if(userType==='user'){
         const response=await userOtpResend()

         if(response){
            toast.success(response?.data.message)
            setTimer(120)
         }
    }

  }


  useEffect(()=>{

    const interval = setInterval(() => {
        setTimer((prevTimer)=>prevTimer>1?prevTimer-1:0)
    },1000)

    return () => clearInterval(interval);
  },[])
  const otpPageClose = () => {
    closeOtp();
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 1) {
      const updatedOtp = [...otp];

      updatedOtp[index] = value;

      setOtp(updatedOtp);

      if (value.length === 1 && index < 3 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const submitHandler=async (e: FormEvent<HTMLFormElement>)=>{

    e.preventDefault()
    console.log(otp)
   
    const otpValue=otp.join('')

    console.log(otpValue)

    if(userType ==="user"){

        const response = await userOtpVerify(parseInt(otpValue));

        if(response){
            toast.success(response?.data.message)
            navigate('/user-login')
        }

    }




  }

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div>
      <div className="flex flex-col px-4 items-center justify-center min-h-screen">
        <div className="relative w-full rounded-lg shadow-lg bg-white max-w-md">
          <div className="flex justify-end pr-1 pt-1">
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={otpPageClose}
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

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Enter OTP</h1>
            <form onSubmit={submitHandler}>
              <div className="flex justify-center space-x-4">
                {/* Since we're converting to JSX, we'll use static input fields for demonstration. */}

                {otp.map((value, index) => (
                  <input
                    type="text"
                    key={index}
                    ref={(refer) =>
                      (inputRefs.current[index] = refer as HTMLInputElement)
                    }
                    value={value}
                    maxLength={1}
                    className="w-12 h-12 border border-gray-300 rounded-lg text-center text-2xl font-medium"
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded-3xl px-6 py-2 text-xl font-medium uppercase bg-black text-white"
              >
                Submit
              </button>
            </form>
            <div className="text-center mt-4 font-semibold text-sm text-gray-600">
              <div> {`OTP expires in ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</div>
              <div>
                <button onClick={handleResendOtp} className="ml-2 text-blue-500 hover:underline focus:outline-none">
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
