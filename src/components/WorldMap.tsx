import { useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { countryFollowers } from "@/data/followersData";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const ANTARCTICA_CODE = "010";

const isoMap: Record<string, string> = {
  MEX: "484", USA: "840", COL: "170", ARG: "032",
  ESP: "724", BRA: "076", CHL: "152", PER: "604",
  ECU: "218", GTM: "320",
};

const WorldMap = () => {
  const [tooltip, setTooltip] = useState<{
    name: string;
    followers: number;
    x: number;
    y: number;
  } | null>(null);

  const getCountryData = (isoCode: string) => {
    return countryFollowers.find((c) => isoMap[c.code] === isoCode);
  };

  const maxFollowers = Math.max(...countryFollowers.map((c) => c.followers));

  const getFillColor = (followers: number) => {
    const ratio = followers / maxFollowers;
    // From light orange to deep orange
    const lightness = 75 - ratio * 35; // 75% to 40%
    const saturation = 60 + ratio * 35; // 60% to 95%
    return `hsl(32, ${saturation}%, ${lightness}%)`;
  };

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140, center: [0, 35] }}
        className="w-full h-auto"
        style={{ maxHeight: 440 }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.id !== ANTARCTICA_CODE)
              .map((geo) => {
                const data = getCountryData(geo.id);
                const hasFollowers = !!data;
                const fill = hasFollowers
                  ? getFillColor(data.followers)
                  : "hsl(220, 10%, 82%)";
                const hoverFill = hasFollowers
                  ? getFillColor(data.followers).replace(/(\d+)%\)$/, (_, l) => `${Math.max(Number(l) - 8, 30)}%)`)
                  : "hsl(220, 10%, 75%)";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) => {
                      if (hasFollowers) {
                        const svg = (e.target as SVGElement).closest("svg");
                        const rect = svg?.getBoundingClientRect();
                        setTooltip({
                          name: data.country,
                          followers: data.followers,
                          x: e.clientX - (rect?.left || 0),
                          y: e.clientY - (rect?.top || 0),
                        });
                      }
                    }}
                    onMouseMove={(e) => {
                      if (hasFollowers) {
                        const svg = (e.target as SVGElement).closest("svg");
                        const rect = svg?.getBoundingClientRect();
                        setTooltip((prev) =>
                          prev
                            ? {
                                ...prev,
                                x: e.clientX - (rect?.left || 0),
                                y: e.clientY - (rect?.top || 0),
                              }
                            : null
                        );
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: {
                        fill,
                        stroke: "hsl(0, 0%, 100%)",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: hasFollowers ? "pointer" : "default",
                      },
                      hover: {
                        fill: hoverFill,
                        stroke: "hsl(0, 0%, 100%)",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: hasFollowers ? "pointer" : "default",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
          }
        </Geographies>
      </ComposableMap>

      {tooltip && (
        <div
          className="absolute pointer-events-none bg-card text-card-foreground shadow-lg rounded-lg px-3 py-2 text-sm z-50 border border-border"
          style={{ left: tooltip.x + 12, top: tooltip.y - 44 }}
        >
          <p className="font-semibold">{tooltip.name}</p>
          <p className="text-muted-foreground">
            {tooltip.followers.toLocaleString()} seguidores
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(WorldMap);
