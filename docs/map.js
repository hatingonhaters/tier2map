
fetch('map_data.json')
  .then(response => response.json())
  .then(data => {
    const map = L.map('map').setView([39.8283, -98.5795], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    data.forEach(school => {
      const marker = L.circleMarker([school.lat, school.lon], {
        radius: 6,
        fillColor: school.color,
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
      const categories = [
        { label: "Critical", color: "#a50026" },
        { label: "Terminal", color: "#6e0000" },
        { label: "Fragile", color: "#f46d43" },
        { label: "Concern", color: "#d73027" },
        { label: "Watchlist", color: "#fdae61" },
        { label: "Stable", color: "#a6d96a" },
        { label: "Excellent", color: "#66bd63" },
        { label: "Elite", color: "#1a9850" }
      ];
      div.innerHTML = '<h4>CSI Classification</h4>';
      categories.forEach(c => {
        div.innerHTML += `<i style="background:${c.color};width:18px;height:18px;display:inline-block;margin-right:6px;"></i>${c.label}<br>`;
      });
      return div;
    };
    legend.addTo(map);
  });
