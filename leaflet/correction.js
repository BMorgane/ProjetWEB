let map = L.map('map').setView([48.85, 2.35], 13);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(map);

navigator.geolocation.getCurrentPosition(function (position) {
    let coords = [position.coords.latitude, position.coords.longitude];
    L.marker(coords).addTo(map);
});

let form = document.getElementById('form');
let recherche = document.getElementById('recherche');
form.addEventListener('submit', valider);

function valider (e) {
  e.preventDefault();
  let text = recherche.value;
  
}