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

let currentUser = null;
let lenguage = null;
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let adress = document.getElementById("adress");
let email = document.getElementById("email");
let fuwaMove = document.getElementById("fuwaMove");
let badge = document.getElementById("bg");
let txtBox = document.getElementById("p-txt");
let button = document.getElementById("form-btn");
let bikeRent = document.getElementById("bike-rent");
let bikeOffer = document.getElementById("bike-offer");
let carOffer = document.getElementById("car-offer");
let outButton = document.getElementById("out-btn");

function checkLogin() {
  if (currentUser === null) {
    alert("Login first, please!");
    window.location = "login.html";
  }
}

function getUserName() {
  currentUser = JSON.parse(sessionStorage.getItem("user"));
}

function getLenguage() {
  lenguage = sessionStorage.getItem("len");
}

function reviewPreferences() {
  const dbRef = ref(db);

  get(child(dbRef, "users/" + currentUser.user)).then((snapshot) => {
    if (snapshot.val().nowMove === "") {
      badge.classList.add("bg-warning");
      if (lenguage === "fre") {
        badge.innerHTML =
          "Vous n'avez pas répondu à notre enquête de préférences";
        txtBox.innerHTML =
          "Nous avons besoin de votre aide pour générer un plan de déplacement pour vous et vos besoins. Veuillez répondre à un court sondage";
      } else if (lenguage === "spa") {
        badge.innerHTML = "No has contestado nuestra encuesta de preferencias";
        txtBox.innerHTML =
          "Necesitamos tu ayuda para generar un plan de movimiento para ti y tus necesidades. Por favor responda una breve encuesta";
      } else if (lenguage === "eng") {
        badge.innerHTML = "You have not answered our survey for preferences";
        txtBox.innerHTML =
          "We need your help to generate a movement plan for you and your needs. Please answer a short survey";
      } else if (lenguage === "ger") {
        badge.innerHTML = "Sie haben unsere Präferenzumfrage nicht beantwortet";
        txtBox.innerHTML =
          "Wir brauchen Ihre Hilfe, um einen Bewegungsplan für Sie und Ihre Bedürfnisse zu erstellen. Bitte beantworten Sie eine kurze Umfragepräferenzen";
      } else {
        badge.innerHTML = "You have not answered our survey for preferences";
        txtBox.innerHTML =
          "We need your help to generate a movement plan for you and your needs. Please answer a short survey";
      }
    } else {
      badge.classList.add("bg-success");
      if (lenguage === "fre") {
        badge.innerHTML = "Toutes nos félicitations";
        txtBox.innerHTML =
          "Vous avez répondu à notre enquête, notre équipe FUWA Move travaille pour entrer en contact avec vous et générer votre plan de déménagement.";
      } else if (lenguage === "spa") {
        badge.innerHTML = "Felicidades";
        txtBox.innerHTML =
          "Has respondido nuestra encuesta, nuestro equipo de FUWA Move está trabajando para ponerse en contacto contigo y generar tu plan de mudanza.";
      } else if (lenguage === "eng") {
        badge.innerHTML = "Congratulations";
        txtBox.innerHTML =
          "You have answered our survey, our FUWA Move team is working to get in touch with you and generate your move plan.";
      } else if (lenguage === "ger") {
        badge.innerHTML = "Herzliche Glückwünsche";
        txtBox.innerHTML =
          "Sie haben unsere Umfrage beantwortet, unser FUWA Move-Team arbeitet daran, mit Ihnen in Kontakt zu treten und Ihren Umzugsplan zu erstellen.";
      } else {
        badge.innerHTML = "Congratulations";
        txtBox.innerHTML =
          "You have answered our survey, our FUWA Move team is working to get in touch with you and generate your move plan.";
      }
      button.style.visibility = "hidden";
    }
  });
}

function offerToUser() {
  const dbRef = ref(db);

  get(child(dbRef, "users/" + currentUser.user)).then((snapshot) => {
    if (snapshot.val().bikeOffer === "ON") {
      bikeRent.style.display = "flex";
    } else if (
      snapshot.val().shortMove === "short-bike" ||
      snapshot.val().mediumMove === "medium-bike"
    ) {
      bikeOffer.style.display = "flex";
    } else if (
      snapshot.val().shortMove === "short-car" ||
      snapshot.val().mediumMove === "medium-car"
    ) {
      carOffer.style.display = "flex";
    }
  });
}

function signOut() {
  sessionStorage.removeItem("user");
  window.location = "login.html";
}

window.onload = function () {
  const dbRef = ref(db);

  bikeRent.style.display = "none";
  bikeOffer.style.display = "none";
  carOffer.style.display = "none";

  getUserName();
  checkLogin();

  get(child(dbRef, "users/" + currentUser.user)).then((snapshot) => {
    firstName.innerText = snapshot.val().firstName;
    lastName.innerText = snapshot.val().lastName;
    adress.innerText = snapshot.val().adress;
    email.innerText = snapshot.val().email;

    if (snapshot.val().bikeOffer === "ON") {
      fuwaMove.innerText = "Bike";
    } else {
      fuwaMove.innerText = "Not answered yet";
    }
  });

  getLenguage();

  reviewPreferences();
  offerToUser();
};

outButton.addEventListener("click", signOut);
