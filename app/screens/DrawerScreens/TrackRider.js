import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import MapView, { Marker, Polyline, AnimatedRegion } from "react-native-maps";
import { GOOGLE_MAPS_API_KEY } from "@env";
import polyline from "@mapbox/polyline";
import { useTheme } from "../../../assets/colors/ThemeContext";

const TrackRider = () => {
  const { theme } = useTheme();
  const [destinationCoordinates, setDestinationCoordinates] = useState({
    latitude: 37.7749, // Hypothetical destination (San Francisco)
    longitude: -122.4194,
  });
  const [eta, setEta] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [isFollowing, setIsFollowing] = useState(true);

  // Using AnimatedRegion for smooth transition
  const riderLocation = useRef(
    new AnimatedRegion({
      latitude: 37.7649, // Initial latitude (near rider location)
      longitude: -122.4294, // Initial longitude
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  ).current;

  const [region, setRegion] = useState({
    latitude: 37.7649,
    longitude: -122.4294,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Function to simulate fetching rider's live location and destination coordinates
  const fetchLocationData = () => {
    const newLocation = {
      latitude: riderLocation.latitude.__getValue() + 0.00001,
      longitude: riderLocation.longitude.__getValue() + 0.00001,
    };

    // Animate the marker to the new location
    riderLocation
      .timing(newLocation, {
        duration: 2000, // Duration of the animation for smooth transition
        useNativeDriver: false,
      })
      .start();

    // Fetch route and ETA after updating location
    fetchETA(newLocation, destinationCoordinates);
    fetchRoute(newLocation, destinationCoordinates);

    if (isFollowing) {
      setRegion((prevRegion) => ({
        ...prevRegion,
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
      }));
    }
  };

  // Function to fetch route using Google Directions API
  const fetchRoute = async (origin, destination) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const points = polyline.decode(data.routes[0].overview_polyline.points);
        const routeCoords = points.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        setRouteCoordinates(routeCoords);
      } else {
        console.error("Error: No routes found in response:", data);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // Function to fetch ETA using Google Maps Distance Matrix API
  const fetchETA = async (origin, destination) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (
        data.rows &&
        data.rows[0].elements &&
        data.rows[0].elements[0].status === "OK"
      ) {
        setEta(data.rows[0].elements[0].duration.text);
      } else {
        console.error("Error in response structure:", data);
        setEta("N/A");
      }
    } catch (error) {
      console.error("Error fetching ETA:", error);
      setEta("N/A");
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchLocationData, 2000);
    return () => clearInterval(interval);
  }, [isFollowing]);

  const handleRecenter = () => {
    if (riderLocation) {
      setRegion({
        ...region,
        latitude: riderLocation.latitude.__getValue(),
        longitude: riderLocation.longitude.__getValue(),
      });
      setIsFollowing(true);
    }
  };

  return (
    <View style={styles.container}>
      {riderLocation ? (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={() => setIsFollowing(false)}
        >
          {/* Rider Location with Animated Marker */}
          <Marker.Animated coordinate={riderLocation}>
            <View style={styles.customMarker}>
              <Image
                source={require("../../../assets/images/avatar.png")}
                style={styles.markerImage}
              />
              <Text style={[styles.markerText, { color: theme.primary }]}>
                Rider
              </Text>
            </View>
          </Marker.Animated>

          {/* Destination Marker */}
          <Marker
            coordinate={destinationCoordinates}
            title="Destination"
            description="Rider's destination"
          />

          {/* Polyline for the route */}
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#0000FF"
            strokeWidth={3}
          />
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Fetching location data...</Text>
        </View>
      )}

      {/* Display ETA */}
      <View style={styles.etaContainer}>
        <Text style={styles.etaText}>
          Estimated Time to Reach: {eta || "Calculating..."}
        </Text>
      </View>

      {/* Recenter Button */}
      {!isFollowing && (
        <TouchableOpacity
          style={styles.recenterButton}
          onPress={handleRecenter}
        >
          <Text style={styles.recenterButtonText}>Recenter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  etaContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 10,
  },
  etaText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  recenterButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  recenterButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  markerText: {
    fontSize: 20,
    fontFamily: "Black",
    marginTop: 4,
    textAlign: "center",
  },
});

export default TrackRider;
