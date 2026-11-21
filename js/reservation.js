// names and prices of the activities, in the same order as the dropdown
// position 0 is the "choisir une activité" line
let noms = [
  "",
  "Découverte de la médina",
  "Atelier d'initiation à la poterie",
  "Parcours découverte de Kerkouane",
  "Randonnée découverte",
  "Circuit du littoral",
  "Peinture sur céramique",
  "Découverte d'un marché local",
  "Promenade photographique",
];
let prix = [0, 20, 35, 30, 25, 40, 25, 15, 30];

// the elements we need from the page
let selectActivite = document.getElementById("activite");
let champParticipants = document.getElementById("participants");
let boutonCalculer = document.getElementById("btnCalculer");
let boutonReset = document.getElementById("btnReset");
let formulaire = document.getElementById("formReservation");
let zoneErreurs = document.getElementById("erreurs");
let zoneRecap = document.getElementById("recap");

// calculates the price and writes the 4 numbers in the page
function calculer() {
  let position = selectActivite.selectedIndex;
  let prixUnitaire = prix[position];
  let participants = Number(champParticipants.value);

  let sousTotal = prixUnitaire * participants;

  // 10 % discount from 4 people
  let remise = 0;
  if (participants >= 4) {
    remise = sousTotal * 0.1;
  }

  let total = sousTotal - remise;

  document.getElementById("prixUnitaire").innerText = prixUnitaire;
  document.getElementById("sousTotal").innerText = sousTotal;
  document.getElementById("remise").innerText = remise;
  document.getElementById("total").innerText = total;
}

// recalculate when the activity or the number of people changes
selectActivite.addEventListener("change", calculer);
champParticipants.addEventListener("input", calculer);
boutonCalculer.addEventListener("click", calculer);
calculer();

// when the visitor clicks on valider
formulaire.addEventListener("submit", function (event) {
  // stops the page from reloading
  event.preventDefault();
  calculer();

  // we read all the fields
  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let email = document.getElementById("email").value;
  let telephone = document.getElementById("telephone").value;
  let dateValeur = document.getElementById("date").value;
  let participants = Number(champParticipants.value);
  let accepte = document.getElementById("accepte").checked;

  // the text of the errors and how many we found
  let messages = "";
  let nbErreurs = 0;

  // one if for each rule, if it fails we add a line to the messages
  if (nom === "") {
    messages += "<li>Le nom est obligatoire.</li>";
    nbErreurs++;
  }
  if (prenom === "") {
    messages += "<li>Le prénom est obligatoire.</li>";
    nbErreurs++;
  }
  if (email.includes("@") === false || email.includes(".") === false) {
    messages += "<li>L'adresse e-mail n'est pas valide.</li>";
    nbErreurs++;
  }
  if (telephone === "") {
    messages += "<li>Le téléphone est obligatoire.</li>";
    nbErreurs++;
  }
  if (selectActivite.selectedIndex === 0) {
    messages += "<li>Choisissez une activité.</li>";
    nbErreurs++;
  }

  // we add the date
  let aujourdhui = new Date();
  let annee = aujourdhui.getFullYear();
  let mois = aujourdhui.getMonth() + 1;
  let jour = aujourdhui.getDate();
  if (mois < 10) {
    mois = "0" + mois;
  }
  if (jour < 10) {
    jour = "0" + jour;
  }
  let dateAujourdhui = annee + "-" + mois + "-" + jour;

  // then we can compare the two dates
  if (dateValeur === "") {
    messages += "<li>Choisissez une date.</li>";
    nbErreurs++;
  } else if (dateValeur < dateAujourdhui) {
    messages += "<li>La date ne doit pas être dans le passé.</li>";
    nbErreurs++;
  }

  if (Number.isNaN(participants) || participants < 1 || participants > 6) {
    messages += "<li>Le nombre de participants doit être entre 1 et 6.</li>";
    nbErreurs++;
  }
  if (accepte === false) {
    messages += "<li>Vous devez accepter les conditions.</li>";
    nbErreurs++;
  }

  // if there is at least one error we show them, if not we show the recap
  if (nbErreurs > 0) {
    zoneErreurs.innerHTML = "<ul>" + messages + "</ul>";
    zoneErreurs.hidden = false;
    zoneRecap.hidden = true;
  } else {
    document.getElementById("recapActivite").innerText =
      noms[selectActivite.selectedIndex];
    document.getElementById("recapDate").innerText = dateValeur;
    document.getElementById("recapParticipants").innerText = participants;
    document.getElementById("recapTotal").innerText =
      document.getElementById("total").innerText;

    zoneErreurs.hidden = true;
    zoneRecap.hidden = false;
  }
});

// reset button: hide both boxes and put the price back to 0
boutonReset.addEventListener("click", function () {
  zoneErreurs.hidden = true;
  zoneRecap.hidden = true;
  // we wait a tiny bit so the fields are empty before recalculating
  setTimeout(calculer, 0);
});
