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
const username = document.getElementById("username");
const adress = document.getElementById("adress");
const pass = document.getElementById("password");
const submit = document.getElementById("register");
const conditions = [".", "#", "$", "[", "]"];

let validUser = false;

const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", startApp);

  firstName.addEventListener("blur", validation);
  lastName.addEventListener("blur", validation);
  email.addEventListener("blur", validation);
  username.addEventListener("blur", userValidation);
  username.addEventListener("blur", validation);
  adress.addEventListener("blur", validation);
  pass.addEventListener("blur", validation);
}

function startApp() {
  submit.disabled = true;
  submit.classList.add("cursor-not-allowed", "opacity-50");
}

function userValidation(e) {
  const result = conditions.some((el) => e.target.value.includes(el));

  if (result == true) {
    showError(
      "Username can´t contain any of this characters: '.' , '#' , '$' , '['  , or ']' "
    );
  } else {
    const error = document.querySelector("p.error");
    if (error !== null) {
      error.remove();
    }
    e.target.style.borderColor = "green";
    validUser = true;
  }
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

  console.log(validUser);
  if (
    er.test(email.value) &&
    firstName.value !== "" &&
    lastName.value !== "" &&
    validUser == true &&
    adress.value !== "" &&
    pass.value !== ""
  ) {
    submit.disabled = false;
    submit.classList.remove("cursor-not-allowed", "opacity-50");
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

function register() {
  const dbRef = ref(db);

  get(child(dbRef, "users/" + username.value)).then((snapshot) => {
    if (snapshot.exists()) {
      alert("Username already registered");
    } else {
      set(ref(db, "users/" + username.value), {
        user: username.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        adress: adress.value,
        password: encryptPass(),
        nowMove: "",
        shortMove: "",
        mediumMove: "",
        largeMove: "",
        placeMon: "",
        timeMon: "",
        placeTue: "",
        timeTue: "",
        placeWen: "",
        timeWen: "",
        placeThu: "",
        timeThu: "",
        placeFri: "",
        timeFri: "",
      })
        .then(() => {
          alert("Succesfully registered");
          window.location.href = "/login.html";
        })
        .catch((error) => {
          alert("Error: " + error);
        });
    }
  });
}

function encryptPass() {
  var pass12 = CryptoJS.AES.encrypt(pass.value, pass.value);
  return pass12.toString();
}

submit.addEventListener("click", register);
