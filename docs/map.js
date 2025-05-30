var map = L.map('map').setView([39.8283, -98.5795], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Load external data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(school => {
      let color;
      const percentile = school.percentile;

      if (percentile >= 87.5) color = '#006400';       // Elite
      else if (percentile >= 75) color = '#228B22';    // Strong
      else if (percentile >= 62.5) color = '#66CDAA';  // Stable
      else if (percentile >= 50) color = '#FFD700';    // Watchlist
      else if (percentile >= 37.5) color = '#FFA500';  // Fragile
      else if (percentile >= 25) color = '#FF8C00';    // Struggling
      else if (percentile >= 12.5) color = '#FF4500';  // Distressed
      else color = '#8B0000';                          // Critical

      const marker = L.circleMarker([school.lat, school.lon], {
        radius: 6,
        fillColor: color,
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);

      marker.bindPopup(school.popup);
    });
  });