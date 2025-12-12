import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import RevenueReportsModule from "../../Components/reports/RevenueReportsModule";

const LocksmithRevenuePage: React.FC = () => {
  return (
    <PageContainer fullWidth>
      <RevenueReportsModule />
    </PageContainer>
  );
};

export default LocksmithRevenuePage;
