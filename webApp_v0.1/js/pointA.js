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

function getUserName() {
  username = JSON.parse(sessionStorage.getItem("user"));
}

function checkLogin() {
  if (currentUser === null) {
    alert("Login first, please!");
    window.location = "login.html";
  } else {
    rentBike();
  }
}

function rentBike() {
  const dbRef = ref(db);
  get(child(dbRef, "users/" + username.user)).then((snapshot) => {
    // If the user is using a bike
    if (snapshot.val().rentBike === "ON") {
      if (snapshot.val().firstPoint === "A") {
        update(ref(db, "users/" + username.user), {
          rentBike: "OFF",
        })
          .then(() => {
            alert("Rent finished");
            alert("Point A to Point A");
            window.location.href = "/rentBike.html";
          })
          .catch((error) => {
            alert("Error: " + error);
          });
      }
      if (snapshot.val().firstPoint === "B") {
        update(ref(db, "users/" + username.user), {
          rentBike: "OFF",
        })
          .then(() => {
            alert("Rent finished");
            alert("Point A to Point B");
            window.location.href = "/rentBike.html";
          })
          .catch((error) => {
            alert("Error: " + error);
          });
      }
      if (snapshot.val().firstPoint === "C") {
        update(ref(db, "users/" + username.user), {
          rentBike: "OFF",
        })
          .then(() => {
            alert("Rent finished");
            alert("Point A to Point C");
            window.location.href = "/rentBike.html";
          })
          .catch((error) => {
            alert("Error: " + error);
          });
      }
      //If the user isn't using a bike
    } else {
      update(ref(db, "users/" + username.user), {
        rentBike: "ON",
        firstPoint: "A",
      })
        .then(() => {
          alert("You now can use the bike, please be careful");
          window.location.href = "/rentBike.html";
        })
        .catch((error) => {
          alert("Error: " + error);
        });
    }
  });
}

window.onload = function () {
  getUserName();
  checkLogin();
};
