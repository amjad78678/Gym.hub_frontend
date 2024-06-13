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
    icon: "https://res.cloudinary.com/dkxtgziy2/image/upload/v1718292712/1_xc02g4.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  // Open the specified URL when the notification is clicked
  event.waitUntil(clients.openWindow("https://gym-hub-frontend.vercel.app/"));
});
