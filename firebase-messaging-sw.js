importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');


const firebaseConfig = {
    apiKey: "AIzaSyDI8ufxr-uyh2BEEM3CqtxivtGtW6yONe0",
    authDomain: "work-helper-app.firebaseapp.com",
    projectId: "work-helper-app",
    storageBucket: "work-helper-app.firebasestorage.app",
    messagingSenderId: "17581970290",
    appId: "1:17581970290:web:aea03338ced9c76c6743eb",
    measurementId: "G-1F10L84NKD"
  };
firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()
