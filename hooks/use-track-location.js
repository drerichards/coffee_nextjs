import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLong, setLatLong] = useState({});
  const [isLocating, setIsLocating] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLatLong({latitude, longitude});
    setLocationErrorMsg("");
    setIsLocating(false);
  };
  const error = () => {
    setIsLocating(false);
    setLocationErrorMsg("Unable to retrieve your location");
  };
  const handleTrackLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsLocating(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return { latLong, handleTrackLocation, locationErrorMsg, isLocating };
};

export default useTrackLocation;
