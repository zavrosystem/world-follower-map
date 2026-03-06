import WorldMap from "@/components/WorldMap";
import AgeDistributionChart from "@/components/AgeDistributionChart";
import GenderChart from "@/components/GenderChart";
import TopCitiesTable from "@/components/TopCitiesTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-5">
        <h1 className="text-xl font-bold text-foreground">
          Análisis de Seguidores
        </h1>

        {/* World Map */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-6">
          <WorldMap />
        </div>

        {/* Age + Gender Charts */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <div className="md:col-span-3">
            <AgeDistributionChart />
          </div>
          <div className="md:col-span-2">
            <GenderChart />
          </div>
        </div>

        {/* Top Cities */}
        <TopCitiesTable />
      </div>
    </div>
  );
};

export default Index;
