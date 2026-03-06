import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ageDistribution } from "@/data/followersData";

type Gender = "all" | "male" | "female";

const AgeDistributionChart = () => {
  const [gender, setGender] = useState<Gender>("all");

  const data = ageDistribution.map((item) => ({
    range: item.range,
    value:
      gender === "male"
        ? item.male
        : gender === "female"
        ? item.female
        : item.male + item.female,
  }));

  const labels: Record<Gender, string> = {
    all: "Todos",
    male: "Hombres",
    female: "Mujeres",
  };

  const barColor =
    gender === "female"
      ? "hsl(300, 70%, 60%)"
      : gender === "male"
      ? "hsl(220, 70%, 50%)"
      : "hsl(32, 95%, 55%)";

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-card-foreground">
          Distribución por edad
        </h3>
        <div className="flex gap-1 bg-secondary rounded-lg p-0.5">
          {(["all", "male", "female"] as Gender[]).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                gender === g
                  ? "bg-card text-card-foreground shadow-sm"
                  : "text-muted-foreground hover:text-card-foreground"
              }`}
            >
              {labels[g]}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="range" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip
            formatter={(value: number) => [value.toLocaleString(), "Seguidores"]}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid hsl(220, 14%, 90%)",
              fontSize: 12,
            }}
          />
          <Bar dataKey="value" fill={barColor} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AgeDistributionChart;
