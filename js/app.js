let formContact = document.getElementById("formContact");
let confirmation = document.getElementById("confirmationContact");

// verifies si on contact page
if (formContact !== null) {
  formContact.addEventListener("submit", function (event) {
    // stops le refresh de la page
    event.preventDefault();
    // affiche le message de confirmation
    confirmation.hidden = false;
    // reset
    formContact.reset();
  });
}
