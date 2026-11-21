// the list of the 8 activities
const activites = [
  {
    id: "A01",
    titre: "Découverte de la médina",
    lieu: "Nabeul",
    categorie: "Culture",
    duree: "2 h",
    prix: 20,
    description:
      "Cette visite vous emmène dans les ruelles de la médina de Nabeul. Vous découvrez les portes bleues, les petits commerces et l'histoire du quartier. Un guide local répond à toutes vos questions pendant la balade.",
  },
  {
    id: "A02",
    titre: "Atelier d'initiation à la poterie",
    lieu: "Nabeul",
    categorie: "Artisanat",
    duree: "1 h 30",
    prix: 35,
    description:
      "Nabeul est célèbre pour sa poterie traditionnelle. Pendant cet atelier, un artisan vous apprend à façonner l'argile sur un tour. Vous repartez avec les bases du métier et le plaisir d'avoir créé votre propre objet.",
  },
  {
    id: "A03",
    titre: "Parcours découverte de Kerkouane",
    lieu: "Kerkouane",
    categorie: "Culture",
    duree: "2 h 30",
    prix: 30,
    description:
      "Kerkouane est une ancienne cité punique située face à la mer. Vous marchez entre les fondations des maisons et les rues d'origine. Le parcours explique comment vivaient les habitants il y a plus de deux mille ans.",
  },
  {
    id: "A04",
    titre: "Randonnée découverte",
    lieu: "Djebel Abderrahmane",
    categorie: "Nature",
    duree: "3 h",
    prix: 25,
    description:
      "Cette randonnée suit un sentier de montagne bordé de pins. Le rythme est adapté aux débutants et les pauses sont régulières. Au sommet, la vue sur la mer récompense l'effort.",
  },
  {
    id: "A05",
    titre: "Circuit du littoral",
    lieu: "Kélibia",
    categorie: "Nature",
    duree: "3 h",
    prix: 40,
    description:
      "Ce circuit longe la côte de Kélibia entre plages, falaises et port de pêche. Vous visitez les points de vue les plus beaux de la région. La sortie se termine près de la forteresse qui domine la baie.",
  },
  {
    id: "A06",
    titre: "Peinture sur céramique",
    lieu: "Nabeul",
    categorie: "Artisanat",
    duree: "2 h",
    prix: 25,
    description:
      "Dans cet atelier, vous décorez une pièce de céramique avec des pinceaux et des peintures. Vous choisissez vos couleurs et vos motifs, inspirés des décors traditionnels. La pièce est la vôtre à la fin de la séance.",
  },
  {
    id: "A07",
    titre: "Découverte d'un marché local",
    lieu: "Nabeul",
    categorie: "Découverte",
    duree: "1 h 30",
    prix: 15,
    description:
      "Ce moment dans un marché local permet de goûter à l'ambiance de la région. Vous découvrez les épices, les fruits et les poteries exposés sur les étals. Les commerçants vous expliquent leurs produits et leurs habitudes.",
  },
  {
    id: "A08",
    titre: "Promenade photographique",
    lieu: "Hammamet",
    categorie: "Découverte",
    duree: "2 h",
    prix: 30,
    description:
      "Cette promenade à Hammamet est pensée pour les amateurs de photo. Vous apprenez à cadrer la médina, la mer et la lumière de fin de journée. Un accompagnateur vous donne des conseils simples, avec un téléphone ou un appareil.",
  },
];

// the elements we need from the page
const champRecherche = document.getElementById("recherche");
const cartes = document.querySelectorAll("#liste > div");
const boutons = document.querySelectorAll("#filtres button");
const compteur = document.getElementById("compteur");
const messageAucun = document.getElementById("aucun-resultat");

// the category chosen right now, we start with all of them
let categorieChoisie = "Toutes";

// this function shows or hides each card depending on the search and the category
function afficherCartes() {
  const mot = champRecherche.value.toLowerCase();
  let visibles = 0;

  // we go through the 8 cards one by one
  for (let i = 0; i < cartes.length; i++) {
    const activite = activites[i];
    const texte = (activite.titre + " " + activite.lieu).toLowerCase();

    // the card must match the search and the category at the same time
    const motOk = texte.includes(mot);
    const categorieOk =
      categorieChoisie === "Toutes" || activite.categorie === categorieChoisie;

    if (motOk && categorieOk) {
      cartes[i].hidden = false;
      visibles++;
    } else {
      cartes[i].hidden = true;
    }
  }

  // update the counter
  compteur.innerText = visibles;

  // show the message only when nothing matches
  if (visibles === 0) {
    messageAucun.hidden = false;
  } else {
    messageAucun.hidden = true;
  }
}

// every time the visitor types, we refresh the cards
champRecherche.addEventListener("input", afficherCartes);

// every time a filter button is clicked, we save its category and refresh
for (let i = 0; i < boutons.length; i++) {
  boutons[i].addEventListener("click", function () {
    categorieChoisie = boutons[i].getAttribute("data-categorie");
    afficherCartes();
  });
}

// the details part
const boutonsDetails = document.querySelectorAll("#liste button");

// puts the info of the activity number i in the modal
function afficherDetails(i) {
  let activite = activites[i];

  document.getElementById("modalTitre").innerText = activite.titre;
  document.getElementById("modalInfos").innerText =
    activite.lieu + " · " + activite.categorie + " · " + activite.duree;
  document.getElementById("modalDescription").innerText = activite.description;
  document.getElementById("modalPrix").innerText =
    activite.prix + " TND / personne";
}

// each "voir les détails" button sends its own number to the function
for (let i = 0; i < boutonsDetails.length; i++) {
  boutonsDetails[i].addEventListener("click", function () {
    afficherDetails(i);
  });
}
