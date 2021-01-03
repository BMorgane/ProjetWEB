/* Fichier JavaScript de la page d'accueil
    Fonctionnement du carrousel
    Remplissage du Hall of fame
*/

//Carrousel
$('.carousel').carousel();

// Hall of Fame
var premier = document.getElementById("premier");
var deuxieme = document.getElementById("deuxieme");
var troisieme = document.getElementById("troisieme");
var quatrieme = document.getElementById("quatrieme");
var cinquieme = document.getElementById("cinquieme");
var sixieme = document.getElementById("sixieme");
var septieme = document.getElementById("septieme");
var huitieme = document.getElementById("huitieme");
var neuvieme = document.getElementById("neuvieme");
var dixieme = document.getElementById("dixieme");
var onzieme = document.getElementById("onzieme");
var douzieme = document.getElementById("douzieme");
var treizieme = document.getElementById("treizieme");
var quatorzieme = document.getElementById("quatorzieme");
var quinzieme = document.getElementById("quinzieme");

// On récupère les lignes prévues aux emplacements des joueurs dans le Hall of Fame
function setHall(){
    $.ajax({
        url: '../../php/joueurs.php',
        type:'GET',
				data: 'tableauScore',
				success: function(data){
          premier.innerHTML = "1    " + data[0].pseudo + " " + data[0].score + " points";
          deuxieme.innerHTML = "2   " + data[1].pseudo + " " + data[1].score + " points";
          troisieme.innerHTML = "3    " + data[2].pseudo + " " + data[2].score + " points";
          quatrieme.innerHTML = "4    " + data[3].pseudo + " " + data[3].score + " points";
          cinquieme.innerHTML = "5    " + data[4].pseudo + " " + data[4].score + " points";
          sixieme.innerHTML = "6    " + data[5].pseudo + " " + data[5].score + " points";
          septieme.innerHTML = "7   " + data[6].pseudo + " " + data[6].score + " points";
          huitieme.innerHTML = "8   " + data[7].pseudo + " " + data[7].score + " points";
          neuvieme.innerHTML = "9   " + data[8].pseudo + " " + data[8].score + " points";
          dixieme.innerHTML = "10   " + data[9].pseudo + " " + data[9].score + " points";
          onzieme.innerHTML = "11   " + data[10].pseudo + " " + data[10].score + " points";
          douzieme.innerHTML = "12  " + data[11].pseudo + " " + data[11].score + " points";
          treizieme.innerHTML = "13   " + data[12].pseudo + " " + data[12].score + " points";
          quatorzieme.innerHTML = "14   " + data[13].pseudo + " " + data[13].score + " points";
          quinzieme.innerHTML = "15   " + data[14].pseudo + " " + data[14].score + " points";
        },
        error:function(){
					console.log("Erreur de la fonction setHall");
        }
       })
}

setHall();
