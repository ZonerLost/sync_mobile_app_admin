import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import CompanyListModule from "../../Components/company-report/CompanyListModule";

const CompanyListPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
        <CompanyListModule />
    </PageContainer>
  );
};

export default CompanyListPage;
