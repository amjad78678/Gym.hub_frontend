import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import ScrollTop from "./pages/common/ScrollTop";
import { SkeletonTheme } from "react-loading-skeleton";
import { useEffect } from "react";
import {
  getNotificationToken,
  messaging,
} from "./services/notifications/firebase";
import { onMessage } from "firebase/messaging";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setClientBrowserToken } from "./api/user";
import { setTrainerBrowserToken } from "./api/trainer";

function App() {
  const { uLoggedIn, tLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      if (payload?.notification?.body) {
        toast(payload.notification.body);
      }
    });
  }, []);

  const setBrowserToken = async () => {
    try {
      const token = await getNotificationToken();
      if (token) {
        await setClientBrowserToken(token as string);
        await setTrainerBrowserToken(token as string);
        console.log("setted token in db");
      } else {
        console.log("no token getted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        if (Notification.permission !== "granted") {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            setBrowserToken();
          } else {
            console.log("Notification permission denied");
          }
        } else {
          setBrowserToken();
        }
      } catch (error) {
        console.log("Error requesting notification permission:", error);
      }
    };

    if (uLoggedIn) {
      requestNotificationPermission();
    }
  }, [uLoggedIn, tLoggedIn]);

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <BrowserRouter>
          <ScrollTop />
          <AppRouter />
        </BrowserRouter>
      </SkeletonTheme>
    </>
  );
}

export default App;
