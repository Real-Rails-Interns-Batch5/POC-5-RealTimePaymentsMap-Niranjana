"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for missing marker graphics in Next.js builds
const customMarkerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Dynamic Pan Controller Component: Responsively glides view to active payment hub
function MapPanController({ centerCoordinates }: { centerCoordinates: [number, number] }) {
  const mapInstance = useMap();
  
  useEffect(() => {
    if (centerCoordinates) {
      mapInstance.setView(centerCoordinates, mapInstance.getZoom());
      setTimeout(() => {
        mapInstance.invalidateSize();
      }, 100);
    }
  }, [centerCoordinates, mapInstance]);

  return null;
}

export default function MapComponent({ rails, activeRailId }: { rails: any[]; activeRailId: string }) {
  
  // 🎯 CRITICAL GUARD: If the backend data array hasn't loaded yet, stop rendering to prevent appendChild crashes
  if (!rails || rails.length === 0) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center bg-[#0B111E] text-zinc-500 font-mono text-xs">
        Connecting to data streams...
      </div>
    );
  }

  // Safe Extraction: Data is guaranteed to exist now
  const activeRailNode = rails.find((r) => r.id === activeRailId) || rails[0];
  const defaultPosition: [number, number] = activeRailNode && activeRailNode.coordinates 
    ? activeRailNode.coordinates 
    : [20.5937, 78.9629]; // Safe baseline center fallback

  return (
    <div className="w-full h-full min-h-screen relative bg-[#0B111E]">
      <MapContainer
        center={defaultPosition}
        zoom={3}
        scrollWheelZoom={true}
        dragging={true}
        style={{ height: "100vh", width: "100%" }}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <MapPanController centerCoordinates={defaultPosition} />

        {rails.map((rail: any) => {
          if (!rail.coordinates) return null;
          return (
            <Marker
              key={rail.id}
              position={rail.coordinates as [number, number]}
              icon={customMarkerIcon}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}