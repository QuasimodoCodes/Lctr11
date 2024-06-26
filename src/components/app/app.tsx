import { Map, View } from "ol";
import React, { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { useGeographic } from "ol/proj";

import "./app.css";

import "ol/ol.css";
import { useVehicleLayer } from "./useVehicleLayer";
import { DrawTrainStationButton } from "./drawTrainStationButton";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

import { DrawCircleButton } from "./drawCircleButton";
import { MapboxVectorLayer } from "ol-mapbox-style";
import { DrawFerryButton } from "./drawFerryButton";

useGeographic();

const drawingSource = new VectorSource();
const drawingLayer = new VectorLayer({ source: drawingSource });

const backgroundLayer = new MapboxVectorLayer({
  styleUrl: "mapbox://styles/mapbox/bright-v9",
  accessToken:
    "pk.eyJ1Ijoiamhhbm5lcyIsImEiOiJjbHVmaHJxcnAwczVyMmpvYzB2aXh6bDI5In0.lrAcWw8waJKbUNyBF8Vzqw",
});
const map = new Map({
  view: new View({ center: [10, 63], zoom: 9 }),
});

export function TransitMapApplication() {
  const { vehicleLayer, vehicleTrailLayer } = useVehicleLayer();
  const layers = useMemo(
    () => [backgroundLayer, vehicleTrailLayer, vehicleLayer, drawingLayer],
    [vehicleLayer, vehicleLayer]
  );
  useEffect(() => map.setLayers(layers), [layers]);

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);
  return (
    <>
      <nav>
        <DrawTrainStationButton map={map} source={drawingSource} />
        <DrawFerryButton map={map} source={drawingSource} />
        <DrawCircleButton
          map={map}
          source={drawingSource}
          vehicleSource={vehicleLayer.getSource()!}
        />
      </nav>
      <div ref={mapRef}></div>
    </>
  );
}
