"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(
  () => import("react-globe.gl"),
  {
    ssr: false,
  }
);

export default function InteractiveGlobe({
  focusCountry,
}) {
  const globeRef = useRef();

  const [dimensions, setDimensions] = useState({
    width: 1000,
    height: 650,
  });

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: Math.min(
          window.innerWidth - 100,
          1400
        ),
        height: 650,
      });
    };

    updateSize();

    window.addEventListener(
      "resize",
      updateSize
    );

    return () =>
      window.removeEventListener(
        "resize",
        updateSize
      );
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    const controls =
      globeRef.current.controls();

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    globeRef.current.pointOfView(
      {
        lat: 20,
        lng: 0,
        altitude: 2.2,
      },
      0
    );
  }, []);

  useEffect(() => {
  if (
    !focusCountry ||
    !focusCountry.location ||
    !globeRef.current
  ) {
    return;
  }

  globeRef.current.pointOfView(
    {
      lat:
        focusCountry.location.lat,
      lng:
        focusCountry.location.lng,
      altitude: 1.5,
    },
    2500
  );
}, [focusCountry]);

  const destinations = [
    {
      name: "Saudi Arabia",
      lat: 23.8859,
      lng: 45.0792,
      size: 0.4,
    },
    {
      name: "Turkey",
      lat: 38.9637,
      lng: 35.2433,
      size: 0.35,
    },
    {
      name: "Dubai",
      lat: 25.2048,
      lng: 55.2708,
      size: 0.35,
    },
    {
      name: "Malaysia",
      lat: 4.2105,
      lng: 101.9758,
      size: 0.35,
    },
    {
      name: "Indonesia",
      lat: -0.7893,
      lng: 113.9213,
      size: 0.35,
    },
  ];

  return (
    <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900">

      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#10b981"
        atmosphereAltitude={0.2}

        pointsData={destinations}
        pointAltitude="size"
        pointRadius={0.5}
        pointColor={() => "#10b981"}

        labelsData={destinations}
        labelLat="lat"
        labelLng="lng"
        labelText="name"
        labelSize={1.5}
        labelColor={() => "#ffffff"}
        labelDotRadius={0.4}
      />

    </div>
  );
}