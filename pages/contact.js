import React from "react";
import styles from "../styles/Contactus.module.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const center = {
  lat: 21.833525,
  lng: 75.61499,
};

const Contact = () => {
  const { isLoaded } = useLoadScript({
    // id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAP_APIKEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  // console.log(process.env.NEXT_PUBLIC_GMAP_APIKEY);
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Contact us</h2>
      <div className={styles.form}>
        <form action="">
          <div className={styles.inputs}>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
          </div>
          <textarea
            placeholder="Message..."
            className={styles.message}
          ></textarea>
          <button className={styles.button} type="submit">
            Send
          </button>
        </form>
      </div>
      {isLoaded ? (
        <GoogleMap
          center={center}
          zoom={19}
          onLoad={onLoad}
          onUnmount={onUnmount}
          mapContainerClassName={styles.mapContainer}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <Marker position={{ lat: 21.833525, lng: 75.61499 }} />
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Contact;
