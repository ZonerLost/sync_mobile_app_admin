import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import WeeklyCancellationsModule from "../../Components/reports/WeeklyCancellationsModule";

const WeeklyCancelledPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
      <WeeklyCancellationsModule />
    </PageContainer>
  );
};

export default WeeklyCancelledPage;
