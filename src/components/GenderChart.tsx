import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { genderDistribution } from "@/data/followersData";

const GenderChart = () => {
  const data = [
    { name: "Hombres", value: genderDistribution.male },
    { name: "Mujeres", value: genderDistribution.female },
  ];

  const colors = ["hsl(220, 70%, 50%)", "hsl(300, 70%, 60%)"];

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">Género</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip
            formatter={(value: number) => [value.toLocaleString(), "Seguidores"]}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid hsl(220, 14%, 90%)",
              fontSize: 12,
            }}
            cursor={false}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderChart;
