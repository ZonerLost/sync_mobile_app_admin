import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import DailyCompanyReportModule from "../../Components/company-report/DailyCompanyReportModule";

const DailyCompanyPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
        <DailyCompanyReportModule />
    </PageContainer>
  );
};

export default DailyCompanyPage;
