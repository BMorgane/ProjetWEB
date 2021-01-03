// On récupère les élements du formulaire
var form_message = document.getElementById("message");
var email = document.getElementById("email");
var nom = document.getElementById("nom");
var prenom = document.getElementById("prenom");

/* ajoute l’événement au bouton "envoyer" */
form_message.addEventListener('submit', valider);

var champ_nom = form_message.elements["nom"];
var champ_prenom = form_message.elements["prenom"];
var champ_email = form_message.elements["email"];
var regex = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/ ;

function valider (event) {
    // code a exécuter lorsque le formulaire sera validé
    // le formulaire est-il OK?
    var form_OK = true;
     if (regex.exec(champ_email.value) == null || champ_email.value.length == 0) {
        champ_email.classList.add('erreur');
        form_OK = false;
        email.innerHTML = "L'email n'est pas valide.";
    } else{champ_email.classList.remove('erreur');
          email.innerHTML = "";}
        if (champ_prenom.value.length == 0) {
        champ_prenom.classList.add('erreur');
        form_OK = false;
        prenom.innerHTML = "Pas si vite ! Il faut renseigner ton prénom.";
    }else{champ_prenom.classList.remove('erreur');
          prenom.innerHTML = "";}
         if (champ_nom.value.length == 0) {
        champ_nom.classList.add('erreur');
        form_OK = false;
        nom.innerHTML = "Il nous faut votre nom enquêteur.";
    }else{champ_nom.classList.remove('erreur');
          nom.innerHTML = "";}
    // Au final, on empeche l'envoi du formulaire si form_OK est faux
    if(!form_OK){
        event.preventDefault();
        console.log(form_OK);
    } else {
        alert("Ton message a bien été envoyé.\nNous tâchons de te répondre par mail au plus vite !");
        console.log(form_OK)}
}
