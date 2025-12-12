import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import CompaniesModule from "../../Components/management/CompaniesModule";

const CompaniesPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
        <CompaniesModule />
    </PageContainer>
  );
};

export default CompaniesPage;
