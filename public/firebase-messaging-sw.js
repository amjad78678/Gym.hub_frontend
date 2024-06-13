importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCeW1lTIwAweQjGtGkBf0-isBQ68-9hHYA",
  authDomain: "gymhub-push-notification.firebaseapp.com",
  projectId: "gymhub-push-notification",
  storageBucket: "gymhub-push-notification.appspot.com",
  messagingSenderId: "15808835291",
  appId: "1:15808835291:web:5d8c7e438888643af7a6fe",
  measurementId: "G-D418DK1NY1",
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
