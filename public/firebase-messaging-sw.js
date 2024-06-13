importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: import.meta.env.VITE_F_API_KEY,
  authDomain: import.meta.env.VITE_F_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_F_PROJECT_ID,
  storageBucket: import.meta.env.VITE_F_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_F_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_F_APP_ID,
  measurementId: import.meta.env.VITE_F_MEASUREMENT_ID,
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
