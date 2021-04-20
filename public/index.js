const vorgelagerteNetze = document.querySelector("#vorgelagertesNetz");
const nachgelagerteNetze = document.querySelector("#nachgelagertesNetz");
const lieferketten = document.querySelector("#lieferketten");
const button = document.querySelector("#myButton");

button.addEventListener("click", () => {
   const vNetze = vorgelagerteNetze.value.split("\n");
   const nNetze = nachgelagerteNetze.value.split("\n");

   if (_.last(vNetze) === "") {
      vNetze.pop();
   }
   if (_.last(nNetze) === "") {
      nNetze.pop();
   }

   const original2D = _.zip(vNetze, nNetze);

   const ketteAufsplitten = kette => {
      const kettenende = _.last(kette);

      const neueKettenglieder = original2D.filter(el => el[0] === kettenende);

      if (neueKettenglieder.length) {
         const vorderteilDerKette = _.initial(kette);
         return neueKettenglieder.map(el => vorderteilDerKette.concat(el));
      } else {
         return kette;
      }
   };

   let ergebnis = [];

   const kennensatzAufsplitten = kennensatz => {
      for (const kette of kennensatz) {
         if (_.initial(kette).includes(_.last(kette))) {
            ergebnis.push(kette.concat(["#####  Ringbeziehung  #####"]));
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
