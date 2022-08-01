// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFS7yN8ZsH65yCPtY0xPdpEMRAGpPGLvg",
  authDomain: "fuwa-move-79b1c.firebaseapp.com",
  databaseURL:
    "https://fuwa-move-79b1c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fuwa-move-79b1c",
  storageBucket: "fuwa-move-79b1c.appspot.com",
  messagingSenderId: "91832524823",
  appId: "1:91832524823:web:7be8b1a7f449bb8ec0bc52",
  measurementId: "G-8C96BZ06PB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  set,
  child,
  get,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const db = getDatabase();

let username = null;
let btnOffer = document.getElementById("bike-btn");

function getUserName() {
  username = JSON.parse(sessionStorage.getItem("user"));
}

function offerActive() {
  const dbRef = ref(db);

  get(child(dbRef, "users/" + username.user)).then((snapshot) => {
    update(ref(db, "users/" + username.user), {
      bikeOffer: "ON",
    })
      .then(() => {
        window.location.href = "/rentBike.html";
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  });
}

window.onload = function () {
  getUserName();
};

btnOffer.addEventListener("click", offerActive);
