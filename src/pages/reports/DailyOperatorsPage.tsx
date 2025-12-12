import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import OperatorOverviewModule from "../../Components/reports/OperatorOverviewModule";

const DailyOperatorsPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
      <OperatorOverviewModule mode="daily" />
    </PageContainer>
  );
};

export default DailyOperatorsPage;
