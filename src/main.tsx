import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SocketProvider } from "./utils/context/socketContext";
const queryClient = new QueryClient();
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;


if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .catch((error) => {
      console.log(error.message);
    });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Toaster position="top-right" reverseOrder={false} />
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <SocketProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </SocketProvider>
      </Provider>
    </GoogleOAuthProvider>
  </>
);
