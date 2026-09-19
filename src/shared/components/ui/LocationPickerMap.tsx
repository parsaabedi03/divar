import React, { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, {
  type Map as MapboxMap,
  type Marker as MapboxMarker,
} from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { env } from "@/config/env";

mapboxgl.accessToken = env.mapKey;

const IRAN_CENTER: [number, number] = [51.389, 35.6892];
const IRAN_DEFAULT_ZOOM = 5.5;
const SELECTED_ZOOM = 15;

const MAPBOX_GEOCODING_URL = "https://api.mapbox.com/search/geocode/v6/forward";

const MAPBOX_REVERSE_URL = "https://api.mapbox.com/search/geocode/v6/reverse";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface SelectedLocation extends LatLng {
  address: string;
}

interface SearchSuggestion {
  id: string;
  properties?: {
    name?: string;
    full_address?: string;
    place_formatted?: string;
  };
  geometry?: {
    coordinates: [number, number];
  };
}

interface GeocodingResponse {
  features?: SearchSuggestion[];
}

export interface LocationPickerMapProps {
  initialPosition?: LatLng;
  onLocationSelect?: (data: SelectedLocation) => void;
  height?: string;
}

export default function LocationPickerMap({
  initialPosition,
  onLocationSelect,
  height = "450px",
}: LocationPickerMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const markerRef = useRef<MapboxMarker | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [address, setAddress] = useState("");
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);

  /*
   * Reverse Geocoding
   */
  const reverseGeocode = useCallback(
    async (lat: number, lng: number) => {
      setIsReverseGeocoding(true);

      try {
        const url = new URL(MAPBOX_REVERSE_URL);

        url.searchParams.set("longitude", lng.toString());
        url.searchParams.set("latitude", lat.toString());
        url.searchParams.set("access_token", env.mapKey);
        url.searchParams.set("language", "fa");

        const res = await fetch(url.toString());

        if (!res.ok) {
          throw new Error(`Reverse geocoding failed: ${res.status}`);
        }

        const data: GeocodingResponse = await res.json();

        const feature = data.features?.[0];

        const displayAddress =
          feature?.properties?.full_address ||
          feature?.properties?.place_formatted ||
          feature?.properties?.name ||
          "";

        setAddress(displayAddress);

        onLocationSelect?.({
          lat,
          lng,
          address: displayAddress,
        });
      } catch (error) {
        console.error("خطا در reverse geocoding:", error);

        setAddress("");

        onLocationSelect?.({
          lat,
          lng,
          address: "",
        });
      } finally {
        setIsReverseGeocoding(false);
      }
    },
    [onLocationSelect],
  );

  /*
   * Place Marker
   */
  const placeMarker = useCallback(
    (lng: number, lat: number) => {
      const map = mapRef.current;

      if (!map) return;

      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new mapboxgl.Marker({
          color: "#e11d48",
        })
          .setLngLat([lng, lat])
          .addTo(map);
      }

      reverseGeocode(lat, lng);
    },
    [reverseGeocode],
  );

  /*
   * Initialize Map
   */
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }

    const startCenter: [number, number] = initialPosition
      ? [initialPosition.lng, initialPosition.lat]
      : IRAN_CENTER;

    const startZoom = initialPosition ? SELECTED_ZOOM : IRAN_DEFAULT_ZOOM;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: startCenter,
      zoom: startZoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-left");

    map.on("click", (event) => {
      const { lng, lat } = event.lngLat;

      placeMarker(lng, lat);
    });

    mapRef.current = map;

    if (initialPosition) {
      map.on("load", () => {
        placeMarker(initialPosition.lng, initialPosition.lat);
      });
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      markerRef.current?.remove();
      markerRef.current = null;

      map.remove();
      mapRef.current = null;
    };
  }, []);

  /*
   * Search
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchText(value);
    setSuggestions([]);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!value.trim()) {
      setIsSearching(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);

      try {
        const url = new URL(MAPBOX_GEOCODING_URL);

        url.searchParams.set("q", value);
        url.searchParams.set("access_token", env.mapKey);

        url.searchParams.set("language", "fa");
        url.searchParams.set("country", "IR");
        url.searchParams.set("limit", "5");

        const res = await fetch(url.toString());

        if (!res.ok) {
          throw new Error(`Search failed: ${res.status}`);
        }

        const data: GeocodingResponse = await res.json();

        setSuggestions(data.features || []);
      } catch (error) {
        console.error("خطا در جستجوی آدرس:", error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);
  };

  /*
   * Select Search Suggestion
   */
  const handleSuggestionClick = (item: SearchSuggestion) => {
    const coordinates = item.geometry?.coordinates;

    if (!coordinates) {
      return;
    }

    const [lng, lat] = coordinates;

    const selectedAddress =
      item.properties?.full_address ||
      item.properties?.place_formatted ||
      item.properties?.name ||
      "";

    setSuggestions([]);
    setSearchText(selectedAddress);

    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: SELECTED_ZOOM,
      essential: true,
    });

    placeMarker(lng, lat);
  };

  return (
    <div
      dir="rtl"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {/* Search */}
      <div
        style={{
          position: "relative",
        }}
      >
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="جستجوی آدرس (مثلاً: تهران، خیابان ولیعصر)"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 14,
            boxSizing: "border-box",
          }}
        />

        {isSearching && (
          <span
            style={{
              position: "absolute",
              left: 12,
              top: 12,
              fontSize: 12,
              color: "#888",
            }}
          >
            در حال جستجو...
          </span>
        )}

        {suggestions.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              left: 0,
              zIndex: 10,
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: 8,
              marginTop: 4,
              maxHeight: 220,
              overflowY: "auto",
              listStyle: "none",
              padding: 0,
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            {suggestions.map((item) => {
              const title = item.properties?.name || "";

              const description =
                item.properties?.place_formatted ||
                item.properties?.full_address ||
                "";

              return (
                <li
                  key={item.id}
                  onClick={() => handleSuggestionClick(item)}
                  onMouseDown={(event) => event.preventDefault()}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: 13,
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {title}
                  </div>

                  {description && (
                    <div
                      style={{
                        color: "#888",
                        fontSize: 12,
                      }}
                    >
                      {description}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Map */}
      <div
        ref={mapContainerRef}
        style={{
          height,
          width: "100%",
          borderRadius: 8,
          overflow: "hidden",
        }}
      />

      {/* Address */}
      <div
        style={{
          fontSize: 13,
          color: "#555",
          minHeight: 20,
        }}
      >
        {isReverseGeocoding && "در حال دریافت آدرس..."}

        {!isReverseGeocoding && address && <>📍 {address}</>}

        {!isReverseGeocoding && !address && (
          <>روی نقشه کلیک کنید یا آدرس را جستجو کنید تا مکان انتخاب شود.</>
        )}
      </div>
    </div>
  );
}
