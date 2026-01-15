import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import { message } from "antd";
import styles from "./ContactMap.module.css";
import { containerVariants } from "@/_data/contactUs/animations";
import MapInfoPanel from "./MapInfoPanel";

const COMPANY_LOCATION = {
  address: "A105 LINX building, Smart Village, 12577 Giza, Egypt",
  coordinates: [30.0131, 31.2089],
};

const Map = dynamic(() => import("pigeon-maps").then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <p style={{ color: "#666" }}>Loading map...</p>
    </div>
  ),
});

const Marker = dynamic(() => import("pigeon-maps").then((mod) => mod.Marker), {
  ssr: false,
});

const createGoogleMapsUrls = (lat, lng, address = null) => {
  const hasAddress = address && !address.startsWith("Location at");

  if (hasAddress) {
    const encoded = encodeURIComponent(address);
    return {
      directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encoded}`,
      placeUrl: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
    };
  } else {
    return {
      directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      placeUrl: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    };
  }
};

export default function ContactMap() {
  const [isDragging, setIsDragging] = useState(false);
  const [lat, lng] = COMPANY_LOCATION.coordinates;

  const initialUrls = createGoogleMapsUrls(lat, lng, COMPANY_LOCATION.address);

  const [selectedLocation, setSelectedLocation] = useState({
    title: "A105 LINX building",
    address: COMPANY_LOCATION.address,
    coordinates: COMPANY_LOCATION.coordinates,
    directionsUrl: initialUrls.directionsUrl,
    placeUrl: initialUrls.placeUrl,
  });

  const [markerPosition, setMarkerPosition] = useState(
    COMPANY_LOCATION.coordinates
  );
  const [isLoading, setIsLoading] = useState(false);

  const getLocationName = async (lat, lng) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data && data.address) {
        const title =
          data.address.building ||
          (data.address.house_number && data.address.road
            ? `${data.address.house_number} ${data.address.road}`
            : data.address.road ||
              data.address.suburb ||
              data.address.neighbourhood ||
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "Selected Location");

        return {
          title: title,
          address: data.display_name,
        };
      }

      return {
        title: "Selected Location",
        address: `Location at ${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
      };
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        message.warning(
          "Unable to get location name. Please check your internet connection and try again."
        );
      } else if (error.message.includes("HTTP error")) {
        message.warning(
          "Could not load location details. Please try clicking on the map again."
        );
      } else {
        message.info(
          "Location name not available. Showing coordinates instead."
        );
      }

      return {
        title: "Selected Location",
        address: `Location at ${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleMapClick = async ({ latLng }) => {
    try {
      const [lat, lng] = latLng;

      if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
        message.warning("Please click on a valid location on the map.");
        return;
      }

      setMarkerPosition([lat, lng]);

      const locationData = await getLocationName(lat, lng);

      const urls = createGoogleMapsUrls(lat, lng, locationData.address);

      setSelectedLocation({
        title: locationData.title,
        address: locationData.address,
        coordinates: [lat, lng],
        directionsUrl: urls.directionsUrl,
        placeUrl: urls.placeUrl,
      });
    } catch (error) {
      message.warning(
        "Something went wrong. Please try clicking on the map again."
      );
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  return (
    <motion.section
      className={styles.mapSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.mapWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <MapInfoPanel
            selectedLocation={selectedLocation}
            isLoading={isLoading}
          />

          <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`${styles.mapContainer} ${
              isDragging ? styles.grabbing : styles.grab
            }`}
          >
            <Map
              center={COMPANY_LOCATION.coordinates}
              zoom={15}
              height={500}
              onClick={handleMapClick}
              mouseEvents={{ cursor: "default" }}
            >
              <Marker anchor={markerPosition} payload={1} />
            </Map>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
