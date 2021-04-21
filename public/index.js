const vorgelagerteNetze = document.querySelector("#vorgelagertesNetz");
const nachgelagerteNetze = document.querySelector("#nachgelagertesNetz");
const lieferketten = document.querySelector("#lieferketten");
const startButton = document.querySelector("#startButton");
const trashButton = document.querySelector("#trashButton");

trashButton.addEventListener("click", () => {
   vorgelagerteNetze.value = "";
   nachgelagerteNetze.value = "";
   lieferketten.value = "";
});

startButton.addEventListener("click", () => {
   const vNetze = vorgelagerteNetze.value.split("\n");
   const nNetze = nachgelagerteNetze.value.split("\n");

   if (_.last(vNetze) === "") {
      vNetze.pop();
   }
   if (_.last(nNetze) === "") {
      nNetze.pop();
   }

   const original2D = _.uniqWith(_.zip(vNetze, nNetze), _.isEqual);

   const ketteAufsplitten = kette => {
      const kettenende = _.last(kette);

      const neueKettenglieder = original2D.filter(el => el[0] === kettenende);

      if (neueKettenglieder.length) {
         return neueKettenglieder.map(el => kette.concat(el[1]));
      } else {
         return kette;
      }
   };

   let ergebnis = [];

   const kennensatzAufsplitten = kennensatz => {
      for (const kette of kennensatz) {
         if (_.initial(kette).includes(_.last(kette))) {
            ergebnis.push(kette.concat("#####  Ringbeziehung  #####"));
         } else if (ketteAufsplitten(kette) === kette) {
            ergebnis.push(kette);
         } else {
            kennensatzAufsplitten(ketteAufsplitten(kette));
         }
      }
   };

   kennensatzAufsplitten(original2D);

   const stringErgebnis = ergebnis.map(el => el.join(" => ")).join("\n");

   lieferketten.value = stringErgebnis;
});
