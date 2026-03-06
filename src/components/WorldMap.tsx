import { memo } from "react";
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
  const getFollowers = (isoCode: string) => {
    const found = countryFollowers.find((c) => isoMap[c.code] === isoCode);
    return found?.followers || 0;
  };

  return (
    <div className="w-full pointer-events-none select-none">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 120, center: [0, 30] }}
        className="w-full h-auto"
        style={{ maxHeight: 360 }}
      >
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
                    style={{
                      default: {
                        fill: hasFollowers ? "hsl(220, 70%, 50%)" : "hsl(220, 10%, 75%)",
                        stroke: "hsl(0, 0%, 100%)",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: hasFollowers ? "hsl(220, 70%, 50%)" : "hsl(220, 10%, 75%)",
                        stroke: "hsl(0, 0%, 100%)",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default memo(WorldMap);
