import { useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { countryFollowers } from "@/data/followersData";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Antarctica ISO code
const ANTARCTICA_CODE = "010";

const WorldMap = () => {
  const [tooltip, setTooltip] = useState<{
    name: string;
    followers: number;
    x: number;
    y: number;
  } | null>(null);

  const getFollowers = (isoCode: string) => {
    const found = countryFollowers.find((c) => {
      const map: Record<string, string> = {
        MEX: "484", USA: "840", COL: "170", ARG: "032",
        ESP: "724", BRA: "076", CHL: "152", PER: "604",
        ECU: "218", GTM: "320",
      };
      return map[c.code] === isoCode;
    });
    return found?.followers || 0;
  };

  const getCountryName = (isoCode: string) => {
    const found = countryFollowers.find((c) => {
      const map: Record<string, string> = {
        MEX: "484", USA: "840", COL: "170", ARG: "032",
        ESP: "724", BRA: "076", CHL: "152", PER: "604",
        ECU: "218", GTM: "320",
      };
      return map[c.code] === isoCode;
    });
    return found?.country || "";
  };

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 120, center: [0, 30] }}
        className="w-full h-auto"
        style={{ maxHeight: 360 }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.id !== ANTARCTICA_CODE)
                .map((geo) => {
                  const followers = getFollowers(geo.id);
                  const hasFollowers = followers > 0;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e) => {
                        if (hasFollowers) {
                          const rect = (e.target as SVGElement).closest("svg")?.getBoundingClientRect();
                          setTooltip({
                            name: getCountryName(geo.id),
                            followers,
                            x: e.clientX - (rect?.left || 0),
                            y: e.clientY - (rect?.top || 0),
                          });
                        }
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        default: {
                          fill: hasFollowers ? "hsl(220, 70%, 50%)" : "hsl(220, 10%, 75%)",
                          stroke: "hsl(0, 0%, 100%)",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: hasFollowers ? "hsl(220, 70%, 40%)" : "hsl(220, 10%, 68%)",
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
        </ZoomableGroup>
      </ComposableMap>

      {tooltip && (
        <div
          className="absolute pointer-events-none bg-card text-card-foreground shadow-lg rounded-lg px-3 py-2 text-sm z-50 border border-border"
          style={{ left: tooltip.x + 10, top: tooltip.y - 40 }}
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
