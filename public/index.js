const vorgelagerteNetze = document.querySelector("#vorgelagertesNetz");

vorgelagerteNetze.addEventListener("change", () => {
   console.log(vorgelagerteNetze.value.split("\n"));
});
