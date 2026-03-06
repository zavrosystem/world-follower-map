import { topCities } from "@/data/followersData";

const TopCitiesTable = () => {
  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <h3 className="text-sm font-semibold text-card-foreground mb-4 uppercase tracking-wide">
        Top Ciudades
      </h3>
      <div className="space-y-0">
        {topCities.map((city, i) => (
          <div
            key={city.city}
            className={`flex items-center justify-between py-3 ${
              i !== topCities.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-1 h-6 rounded-full flex-shrink-0"
                style={{
                  backgroundColor:
                    i === 0
                      ? "hsl(32, 95%, 55%)"
                      : i < 3
                      ? "hsl(45, 95%, 55%)"
                      : "hsl(220, 14%, 80%)",
                }}
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">
                  {city.city}, {city.country}
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
              <span className="text-sm font-semibold text-card-foreground">
                {city.percentage}%
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                {city.followers.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCitiesTable;
