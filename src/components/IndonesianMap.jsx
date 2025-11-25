import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import geo from "@/data/geo.json";
import cluster from "@/data/cluster.json";
import { normalizeProv } from "@/lib/Normalize";
import Button from "@components/ui/button";
import { clusterColor, clusterLabel } from "@/lib/Constants";
import { useNavigate } from "react-router";

export default function IndonesianMap({ agregates }) {
  const navigate = useNavigate();
  const [hoveredProv, setHoveredProv] = useState("");
  const [position, setPosition] = useState({
    coordinates: [118, -2],
    zoom: 1,
  });

  const zoomIn = () => {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.min(pos.zoom + 0.5, 8),
    }));
  };

  const zoomOut = () => {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.max(pos.zoom - 0.5, 1),
    }));
  };

  const resetZoom = () => {
    setPosition({
      coordinates: [118, -2],
      zoom: 1,
    });
  };

  return (
    <div className="relative z-10">
      <div
        style={{
          left: hoveredProv ? "0" : "-100%",
          transition: ".3s",
        }}
        className="bg-secondary border border-white/15 rounded-md absolute top-[50%] p-4 z-30 pointer-events-none"
      >
        <h4 className="text-md font-semibold">{hoveredProv}</h4>
        <p className="text-sm mt-2">Rp. {agregates?.[hoveredProv]?.mean}</p>
        <small className="text-xs text-mute">Rata-rata harga</small>
        <p className="text-xs mt-4">
          Klik peta provinsi untuk melihat detail / melakukan prediksi
        </p>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
        <Button onClick={zoomIn} className="w-10 h-10">
          +
        </Button>
        <Button onClick={zoomOut} className="w-10 h-10">
          –
        </Button>
        <Button onClick={resetZoom} className="w-10 h-10 text-lg">
          ↺
        </Button>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [118, -2],
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={(pos) => setPosition(pos)}
        >
          <Geographies geography={geo}>
            {({ geographies }) =>
              geographies.map((g) => {
                const provName = normalizeProv(g.properties.provinsi);
                const clusterValue = cluster[provName] ?? 3;
                return (
                  <Geography
                    key={g.rsmKey}
                    geography={g}
                    onClick={() => navigate("/forecast/" + provName)}
                    onMouseEnter={() => {
                      setHoveredProv(provName);
                    }}
                    onMouseLeave={() => {
                      setHoveredProv("");
                    }}
                    style={{
                      default: {
                        fill: clusterColor[clusterValue],
                        stroke: "#18181b",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "red",
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#d4d4d8",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <div className="p-6 flex justify-center gap-12 absolute bottom-0">
        {Object.keys(clusterColor).map((keyCluster, index) => (
          <div className="flex items-center gap-2" key={index}>
            <div
              className="w-4 h-4"
              style={{ backgroundColor: clusterColor[keyCluster] }}
            ></div>
            <p className="text-xs sm:text-sm">{clusterLabel[keyCluster]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
