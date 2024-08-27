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

  // useEffect(() => {
  //   onMessage(messaging, (payload) => {
  //     if (payload?.notification?.body) {
  //       toast(payload.notification.body);
  //     }
  //   });
  // }, []);

  const setBrowserToken = async () => {
    try {
      const token = await getNotificationToken();
      if (token) {
        const currentPath = window.location.pathname;
        if (currentPath.split("/").includes("trainer")) {
          console.log("iam setting trainer browser token");
          await setTrainerBrowserToken(token as string);
        } else {
          console.log("iam setting user browser token");
          await setClientBrowserToken(token as string);
        }
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        if (Notification.permission !== "granted") {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            setBrowserToken();
          } else {
          }
        } else {
          setBrowserToken();
        }
      } catch (error) {}
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
