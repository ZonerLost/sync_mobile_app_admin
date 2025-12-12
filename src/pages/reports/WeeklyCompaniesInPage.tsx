import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import WeeklyCompaniesMovementModule from "../../Components/reports/WeeklyCompaniesMovementModule";

const WeeklyCompaniesInPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
      <WeeklyCompaniesMovementModule variant="in" />
    </PageContainer>
  );
};

export default WeeklyCompaniesInPage;
