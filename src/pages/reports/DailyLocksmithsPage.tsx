import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import LocksmithDailyModule from "../../Components/reports/LocksmithDailyModule";

const DailyLocksmithsPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
        <LocksmithDailyModule />
    </PageContainer>
  );
};

export default DailyLocksmithsPage;
