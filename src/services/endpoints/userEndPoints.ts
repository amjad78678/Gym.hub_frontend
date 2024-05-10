
const userRoutes={
    signup:'/sign_up',
    userOtpVerify:'/verify',
    userOtpResend:'/resend_otp',
    userLogin:'/login',
    userLogout:'/logout',
    fetchNearGymList:(latitude: number,longitude: number)=>`/gym_list?latitude=${latitude}&longitude=${longitude}`,
    fetchGymList: '/gym_list_normal',
    fetchGymDetails:(id: string)=>`/gym_details/${id}`,
    forgotPassword:'/forgot_password',
    verifyForgotPassword:'/verify_forgot',
    updataPasswordForgot:'/update_password',
    resendForgotOtp:'/resend_forgot_otp',
    addToCart:`/add_to_cart`,
    getCheckoutDetails:`/get_checkout_details`,
    addNewSubscription:`/add_new_subscription`,
}

export default userRoutes