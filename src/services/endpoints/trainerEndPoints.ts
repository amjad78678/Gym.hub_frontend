const trainerRoutes = {
  trainerLogin: "/login",
  trainerLogout: "/logout",
  forgotPassword: "/forgot_password",
  verifyForgotPassword: "/verify_forgot",
  updataPasswordForgot: "/update_password",
  resendForgotOtp: "/resend_forgot_otp",
  fetchAllMessages: "/chat/fetch_messages",
  trainerChatCreate: "/chat/create",
  fetchTrainerChats: ({
    trainerId,
    receiverId,
  }: {
    trainerId: string | null;
    receiverId: string | null;
  }) => `/chat/trainer_chat_data/${trainerId}/${receiverId} `,
  fetchUserData: (id: string) => `/user_details/${id}`,
  fetchSubscriptions: "/fetch_subscriptions",
  fetchTrainerData: "/fetch_trainer_data",
  editProfile: "/edit_profile",
  fetchDashboard: "/fetch_dashboard",
};

export default trainerRoutes;
