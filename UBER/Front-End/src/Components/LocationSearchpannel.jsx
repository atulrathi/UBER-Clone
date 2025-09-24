import React, { useState, useEffect, useRef } from "react";

const LocationSearchpannel = (props) => {
  const [location, setLocation] = useState([]);
  const [activeField, setActiveField] = useState(null); // 'pickup' | 'destination' | null

  // Keep previous values so we can detect which prop changed
  const prevPickupRef = useRef(props.pickup);
  const prevDestinationRef = useRef(props.destination);

  // For aborting in-flight fetches
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const prevPickup = prevPickupRef.current;
    const prevDest = prevDestinationRef.current;

    let query = null;
    let field = null;

    // If pickup changed, prefer pickup
    if (props.pickup !== prevPickup) {
      if (props.pickup && props.pickup.length >= 3) {
        query = props.pickup;
        field = "pickup";
      } else {
        // pickup was cleared or shortened; try destination if available
        if (props.destination && props.destination.length >= 3) {
          query = props.destination;
          field = "destination";
        } else {
          setLocation([]);
        }
      }
    }
    // If destination changed (and pickup didn't), use destination
    else if (props.destination !== prevDest) {
      if (props.destination && props.destination.length >= 3) {
        query = props.destination;
        field = "destination";
      } else {
        // destination cleared/shortened; try pickup if available
        if (props.pickup && props.pickup.length >= 3) {
          query = props.pickup;
          field = "pickup";
        } else {
          setLocation([]);
        }
      }
    } else {
      // nothing changed, nothing to do
      return;
    }

    // update previous refs for next comparison
    prevPickupRef.current = props.pickup;
    prevDestinationRef.current = props.destination;

    if (!query) return;

    setActiveField(field);

    // cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchSuggestion = async () => {
      try {
        // Replace with an env var in production rather than hardcoding the key
        const API_KEY = "c43caf01b1bc4a379e04bc1b030683b2";
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&apiKey=${API_KEY}`;

        const res = await fetch(url, { signal: controller.signal });
        const result = await res.json();

        if (result && result.features && result.features.length > 0) {
          setLocation(result.features);
        } else {
          setLocation([]);
        }
      } catch (err) {
        if (err.name === "AbortError") return; // expected during rapid typing
        console.error("Location fetch error:", err);
        setLocation([]);
      }
    };

    fetchSuggestion();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [props.pickup, props.destination]);

  // click -> put selected address into the correct input
  const setValueForField = (fieldFromState, value) => {
    // fallbacks for different prop setter names (setpickup or setPickup)
    const pickupSetter = props.setpickup || props.setPickup;
    const destSetter = props.setdestination || props.setDestination;

    // if activeField is null (shouldn't usually happen), decide by which input has >=3 chars
    const target =
      fieldFromState ||
      (props.pickup && props.pickup.length >= 3 ? "pickup" : props.destination && props.destination.length >= 3 ? "destination" : null);

    if (target === "pickup" && typeof pickupSetter === "function") {
      pickupSetter(value);
    } else if (target === "destination" && typeof destSetter === "function") {
      destSetter(value);
    }

    // clear suggestions after selecting
    setLocation([]);
  };

  return (
    <div>
      {/* Empty / helpful messages */}
      {!props.pickup && !props.destination && (
        <p className="text-gray-500 text-center py-2">
          Enter your pickup or destination location
        </p>
      )}

      {props.pickup && props.pickup.length > 0 && props.pickup.length < 3 && (
        <p className="text-gray-500 text-center py-2">Enter at least 3 characters for pickup</p>
      )}

      {props.destination && props.destination.length > 0 && props.destination.length < 3 && (
        <p className="text-gray-500 text-center py-2">Enter at least 3 characters for destination</p>
      )}

      {/* Results */}
      {location && location.length > 0 ? (
        location.map((place, idx) => (
          <div
            key={idx}
            onClick={() => setValueForField(activeField, place.properties.formatted)}
            className="w-full px-4 py-2 mb-2 rounded flex gap-3 items-center cursor-pointer hover:bg-gray-100"
          >
            <div className="px-2 py-1 bg-[#eeeeee] rounded-full flex justify-center items-center">
              <i className="ri-map-pin-add-line"></i>
            </div>
            <div className="text-sm">{place.properties.formatted}</div>
          </div>
        ))
      ) : (
        // If user typed >=3 in either field and we have no results, show a message
        ((props.pickup && props.pickup.length >= 3) || (props.destination && props.destination.length >= 3)) && (
          <p className="text-gray-500 text-center py-2">No results found</p>
        )
      )}
    </div>
  );
};

export default LocationSearchpannel;
