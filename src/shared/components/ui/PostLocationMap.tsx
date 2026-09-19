import { useEffect, useRef } from "react";
import mapboxgl, { type Map as MapboxMap } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { env } from "@/config/env";

interface PostLocationMapProps {
  coordinate?: [number, number];
}

const LOCATION_ZOOM = 14;

mapboxgl.accessToken = env.mapKey;

export const PostLocationMap = ({ coordinate }: PostLocationMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);

  const lng = coordinate?.[0];
  const lat = coordinate?.[1];
  const hasLocation = Number.isFinite(lng) && Number.isFinite(lat);

  useEffect(() => {
    if (
      !mapContainerRef.current ||
      mapRef.current ||
      lng === undefined ||
      lat === undefined ||
      !hasLocation
    ) {
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: LOCATION_ZOOM,
      interactive: false,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-left");
    new mapboxgl.Marker({ color: "#e11d48" }).setLngLat([lng, lat]).addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [hasLocation, lat, lng]);

  if (!hasLocation) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-neutral">
        موقعیت مکانی ثبت نشده است
      </div>
    );
  }

  return <div ref={mapContainerRef} className="h-full w-full" />;
};
