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

const form = document.getElementById("preferences-form");
const placeMon = document.getElementById("placeMon");
const timeMon = document.getElementById("timeMon");
const placeTue = document.getElementById("placeTue");
const timeTue = document.getElementById("timeTue");
const placeWen = document.getElementById("placeWen");
const timeWen = document.getElementById("timeWen");
const placeThu = document.getElementById("placeThu");
const timeThu = document.getElementById("timeThu");
const placeFri = document.getElementById("placeFri");
const timeFri = document.getElementById("timeFri");
const submit = document.getElementById("savePreferences");
let currentUser = null;

function checkLogin() {
  if (currentUser === null) {
    alert("Login first, please!");
    window.location = "login.html";
  }
}

function getUserName() {
  currentUser = JSON.parse(sessionStorage.getItem("user"));
}

function savePreferences() {
  const dbRef = ref(db);
  let nowMove = document.querySelector('input[name="now-move"]:checked').value;

  let shortMove = document.querySelector(
    'input[name="short-distances"]:checked'
  ).value;

  let mediumMove = document.querySelector(
    'input[name="medium-distances"]:checked'
  ).value;

  let largeMove = document.querySelector(
    'input[name="large-distances"]:checked'
  ).value;

  let username = null;
  let pMon = placeMon.value;
  let tMon = timeMon.value;
  let pTue = placeTue.value;
  let tTue = timeTue.value;
  let pWen = placeWen.value;
  let tWen = timeWen.value;
  let pThu = placeThu.value;
  let tThu = timeThu.value;
  let pFri = placeFri.value;
  let tFri = timeFri.value;

  username = JSON.parse(sessionStorage.getItem("user"));

  get(child(dbRef, "users/" + username.user)).then((snapshot) => {
    update(ref(db, "users/" + username.user), {
      nowMove: nowMove,
      shortMove: shortMove,
      mediumMove: mediumMove,
      largeMove: largeMove,
      placeMon: pMon,
      timeMon: tMon,
      placeTue: pTue,
      timeTue: tTue,
      placeWen: pWen,
      timeWen: tWen,
      placeThu: pThu,
      timeThu: tThu,
      placeFri: pFri,
      timeFri: tFri,
    })
      .then(() => {
        alert("Succesfully saved");
        window.location.href = "/profile.html";
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  });
}

window.onload = function () {
  const dbRef = ref(db);

  getUserName();
  checkLogin();
  console.log(currentUser);
  get(child(dbRef, "users/" + currentUser.user)).then((snapshot) => {
    placeMon.value = snapshot.val().placeMon;
    timeMon.value = snapshot.val().timeMon;
    placeTue.value = snapshot.val().placeTue;
    timeTue.value = snapshot.val().timeTue;
    placeWen.value = snapshot.val().placeWen;
    timeWen.value = snapshot.val().timeWen;
    placeThu.value = snapshot.val().placeThu;
    timeThu.value = snapshot.val().timeThu;
    placeFri.value = snapshot.val().placeFri;
    timeFri.value = snapshot.val().timeFri;
  });
};

submit.addEventListener("click", savePreferences);
