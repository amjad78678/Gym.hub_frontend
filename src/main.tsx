import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <GoogleOAuthProvider clientId="517088487962-381ms18c3e4okdi43c1sbf8komek0ekb.apps.googleusercontent.com">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
   
          <App />
 
        </QueryClientProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
