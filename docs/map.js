var map = L.map('map').setView([39.8283, -98.5795], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(school => {
      const marker = L.circleMarker([school.lat, school.lon], {
        radius: 6,
        fillColor: school.color,
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.85
      }).addTo(map);

      marker.bindPopup(school.popup);
    });
  });

// Add a legend
var legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend"),
      grades = ["Critical", "Distressed", "Struggling", "Fragile", "Watchlist", "Stable", "Strong", "Elite"],
      colors = ["#8B0000", "#FF4500", "#FF8C00", "#FFA500", "#FFD700", "#66CDAA", "#228B22", "#006400"];

  div.innerHTML += '<h4>CSI Classification</h4>';
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + colors[i] + '"></i> ' +
      grades[i] + '<br>';
  }

  return div;
};

legend.addTo(map);