import React from "react";
import AdminDashboardContent, {
  type RangeOptionId,
  type DashboardKpis,
} from "../../Components/dashboard/AdminDashboardContent";

const DashboardPage: React.FC = () => {
  const [range, setRange] = React.useState<RangeOptionId>("7d");

  const kpis: DashboardKpis = {
    totalJobs: 768,
    totalRevenue: 15432,
    cancellationsRate: 4.2,
    companiesIn: 21,
    companiesOut: 3,
  };

  return (
    <AdminDashboardContent
      range={range}
      onRangeChange={setRange}
      kpis={kpis}
    />
  );
};

export default DashboardPage;
