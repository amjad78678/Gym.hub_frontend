const userRoutes = {
  signup: "/sign_up",
  userOtpVerify: "/verify",
  userOtpResend: "/resend_otp",
  userLogin: "/login",
  userLogout: "/logout",
  fetchNearGymList: (
    latitude: number,
    longitude: number,
    page: number,
    search: string,
    sliderValue: number
  ) =>
    `/gym_list?latitude=${latitude}&longitude=${longitude}&page=${page}&search=${search}&sliderValue=${sliderValue}`,
  fetchGymList: "/gym_list_normal",
  fetchGymDetails: (id: string) => `/gym_details/${id}`,
  forgotPassword: "/forgot_password",
  verifyForgotPassword: "/verify_forgot",
  updataPasswordForgot: "/update_password",
  resendForgotOtp: "/resend_forgot_otp",
  addToCart: `/add_to_cart`,
  getCheckoutDetails: `/get_checkout_details`,
  addNewSubscription: `/add_new_subscription`,
  validateCoupon: `/validate_coupon`,
  fetchUserDetails: `/user_details`,
  addMoneyWallet: `/add_money_wallet`,
  fetchSubscriptions: `/fetch_subscriptions`,
  fetchTrainers: (
    page: number,
    search: string,
    sliderValue: number,
    experience: string
  ) =>
    `/fetch_trainers?page=${page}&search=${search}&sliderValue=${sliderValue}&experience=${experience}`,
  bookTrainer: `/book_trainer`,
  fetchBookedTrainers: `/fetch_booked_trainers`,
  userChatCreate: "/chat/create",
  fetchUserChatMessages: (senderId: string | null, receiverId: string | null) =>
    `/chat/user_chat_data/${senderId}/${receiverId}`,
  fetchTrainerData: (trainerId: string | null) =>
    `/trainer_details/${trainerId}`,
  editProfile: "/edit_profile",
  isReviewPossible: (gymId: string) => `/is_review_possible/${gymId}`,
  addRatingGym: "/add_review",
  fetchGymReviews: (gymId: string) => `/fetch_gym_reviews/${gymId}`,
  userReviewed: (gymId: string) => `/user_reviewed/${gymId}`,
  updateRating: "/update_rating",
  getWorkoutsBodyList: "/workouts_body_list",
  getWorkoutDetails: (bodyPart: string | null) => `/exercises/${bodyPart}`,
  getBanners: "/fetch_banners",
  uploadChatFiles: "/upload_chat_files",
  fetchMaxPriceGym: "/max_price_gym",
  fetchMaxPriceTrainer: "/max_price_trainer",
  setClientBrowserToken: "/set_client_token",
  sendChatbotMessage: "/send_chatbot_message",
};

export default userRoutes;
