importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDbsMlwD6YPK7r5VvqapQLnCb7IXRzbFw4",
    authDomain: "rise-and-endure.firebaseapp.com",
    projectId: "rise-and-endure",
    storageBucket: "rise-and-endure.appspot.com",
    messagingSenderId: "84377797821",
    appId: "1:84377797821:web:c6ec3c2346c67b3dfc23d4",
    measurementId: "G-GBH3CJ3X8M"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
