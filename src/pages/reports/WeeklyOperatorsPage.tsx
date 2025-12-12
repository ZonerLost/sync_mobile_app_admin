import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import OperatorOverviewModule from "../../Components/reports/OperatorOverviewModule";

const WeeklyOperatorsPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
      <OperatorOverviewModule mode="weekly" />
    </PageContainer>
  );
};

export default WeeklyOperatorsPage;
