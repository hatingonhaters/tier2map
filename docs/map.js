
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const map = L.map('map').setView([39.8283, -98.5795], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    function getColor(classification) {
      switch (classification) {
        case "Critical": return "#b30000";
        case "Severe Risk": return "#e34a33";
        case "Fragile": return "#fc8d59";
        case "Concern": return "#fdbb84";
        case "Watchlist": return "#fdd49e";
        case "Stable": return "#d9f0a3";
        case "Strong": return "#a6d96a";
        case "Elite": return "#1a9641";
        default: return "#cccccc";
      }
    }

    data.forEach(school => {
      const marker = L.circleMarker([school.lat, school.lon], {
        radius: 6,
        fillColor: getColor(school.classification),
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.85
      }).addTo(map);

      marker.bindPopup(school.popup);
    });

    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      const categories = ["Critical", "Severe Risk", "Fragile", "Concern", "Watchlist", "Stable", "Strong", "Elite"];
      div.innerHTML = '<h4>CSI Classification</h4>';
      categories.forEach(c => {
        div.innerHTML += `<i style="background:${getColor(c)};width:18px;height:18px;display:inline-block;margin-right:6px;"></i>${c}<br>`;
      });
      return div;
    };
    legend.addTo(map);
  });
