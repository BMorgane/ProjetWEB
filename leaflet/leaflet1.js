

// Créer une carte
let mymap = L.map('mapid').setView([48.85, 2.6], 15);


// Mettre un fond de carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

let pos;


// Récupérer la géolocalisation
navigator.geolocation.getCurrentPosition(OnGeoloc);

console.log(pos);

// Géolocalisation sur la carte avec marker 
function onGeoloc (position) {
    let pos = [position.coords.latitude, position.coords.longitude];
    L.marker(pos).addTo(map);
    map.setView(pos, 13);
}

// Mouvement de la souris à afficher en dessous de la carte
function onMouseMove (event) {
    let mouse = {
        x : event.clientX,
        y : event.clientY
        
    };
    delta.x = mouse.x - start.x + end.x;
    delta.y = mouse.y - start.y + end.y;
    console.log(delta);
    carre.style.transform = 'translate(' + delta.x + 'px,' + delta.y + 'px)' ;
    console.log('move');

}

let infoWindow = mymap.infoWindow({
    content :"Clique sur la map pour avoir les coordonnées"
    position {
        lat : x,
        long : y
    }
});
