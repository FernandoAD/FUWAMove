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

const username = document.getElementById("username");
const pass = document.getElementById("password");
const submit = document.getElementById("login");
let lenguage = null;

eventListeners();

function getLenguage() {
  lenguage = sessionStorage.getItem("len");
}

function eventListeners() {
  document.addEventListener("DOMContentLoaded", startApp);
  username.addEventListener("blur", validation);
  pass.addEventListener("blur", validation);
}

function startApp() {
  submit.disabled = true;
  submit.classList.add("cursor-not-allowed", "opacity-50");
}

function authenticateUser() {
  const dbRef = ref(db);

  get(child(dbRef, "users/" + username.value)).then((snapshot) => {
    if (snapshot.exists()) {
      let dbpass = decPass(snapshot.val().password);
      if (dbpass == pass.value) {
        login(snapshot.val());
      } else {
        alert("Incorrect password");
      }
    } else {
      alert("User not found");
    }
  });
}

function validation(e) {
  if (e.target.value.length > 0) {
    const error = document.querySelector("p.error");
    if (error !== null) {
      error.remove();
    }

    e.target.style.borderColor = "green";
  } else {
    e.target.style.borderColor = "red";
    showError("All fields are required");
  }

  if (username.value !== "" && pass.value !== "") {
    submit.disabled = false;
    submit.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function decPass(dbpass) {
  var pass12 = CryptoJS.AES.decrypt(dbpass, pass.value);
  return pass12.toString(CryptoJS.enc.Utf8);
}

function login(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
  getLenguage();
  if (lenguage === "fre") {
    window.location = "profile_fr.html";
  } else if (lenguage === "spa") {
    window.location = "profile_es.html";
  } else if (lenguage === "ger") {
    window.location = "profile_ger.html";
  } else if (lenguage === "eng") {
    window.location = "profile.html";
  } else {
    window.location = "profile.html";
  }
  return false;
}

submit.addEventListener("click", authenticateUser);
