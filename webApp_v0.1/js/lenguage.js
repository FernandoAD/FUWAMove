let spanish = document.getElementById("spa");
let french = document.getElementById("fre");
let ger = document.getElementById("ger");
let eng = document.getElementById("eng");

function lenSpa() {
  sessionStorage.setItem("len", "spa");
}

function lenFre() {
  sessionStorage.setItem("len", "fre");
}

function lenGer() {
  sessionStorage.setItem("len", "ger");
}

function lenEng() {
  sessionStorage.setItem("len", "eng");
}

spanish.addEventListener("click", lenSpa);
french.addEventListener("click", lenFre);
ger.addEventListener("click", lenGer);
eng.addEventListener("click", lenEng);
