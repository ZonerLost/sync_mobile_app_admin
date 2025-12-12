import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import LocksmithWeeklyModule from "../../Components/reports/LocksmithWeeklyModule";

const WeeklyLocksmithsPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
      <LocksmithWeeklyModule />
    </PageContainer>
  );
};

export default WeeklyLocksmithsPage;
