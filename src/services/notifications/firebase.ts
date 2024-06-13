import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
const VAPID_KEY = import.meta.env.VITE_F_VAPID_KEY;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_F_API_KEY,
  authDomain: import.meta.env.VITE_F_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_F_PROJECT_ID,
  storageBucket: import.meta.env.VITE_F_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_F_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_F_APP_ID,
  measurementId: import.meta.env.VITE_F_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const getNotificationToken = async () => {
  const permission = await Notification.requestPermission();
  console.log("perm", permission);
  if (permission === "granted") {
    const token = await getToken(messaging, { vapidKey: VAPID_KEY })
      .then(async (currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          return currentToken;
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
          return null;
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        return null;
      });

    console.log("token", token);
    return token;
  }
};
