import Link from "next/link";
import styles from "../contact/ContactMap.module.css";
import Uicons from "@/components/UI/Uicons";

export default function MapInfoPanel({ selectedLocation, isLoading }) {
  return (
    <div className={styles.infoPanel}>
      <div className={styles.infoPanelTop}>
        <div className={styles.infoContent}>
          <h3 className={styles.infoTitle}>
            {isLoading ? "Loading..." : selectedLocation.title}
          </h3>
          <p className={styles.infoAddress}>
            {isLoading ? "Fetching location..." : selectedLocation.address}
          </p>
        </div>
        <Link
          href={selectedLocation.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.directionsLink} ${
            isLoading ? styles.disabled : ""
          }`}
          onClick={(e) => {
            if (isLoading) {
              e.preventDefault();
              return false;
            }
          }}
          style={{ pointerEvents: isLoading ? "none" : "auto" }}
        >
          <Uicons icon="fi-rr-direction-signal-arrow" />
          <span>Directions</span>
        </Link>
      </div>
      <Link
        href={selectedLocation.placeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.viewMapLink} ${isLoading ? styles.disabled : ""}`}
        onClick={(e) => {
          if (isLoading) {
            e.preventDefault();
            return false;
          }
        }}
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
      >
        View larger map
      </Link>
    </div>
  );
}
