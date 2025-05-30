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
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend");
  var grades = ["Critical", "Distressed", "Struggling", "Fragile", "Watchlist", "Stable", "Strong", "Elite"];
  var colors = ["#8B0000", "#FF4500", "#FF8C00", "#FFA500", "#FFD700", "#66CDAA", "#228B22", "#006400"];

  div.style.background = "white";
  div.style.padding = "10px";
  div.style.borderRadius = "5px";
  div.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
  div.style.fontSize = "14px";

  div.innerHTML += '<h4 style="margin-bottom: 8px;">CSI Classification</h4>';
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<div style="display: flex; align-items: center; margin-bottom: 4px;">' +
      '<i style="width: 16px; height: 16px; background:' + colors[i] + '; margin-right: 8px; display: inline-block;"></i>' +
      grades[i] +
      '</div>';
  }

  return div;
};

legend.addTo(map);
