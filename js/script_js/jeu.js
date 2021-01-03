/* Fichier JavaScript correspondant au fonctionnement du jeu */

/* Traitement du minuteur
   Lancé pour 45 minutes */

let secondes = 2640;
let sec = 60;
let minuteur = document.getElementById("minuteur");
let temps = document.getElementById("fin");

function maj(){
	secondes = secondes - 1;
	let minutes = Math.trunc(secondes/60) + 1;
	sec = sec - 1;
	if (sec == -1){ sec = 59};
	if (minutes < 0) {
		$("#GameOverModal").modal("show");
		var data = "pseudo=" + pseudo +  "&score=" + score;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "../../php/score.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(data);
		minuteur.innerHTML = "00:00";
	} else {  minuteur.innerHTML = minutes + ":" + sec ; };
  setTimeout(maj, 1000);
}

// Déclenchement du minuteur
maj();
$("#Inscription").modal("show");

// Collecte du Pseudo
function setPseudo(){
			// Sans la particule "var" on rend la variable globale
    	pseudo = $("#pseudo").val();
      Swal.fire({
      icon: 'success',
      title: 'Super ' + pseudo + ' !',
      text: 'tu peux maintenant commencer le jeu',
      })
      $("#Inscription").modal("toggle");
}


// Initialisation de la carte
let map = L.map('mymap').setView([48.84105 , 2.587818], 13);

// Chargement des "tuiles"
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  minZoom: 1,
	maxZoom: 30,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(map);

// On récupère l'élement "indice" pour pouvoir le compléter en fonction des étapes de l'escape game
var indice = document.getElementById("indice");
// On récupère les 6 lignes de la valise pour pouvoir les compléter en fonction des objets collectés
var lunettes = document.getElementById("lunettes");
var clé = document.getElementById("clé");
var lettre = document.getElementById("lettre");
var cassette = document.getElementById("cassette");
var ciseaux = document.getElementById("ciseaux");
var micro = document.getElementById("micro");
var telephone = document.getElementById("telephone");

var score = 0;
var sc = document.getElementById("sc");

var pttzoom = new L.FeatureGroup(); // Contient les makers devant s'effacer à partir d'un certain niveau de zoom
var malle = new L.FeatureGroup(); // Contient les makers caisse devant s'effacer après avoir été ouvertes
map.addLayer(malle);

/* fonctions utiles au fonctionnement du jeu */


// Zone géographique Champs-sur-Marne
// Chargement du marker de début de jeu
// Traitement de l'ouverture de l'enveloppe
// param : map, enveloppe
function setmarker(){
    $.ajax({
        url: '../../php/liste.php',
        type:'GET',
				data: 'tableauObjet',
				success: function(data){
						var Icon = L.icon({
						    iconUrl: data[0].image,
						    iconSize: [data[0].iconLrg, data[0].iconHtr], // size of the icon
						    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
						});
						// Enveloppe
						var m = L.marker([data[0].lat, data[0].lng], {icon: Icon}).on('click', function(e){
              paris();
              map.removeLayer(m);
            }).addTo(map);
        },
        error:function(){
					var m = L.marker([48.895949, 2.387209]).addTo(map);
        }
       })
}

setmarker();


// Zone géographique Paris Nord
// Chargement de la paire de lunettes
// Traitement de la capture des lunettes et de la mise à jour de la valise
// Traitement du déblocage de la lettre et de son agrandissement
// param : map, lettre, lunettes
function paris() {
       $.ajax({
           url: '../../php/liste.php',
           type:'GET',
           data: 'tableauObjet',
           success: function(data){
             var Icon = L.icon({
                 iconUrl: data[1].image,
                 iconSize: [data[1].iconLrg, data[1].iconHtr], // size of the icon
                 iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
             });
						 // Lettre
             var m = L.marker([data[1].lat, data[1].lng], {icon: Icon}).on('click', function(e){
               if (lunettes.innerHTML == data[2].nom){
                   indice.innerHTML = '... ';
                   var Iconz = L.icon({
                       iconUrl: data[1].image,
                       iconSize: [500, 703.85], // size of the icon
                       iconAnchor: [200, 200], // point of the icon which will correspond to marker's location
                   });
									 // Lettre agrandie
                   var z = L.marker([data[1].lat, data[1].lng], {icon: Iconz}).on('click', function(e){map.removeLayer(z)}).addTo(map);
                   indice.innerHTML = "Clique sur la lettre pour la rendre plus petite";
                   }
               else{alert('Récupère la paire de lunettes avant de me lire')};
               // chargement de l'Eurostar
               seteuro();
             }).on('mouseover', function(e){
               indice.innerHTML = data[1].indice;
             }).addTo(map);
             var Iconl = L.icon({
                 iconUrl: data[2].image,
                 iconSize: [data[2].iconLrg, data[2].iconHtr], // size of the icon
                 iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
             });
						 // Lunettes
             var l = L.marker([data[2].lat, data[2].lng], {icon: Iconl}).on('click', function(e){
               lunettes.innerHTML = data[2].nom;
							 setScore();
               indice.innerHTML = data[2].indice;
               // Enlèvement des lunettes lorsque le joueur les récupère
               pttzoom.removeLayer(l);
            });
             pttzoom.addLayer(l);
         },
         error:function(){
           var m = L.marker([48.895949, 2.387209]).addTo(map);
         }
        })
     }


// Zone géographique Paris Gare du Nord
// Chargement de l'eurostar
// Traitement du clique sur l'eurostar et du changement de point de vue vers Londres
// param : map, eurostar
function seteuro(){
    $.ajax({
        url: '../../php/liste.php',
        type:'GET',
        data: 'tableauObjet',
        success: function(data){
            var Icon = L.icon({
                iconUrl: data[3].image,
                iconSize: [data[3].iconLrg, data[3].iconHtr], // size of the icon
                iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
            });
						// Eurostar
            var m = L.marker([data[3].lat, data[3].lng], {icon: Icon}).on('mouseover', function(e){indice.innerHTML = data[3].indice}).on('click', function(e){
              map.setView([51.5333, -0.1333], 13);
                 london();
               });
               pttzoom.addLayer(m);
        },
        error:function(){
          var m = L.marker([48.895949, 2.387209]).addTo(map);
        }
      })
  }


// Zones géographiques Londres et Oxford
// Chargement de la caisse
// Traitement de l'ouverture de la caisse bloquée par les clésu blocage de la caisse bloquée par la clé
// Traitement de la libération de l'indice sur Emma Watson par le clique sur Big Ben
// param : map, caisse, Big Ben, clé
function london(){
  $.ajax({
      url: '../../php/liste.php',
      type:'GET',
      data: 'tableauObjet',
      success: function(data){
          var Icon = L.icon({
              iconUrl: data[4].image,
              iconSize: [data[4].iconLrg, data[4].iconHtr], // size of the icon
              iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
          });
					// Caisse Londres
          var m = L.marker([data[4].lat, data[4].lng], {icon: Icon}).on('mouseover', function(e){indice.innerHTML = data[4].indice}).on('click', function(e){
            if(clé.innerHTML == data[6].nom){
                indice.innerHTML = '...';
                // Une fois les clés récupérées, on ouvre la caisse et on fait apparaître la lettre
                map.removeLayer(m);
                caisse();
                }else{alert('Oh oh, tu n\'as pas les clés')};
          }).addTo(map);
          // Chargement de Big Ben pour délivrer l'indice concernant Emma Watson.
          var Iconb = L.icon({
              iconUrl: data[5].image,
              iconSize: [data[5].iconLrg, data[5].iconHtr], // size of the icon
              iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
          });
					// Big Ben
          var l = L.marker([data[5].lat, data[5].lng], {icon: Iconb}).on('click', function(e){indice.innerHTML = data[5].indice});
          pttzoom.addLayer(l);
          // chargement de la clé au niveau de l'école primaire Dragon School d'Oxford
          var Iconc = L.icon({
              iconUrl: data[6].image,
              iconSize: [data[6].iconLrg, data[6].iconHtr], // size of the icon
              iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
          });
					// Clé
          var k = L.marker([data[6].lat, data[6].lng], {icon: Iconc}).on('click', function(e){
            clé.innerHTML = data[6].nom;
						setScore();
            // Enlèvement des clés lorsque le joueur les récupère
            pttzoom.removeLayer(k);
         });
            pttzoom.addLayer(k);
      },
      error:function(){
        var m = L.marker([48.895949, 2.387209]).addTo(map);
      }
     })
}


// Zone géographique Londres
// Traitement de l'apparition et de la récupération de la lettre à "l'intérieur" de la caisse
// param : map, lettre
function caisse(){
    $.ajax({
        url: '../../php/liste.php',
        type:'GET',
        data: 'tableauObjet',
        success: function(data){
            var Icon = L.icon({
                iconUrl: data[7].image,
                iconSize: [data[7].iconLrg, data[7].iconHtr], // size of the icon
                iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
            });
						// Lettre Londres
            var m = L.marker([data[7].lat, data[7].lng], {icon: Icon}).on('mouseover', function(e){indice.innerHTML = data[7].indice}).on('click', function(e){
              lettre.innerHTML = data[7].nom;
							setScore();
              // Enlèvement de la lettre lorsque le joueur la récupère
              map.removeLayer(m);
           });
            map.addLayer(m);
              // Chargement de l'avion au niveau de l'aéroport
            setavionusa();
        },
        error:function(){
          var m = L.marker([48.895949, 2.387209]).addTo(map);
        }
      })
  }


// Zone géographique Londres Sud Ouest
// Chargement de l'avion Londres -> USA
// Traitement du clique sur l'avion et du changement de point de vue vers les USA
// param : map, avion_USA
function setavionusa(){
  		$.ajax({
  				url: '../../php/liste.php',
  				type:'GET',
  				data: 'tableauObjet',
  				success: function(data){
  						var Icon = L.icon({
  								iconUrl: data[8].image,
  								iconSize: [data[8].iconLrg, data[8].iconHtr], // size of the icon
  								iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
  						});
							// Avion_USA
  						var m = L.marker([data[8].lat, data[8].lng], {icon: Icon}).on('mouseover', function(e){indice.innerHTML = data[8].indice}).on('click', function(e){
  							map.setView([37.090240, -95.712891], 13);
  								 usa();
  							 });
  							 pttzoom.addLayer(m);
  				},
  				error:function(){
  					var m = L.marker([48.895949, 2.387209]).addTo(map);
  				}
  			})
  	}


// Zone geographique USA
// Traitement du code à dechiffrer pour ouvrir la caisse
// Chargement du dictionnaire
// Traitement de l'ouverture du dictionnaire
// Param : string code, map, caisse, dictionnaire
    function usa(){
      		$.ajax({
      				url: '../../php/liste.php',
      				type:'GET',
      				data: 'tableauObjet',
      				success: function(data){
      						var Icon = L.icon({
      								iconUrl: data[9].image,
      								iconSize: [data[9].iconLrg, data[9].iconHtr], // size of the icon
      								iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
      						});
									// Caisse USA_1
      						var m = L.marker([data[9].lat, data[9].lng], {icon: Icon}).on('mouseover', function(e){indice.innerHTML = data[9].indice}).on('click', function(e){
										$("#MichelleModal").modal("show");
									});
									malle.addLayer(m);
                  var Icond = L.icon({
      								iconUrl: data[10].image,
      								iconSize: [data[10].iconLrg, data[10].iconHtr], // size of the icon
      								iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
      						});
									// Dictionnaire fermé
      						var dicf = L.marker([data[10].lat, data[10].lng], {icon: Icond}).on('mouseover', function(e){indice.innerHTML = data[10].indice}).on('click', function(e){
                    var Icono = L.icon({
                        iconUrl: data[11].image,
                        iconSize: [data[11].iconLrg, data[11].iconHtr], // size of the icon
                        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
                    });
										// Dictionaire ouvert
                    var dico = L.marker([data[11].lat, data[11].lng], {icon: Icono}).on('mouseover', function(e){indice.innerHTML = data[11].indice});
                    // On retire le dictionnaire fermé
                    pttzoom.removeLayer(dicf);
                    // On affiche le dictionnaire ouvert
                    pttzoom.addLayer(dico);
                  });
                  pttzoom.addLayer(dicf);
      				},
      				error:function(){
      					var m = L.marker([48.895949, 2.387209]).addTo(map);
      				}
      			})
      	}


// Zone geographique USA
// Chargement de la cassette
// Traitement de la collecte de la cassette
// Param : map, cassette
function ouverture(){
    $.ajax({
        url: '../../php/liste.php',
        type:'GET',
        data: 'tableauObjet',
        success: function(data){
            var Icon = L.icon({
                iconUrl: data[12].image,
                iconSize: [data[12].iconLrg, data[12].iconHtr], // size of the icon
                iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
            });
						// Cassette
            var m = L.marker([data[12].lat, data[12].lng], {icon: Icon}).on('mouseover', function(e){indice.innerHTML = data[12].indice}).on('click', function(e){
              cassette.innerHTML = data[12].nom;
							setScore();
              // Enlèvement de la cassette lorsque le joueur la récupère
              map.removeLayer(m);
							// Chargement de la voiture
							setvoiture();
           });
            map.addLayer(m);
        },
        error:function(){
          var m = L.marker([48.895949, 2.387209]).addTo(map);
        }
      })
  }


// Fonction de vérification du code pour l'ouverture de la caisse USA
/* if success :
			Fenêtre indiquant la réussite
			appel de la fonction ouverture()
			disparition de la Caisse
		if echec :
			Fenêtre indiquant une mauvaise réponse
			retour à l'énigme
*/
// param : string code
function checkCode(){
    var code = $("#codeID").val().toLowerCase();
    if(code == "michelle obama"){
      ouverture();
			malle.clearLayers();
      Swal.fire({
      icon: 'success',
      title: 'Bravo',
      text: 'Il s\'agit bien de Michelle Obama !',
      })
      $("#MichelleModal").modal("toggle");

    } else {
      Swal.fire({
      icon: 'error',
      title: 'Raté',
      text: 'Ce n\‘est pas la bonne identité',
    })
  }
}


// Zone géographique USA Chicago
// Chargement de la voiture Chicago -> Houston
// Traitement du clique sur la voiture et du changement de point de vue vers Houston
// param : map, voiture
function setvoiture(){
			$.ajax({
					url: '../../php/liste.php',
					type:'GET',
					data: 'tableauObjet',
					success: function(data){
							var Icon = L.icon({
									iconUrl: data[13].image,
									iconSize: [data[13].iconLrg, data[13].iconHtr], // size of the icon
									iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
							});
							// Voiture
							var m = L.marker([data[13].lat, data[13].lng], {icon: Icon}).on('mouseover', function(e){indice.innerHTML = data[13].indice}).on('click', function(e){
								map.setView([29.798, -95.398], 13);
									 houston();
								 });
							pttzoom.addLayer(m);
					},
					error:function(){
						var m = L.marker([48.895949, 2.387209]).addTo(map);
					}
				})
		}


// Zone geographique Houton - Texas
// Chargement du cadeau
// Chargement des ciseaux
// Traitement de la récupération des ciseaux
// Param : map, cadeau, ciseaux
function houston(){
	  $.ajax({
	      url: '../../php/liste.php',
	      type:'GET',
	      data: 'tableauObjet',
				success: function(data){
	          var Icon = L.icon({
	              iconUrl: data[14].image,
	              iconSize: [data[14].iconLrg, data[14].iconHtr], // size of the icon
	              iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
	          });
						// Cadeau
	          var m = L.marker([data[14].lat, data[14].lng], {icon: Icon}).on('mouseover', function(e){indice.innerHTML = data[14].indice}).on('click', function(e){
							if(ciseaux.innerHTML == data[15].nom){
								// Le paquet disparaît pour laisser place au micro
								map.removeLayer(m);
								microb();
								indice.innerHTML = "Clique sur le micro et trouve à qu\'il appartient pour pouvoir l\'emmener avec toi";
							}
						}).addTo(map);
						var Iconc = L.icon({
								iconUrl: data[15].image,
								iconSize: [data[15].iconLrg, data[15].iconHtr], // size of the icon
								iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
						});
						// Ciseaux
						var l = L.marker([data[15].lat, data[15].lng], {icon: Iconc}).on('mouseover', function(e){indice.innerHTML = data[15].indice}).on('click', function(e){
							ciseaux.innerHTML = data[15].nom
							setScore();
							map.removeLayer(l);
						});
						pttzoom.addLayer(l);
				},
				error:function(){
					var m = L.marker([48.895949, 2.387209]).addTo(map);
				}
			})
	}


// Zone geographique Houton - Texas
// Chargement du micro
// Traitement du code à dechiffrer pour récupérer le micro
// Param : String code, map, micro
function microb(){
	  $.ajax({
	      url: '../../php/liste.php',
	      type:'GET',
	      data: 'tableauObjet',
	      success: function(data){
	          var Icon = L.icon({
	              iconUrl: data[16].image,
	              iconSize: [data[16].iconLrg, data[16].iconHtr], // size of the icon
	              iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
	          });
						// Micro
	          var m = L.marker([data[16].lat, data[16].lng], {icon: Icon}).on('mouseover', function(e){indice.innerHTML = "..."}).on('click', function(e){
							$("#BeyonceModal").modal("show");});
							malle.addLayer(m);
				},
				error:function(){
					var m = L.marker([48.895949, 2.387209]).addTo(map);
				}
			})
		}


// Fonction de vérification du code pour l'ouverture de la caisse USA
/* if success :
			Fenêtre indiquant la réussite
			appel de la fonction setavionbamako()
			disparition de la Caisse
		if echec :
			Fenêtre indiquant une mauvaise réponse
			retour à l'énigme
*/
// param : string code
function checkCode2(){
			    var code = $("#codeID_2").val().toLowerCase();
			    if((code == "beyonce") || (code == "beyoncé")){
			      Swal.fire({
			      icon: 'success',
			      title: 'Bravo',
			      text: 'Il s\'agit bien de Beyoncé !',
					});
						setavionbamako();
						micro.innerHTML = 'Micro';
						setScore();
						indice.innerHTML = 'Va jusqu\'à l\'aéroport international Hartsfield Jackson d\'Atlanta pour l\'une des dernières étapes.';
						malle.clearLayers();
			      $("#BeyonceModal").modal("toggle");

			    } else {
			      Swal.fire({
			      icon: 'error',
			      title: 'Raté',
			      text: 'Ce n\‘est pas la bonne identité',
			    })
			  }
			}


// Zone géographique Atlanta
// Chargement de l'avion Atlanta -> Bamako
// Traitement du clique sur l'avion et du changement de point de vue vers Bamako
// param : map, avion_Bamako
function setavionbamako(){
  		$.ajax({
  				url: '../../php/liste.php',
  				type:'GET',
  				data: 'tableauObjet',
  				success: function(data){
  						var Icon = L.icon({
  								iconUrl: data[17].image,
  								iconSize: [data[17].iconLrg, data[17].iconHtr], // size of the icon
  								iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
  						});
							// Avion_Bamako
  						var m = L.marker([data[17].lat, data[17].lng], {icon: Icon}).on('mouseover', function(e){indice.innerHTML = data[17].indice}).on('click', function(e){
									map.setView([12.5409, -7.948], 13);
  								bamako();
  							 });
  							 pttzoom.addLayer(m);
  				},
  				error:function(){
  					var m = L.marker([48.895949, 2.387209]).addTo(map);
  				}
  			})
}


// Zone geographique Bamako
// Chargement de la caisse
// Traitement du blocage de son ouverture par un code
// Param : String code, map, caisse
function bamako(){
		$.ajax({
				url: '../../php/liste.php',
				type:'GET',
				data: 'tableauObjet',
				success: function(data){
						var Icon = L.icon({
								iconUrl: data[18].image,
								iconSize: [data[18].iconLrg, data[18].iconHtr], // size of the icon
								iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
						});
						// Caisse Bamako
						var m = L.marker([data[18].lat, data[18].lng], {icon: Icon}).on('mouseover', function(e){indice.innerHTML = data[18].indice}).on('click', function(e){
							$("#AyaModal").modal("show");});
							malle.addLayer(m);
				},
				error:function(){
					var m = L.marker([48.895949, 2.387209]).addTo(map);
				}
			})
	}


// Fonction de vérification du code pour l'ouverture de la caisse Bamako
/* if success :
			Fenêtre indiquant la réussite
			appel de la fonction dernierobjet()
			disparition de la Caisse
		if echec :
			Fenêtre indiquant une mauvaise réponse
			retour à l'énigme
*/
// param : string code
function checkCode3(){
				    var code = $("#codeID_3").val().toLowerCase();
				    if(code == "aya nakamura"){
				      Swal.fire({
				      icon: 'success',
				      title: 'Bravo',
				      text: 'Il s\'agit bien d\‘Aya Nakamura !',
				      })
				      $("#AyaModal").modal("toggle");
							dernierobjet();
							malle.clearLayers();

				    } else {
				      Swal.fire({
				      icon: 'error',
				      title: 'Raté',
				      text: 'Ce n\‘est pas la bonne identité',
				    })
				  }
				}


// Zone geographique Bamako
// Chargement du téléphone
// Traitement de la récupération du télephone
// Param : map, téléphone
function dernierobjet(){
		  $.ajax({
		      url: '../../php/liste.php',
		      type:'GET',
		      data: 'tableauObjet',
		      success: function(data){
		          var Icon = L.icon({
		              iconUrl: data[19].image,
		              iconSize: [data[19].iconLrg, data[19].iconHtr], // size of the icon
		              iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
		          });
							// Téléphone
		          var m = L.marker([data[19].lat, data[19].lng], {icon: Icon}).on('mouseover', function(e){indice.innerHTML = "Clique sur moi pour me récupérer"}).on('click', function(e){
									alert(data[19].indice);
									map.removeLayer(m);
									indice.innerHTML = data[19].indice;
									setScore();
									telephone.innerHTML = data[19].nom;
									setavionallemagne();
								}).addTo(map);
					},
					error:function(){
						var m = L.marker([48.895949, 2.387209]).addTo(map);
					}
				})
		}


// Zone géographique avion_Bamako
// Chargement de l'avion Bamako -> Allemagne
// Traitement du clique sur l'avion et du changement de point de vue vers l'Allemagne
// param : map, avion_Allemagne
function setavionallemagne(){
  		$.ajax({
  				url: '../../php/liste.php',
  				type:'GET',
  				data: 'tableauObjet',
	 				success: function(data){
	 						var Icon = L.icon({
	 								iconUrl: data[17].image,
	 								iconSize: [data[17].iconLrg, data[17].iconHtr], // size of the icon
	 								iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
	 						});
							// Avion_Allemagne
	 						var m = L.marker([data[19].lat, data[19].lng], {icon: Icon}).on('mouseover', function(e){indice.innerHTML = "Direction l\'Allemagne"}).on('click', function(e){
									map.setView([51.165691, 10.451526], 13);
	 								allemagne();
								}).addTo(map);
	 				},
	 				error:function(){
	 					var m = L.marker([48.895949, 2.387209]).addTo(map);
	 				}
	 			})
	 	}


// Zone geographique Allemagne
// Chargement d'Angela Merkel
// Traitement de la fin du jeu
// Traitement de l'apparition du modal de fin
// Param : map, Angela Merkel
function allemagne(){
	indice.innerHTML = "Il est temps de transmettre à la femme la plus influente du monde les objets que tu as récupérés. Pour trouver Angela Merkel, rend-toi là où elle exerce ses fonctions";
	$.ajax({
			url: '../../php/liste.php',
			type:'GET',
			data: 'tableauObjet',
			success: function(data){
					var Icon = L.icon({
							iconUrl: data[20].image,
							iconSize: [data[20].iconLrg, data[20].iconHtr], // size of the icon
							iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
					});
					// Angela Merkel
					var m = L.marker([data[20].lat, data[20].lng], {icon: Icon}).on('click', function(e){
						setScore();
						var data = "pseudo=" + pseudo +  "&score=" + score;
						var xhr = new XMLHttpRequest();
						xhr.open("POST", "../../php/score.php", true);
						xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
						xhr.send(data);
						$("#EndModal").modal("show");
					});
					pttzoom.addLayer(m);
				},
				error:function(){
					var m = L.marker([48.895949, 2.387209]).addTo(map);
				}
			})
	}

/* Le feature Layer pttzoom se remplit et se vide au fur et à mesure,
	 avec les  élements du jeu ne devant apparaître qu'à partir d'un certain niveau de zoom.
	 Ceux-ci n'apparaîteront qu'à partir d'un niveau de zoom égal à 17.
*/

map.on('zoomend', function() {
    if (map.getZoom() < 17){
            map.removeLayer(pttzoom);
    }
    else {
            map.addLayer(pttzoom);
        }
});

// Incrémentation du score
// Points en fonction de la valise
// Quantité de points gagnés en fonction de la difficulté à les trouver
function setScore(){
	if(lunettes.innerHTML == "Lunettes"){
		score += 16;
	} if(clé.innerHTML == "Clé"){
		score += 2;
	} if(lettre.innerHTML == "Lettre"){
		score += 0;
	} if(cassette.innerHTML == "Cassette"){
		score += 0;
	} if(ciseaux.innerHTML == "Ciseaux"){
		score += 2;
	} if(micro.innerHTML == "Micro"){
		score += 0;
	} if(telephone.innerHTML == "Telephone"){
		score += 0;
	};
	console.log(score);
	sc.innerHTML = score;
}
