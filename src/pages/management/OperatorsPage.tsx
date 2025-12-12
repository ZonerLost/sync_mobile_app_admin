import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import OperatorsModule from "../../Components/management/OperatorsModule";

const OperatorsPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
        <OperatorsModule />
    </PageContainer>
  );
};

export default OperatorsPage;
