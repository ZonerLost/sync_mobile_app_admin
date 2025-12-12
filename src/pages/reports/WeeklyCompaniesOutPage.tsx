import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import WeeklyCompaniesMovementModule from "../../Components/reports/WeeklyCompaniesMovementModule";

const WeeklyCompaniesOutPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
      <WeeklyCompaniesMovementModule variant="out" />
    </PageContainer>
  );
};

export default WeeklyCompaniesOutPage;
