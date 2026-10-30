/** @typedef {import('leaflet')} */

// Inicializar el mapa
const map = L.map('map').setView([-24.7821, -65.4232], 15); // Salta por defecto

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const latlngs = [];
const polyline = L.polyline([], { color: 'red' }).addTo(map);
const historialLista = document.getElementById('historialLista');
let contador = 1;

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        const punto = [lat, lng];
        latlngs.push(punto);
        polyline.setLatLngs(latlngs);
        
        map.setView(punto, 17);
        L.marker(punto).addTo(map).bindPopup(`Posición ${contador}`).openPopup();

        // Agregar al historial visual
        const li = document.createElement('li');
        li.textContent = `${contador}-Lat: ${lat.toFixed(5)}, Long: ${lng.toFixed(5)}`;
        historialLista.appendChild(li);
        
        contador++;
    }, error => {
        console.error("Error en geolocalización: ", error);
    }, {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000
    });
} else {
    alert("Tu navegador no soporta geolocalización.");
}