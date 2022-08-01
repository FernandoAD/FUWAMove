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

const form = document.getElementById("register-form");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const adress = document.getElementById("adress");
const edit = document.getElementById("edit");
const conditions = [".", "#", "$", "[", "]"];

let username = null;

const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", startApp);

  firstName.addEventListener("blur", validation);
  lastName.addEventListener("blur", validation);
  email.addEventListener("blur", validation);
  adress.addEventListener("blur", validation);
}

function getUserName() {
  username = JSON.parse(sessionStorage.getItem("user"));
}

function startApp() {
  getUserName();
  edit.disabled = true;
  edit.classList.add("cursor-not-allowed", "opacity-50");
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

  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      const error = document.querySelector("p.error");
      if (!error === null) {
        error.remove();
      }
      e.target.style.borderColor = "green";
    } else {
      showError("Invalid email");
    }
  }

  if (
    er.test(email.value) &&
    firstName.value !== "" &&
    lastName.value !== "" &&
    adress.value !== ""
  ) {
    edit.disabled = false;
    edit.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function showError(message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.classList.add("error-p", "error");

  const errores = document.querySelectorAll(".error");

  if (errores.length === 0) {
    form.appendChild(errorMessage);
  }
}

function updateInfo() {
  const dbRef = ref(db);

  get(child(dbRef, "users/" + username.user)).then((snapshot) => {
    update(ref(db, "users/" + username.user), {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      adress: adress.value,
    })
      .then(() => {
        storageUpdate(snapshot.val());
        alert("Succesfully saved");
        window.location.href = "/profile.html";
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  });
}

function storageUpdate(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
}

window.onload = function () {
  const dbRef = ref(db);
  get(child(dbRef, "users/" + username.user)).then((snapshot) => {
    firstName.value = snapshot.val().firstName;
    lastName.value = snapshot.val().lastName;
    email.value = snapshot.val().email;
    adress.value = snapshot.val().adress;
  });
};

edit.addEventListener("click", updateInfo);
