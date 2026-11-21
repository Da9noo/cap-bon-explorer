let formContact = document.getElementById("formContact");
let confirmation = document.getElementById("confirmationContact");

// we verify we in contact page
if (formContact !== null) {
  formContact.addEventListener("submit", function (event) {
    // stops the page from reloading
    event.preventDefault();
    // shows the confirmation message
    confirmation.hidden = false;
    // reset
    formContact.reset();
  });
}
