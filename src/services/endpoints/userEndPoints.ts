
const userRoutes={


    signup:'/user/sign_up',
    userOtpVerify:'/user/verify',
    userOtpResend:'/user/resend_otp',
    userLogin:'/user/login',
    userLogout:'/user/logout',
    fetchGymList:'/user/gym_list',
    fetchGymDetails:(id: string)=>`/user/gym_details/${id}`,
}

export default userRoutes