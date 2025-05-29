
fetch('map_data.json')
  .then(response => response.json())
  .then(data => {
    const map = L.map('map').setView([39.8283, -98.5795], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    function getColor(classification) {
      switch (classification) {
        case "Critical": return "#a50026";
        case "Terminal": return "#6e0000";
        case "Fragile": return "#f46d43";
        case "Concern": return "#d73027";
        case "Watchlist": return "#fdae61";
        case "Stable": return "#a6d96a";
        case "Excellent": return "#66bd63";
        case "Elite": return "#1a9850";
        default: return "#999999";
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
      const categories = ["Critical", "Terminal", "Fragile", "Concern", "Watchlist", "Stable", "Excellent", "Elite"];
      div.innerHTML = '<h4>CSI Classification</h4>';
      categories.forEach(c => {
        div.innerHTML += `<i style="background:${getColor(c)};width:18px;height:18px;display:inline-block;margin-right:6px;"></i>${c}<br>`;
      });
      return div;
    };
    legend.addTo(map);
  });
