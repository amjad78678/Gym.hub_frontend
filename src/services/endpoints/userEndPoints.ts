import { forgotEmail } from "@/api/user"

const userRoutes={


    signup:'/user/sign_up',
    userOtpVerify:'/user/verify',
    userOtpResend:'/user/resend_otp',
    userLogin:'/user/login',
    userLogout:'/user/logout',
    fetchGymList:'/user/gym_list',
    fetchGymDetails:(id: string)=>`/user/gym_details/${id}`,
    forgotPassword:'/user/forgot_password',
    verifyForgotPassword:'/user/verify_forgot',
    updataPasswordForgot:'/user/update_password',
    resendForgotOtp:'/user/resend_forgot_otp',
    addToCart:`/user/add_to_cart`,
    getCheckoutDetails:`/user/get_checkout_details`,
    addNewSubscription:`/user/add_new_subscription`,
}

export default userRoutes