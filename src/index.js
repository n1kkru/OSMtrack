const jsonData = require('../sendGeoPoint.json');
console.log(jsonData.length);
const updateData = jsonData
  .filter( (point) => (point.valid !== 1))
  .filter( (point) => point.satellitecount > 3)
  .filter( (point) => {
    return point.latitude >= 1 || point.latitude <=-1
  })
  .filter( (point) => {
    return point.longitude >= 1 || point.longitude <=-1
  })


const element = document.getElementById("osm-map");
element.style = "height: 500px;";

const map = L.map(element);
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

updateData.forEach((point) => {
  const target = L.latLng(point.latitude, point.longitude);

  map.setView(target, 15);
  L.marker(target).addTo(map);
})