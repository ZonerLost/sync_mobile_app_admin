import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import OperatorOverviewModule from "../../Components/reports/OperatorOverviewModule";

const MonthlyOperatorsPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
      <OperatorOverviewModule mode="monthly" />
    </PageContainer>
  );
};

export default MonthlyOperatorsPage;
