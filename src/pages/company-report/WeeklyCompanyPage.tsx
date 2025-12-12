import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import WeeklyCompanyReportModule from "../../Components/company-report/WeeklyCompanyReportModule";

const WeeklyCompanyPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
        <WeeklyCompanyReportModule />
    </PageContainer>
  );
};

export default WeeklyCompanyPage;
