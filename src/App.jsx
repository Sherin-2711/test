import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, LocateFixed, RefreshCw } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LOCATIONIQ_API_KEY = 'pk.49e552f036e00d02260c20d27724dfda';

const HospitalFinder = () => {
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [userCircle, setUserCircle] = useState(null);
  const [hospitalMarkers, setHospitalMarkers] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  const clearMarkers = useCallback(() => {
    if (map) {
      hospitalMarkers.forEach(marker => marker.remove());
      if (userMarker) userMarker.remove();
      if (userCircle) userCircle.remove();
      setHospitalMarkers([]);
    }
  }, [map, hospitalMarkers, userMarker, userCircle]);

  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    if (lat1 === lat2 && lon1 === lon2) return 0;
    
    const radlat1 = Math.PI * lat1/180;
    const radlat2 = Math.PI * lat2/180;
    const theta = lon1-lon2;
    const radtheta = Math.PI * theta/180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.min(dist, 1);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    return dist * 1.609344;
  }, []);

  // Initialize map only
  useEffect(() => {
    if (!map && typeof window !== 'undefined') {
      const mapInstance = L.map('map', {
        center: [0, 0],  // Start with a default center
        zoom: 2,         // Start zoomed out
        zoomControl: true
      });
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(mapInstance);

      setMap(mapInstance);

      return () => {
        if (mapInstance) {
          mapInstance.remove();
        }
      };
    }
  }, []);

  const updateUserLocation = useCallback((position, mapInstance = map) => {
    if (!mapInstance) return;

    const { latitude: lat, longitude: lng } = position.coords;
    clearMarkers();

    // Create user marker with custom icon
    const userIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwNjZjYyI+PHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDljMCA1LjI1IDcgMTMgNyAxM3M3LTcuNzUgNy0xM2MwLTMuODctMy4xMy03LTctN3ptMCA5LjVjLTEuMzggMC0yLjUtMS4xMi0yLjUtMi41czEuMTItMi41IDIuNS0yLjUgMi41IDEuMTIgMi41IDIuNS0xLjEyIDIuNS0yLjUgMi41eiIvPjwvc3ZnPg==',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const newUserMarker = L.marker([lat, lng], {
      icon: userIcon,
      title: "Your Location"
    }).addTo(mapInstance);

    newUserMarker.bindPopup("You are here").openPopup();

    const newUserCircle = L.circle([lat, lng], {
      radius: 5000,
      color: '#0066cc',
      fillColor: '#0066cc',
      fillOpacity: 0.1
    }).addTo(mapInstance);

    setUserMarker(newUserMarker);
    setUserCircle(newUserCircle);
    mapInstance.setView([lat, lng], 13);

    // Automatically search for hospitals after updating location
    findNearbyHospitals(position, mapInstance);
  }, [map, clearMarkers]);

  const findNearbyHospitals = useCallback(async (position = userPosition, mapInstance = map) => {
    if (!position || !mapInstance) return;

    setLoading(true);
    setError(null);

    try {
      const { latitude: userLat, longitude: userLng } = position.coords;
      const response = await fetch(
        `https://us1.locationiq.com/v1/nearby.php?key=${LOCATIONIQ_API_KEY}&lat=${userLat}&lon=${userLng}&tag=hospital&radius=5000&format=json`
      );

      if (!response.ok) throw new Error('Failed to fetch hospitals');

      const data = await response.json();
      
      const hospitalIcon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2RjMTQzYyI+PHBhdGggZD0iTTEyIDJDNi40NyAyIDIgNi40NyAyIDEyczQuNDcgMTAgMTAgMTAgMTAtNC40NyAxMC0xMFMxNy41MyAyIDEyIDJ6bTUgMTNoLTR2NGgtMnYtNEg3di0yaDR2LTRoMnY0aDR2MnoiLz48L3N2Zz4=',
        iconSize: [25, 25],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
      });

      const newMarkers = [];
      const hospitalsWithDistance = data.map(hospital => {
        const distance = calculateDistance(
          userLat,
          userLng,
          parseFloat(hospital.lat),
          parseFloat(hospital.lon)
        );

        const marker = L.marker([hospital.lat, hospital.lon], {
          icon: hospitalIcon
        }).addTo(mapInstance);

        marker.bindPopup(`
          <div class="p-2">
            <strong>${hospital.name || 'Hospital'}</strong><br>
            ${hospital.address?.road || ''} ${hospital.address?.city || ''}<br>
            Distance: ${distance.toFixed(2)} km
          </div>
        `);

        newMarkers.push(marker);
        return { ...hospital, distance };
      });

      setHospitalMarkers(newMarkers);
      setHospitals(hospitalsWithDistance);

      // Fit bounds to show all markers
      if (hospitalsWithDistance.length > 0) {
        const bounds = L.latLngBounds([userLat, userLng]);
        newMarkers.forEach(marker => {
          bounds.extend(marker.getLatLng());
        });
        mapInstance.fitBounds(bounds.pad(0.1));
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [map, userPosition, calculateDistance]);

  const initializeLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,        // Increased timeout
      maximumAge: 0         // Force fresh location
    };

    navigator.geolocation.getCurrentPosition(
      position => {
        setUserPosition(position);
        updateUserLocation(position);
        setLoading(false);
      },
      err => {
        setError("Error getting location: " + err.message);
        setLoading(false);
      },
      options
    );
  }, [updateUserLocation]);

  return (
    <div className="container mx-auto p-4">
      <header className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h1 className="text-2xl text-gray-800 font-semibold">Nearby Hospitals Finder</h1>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
          <div id="map" style={{ height: '600px' }} className="rounded-lg"></div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <button
            onClick={initializeLocation}
            disabled={loading}
            className="w-full mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <LocateFixed className="w-4 h-4" />
            )}
            {loading ? 'Finding Hospitals...' : 'Find Nearby Hospitals'}
          </button>

          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Nearby Hospitals</h2>
          
          {error && (
            <div className="text-red-500 text-center p-4">{error}</div>
          )}

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {hospitals.length === 0 && !loading && !error ? (
              <div className="text-gray-500 text-center p-4">
                Click the button above to find nearby hospitals
              </div>
            ) : (
              hospitals.map((hospital, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (map && hospitalMarkers[index]) {
                      map.setView([hospital.lat, hospital.lon], 16);
                      hospitalMarkers[index].openPopup();
                    }
                  }}
                  className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:-translate-y-1 transition-all hover:shadow-md"
                >
                  <div className="font-semibold text-gray-800 mb-1">
                    {hospital.name || 'Hospital'}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {hospital.address?.road || ''} {hospital.address?.city || ''}
                  </div>
                  <div className="text-sm text-blue-600 font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {hospital.distance.toFixed(2)} km away
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalFinder;