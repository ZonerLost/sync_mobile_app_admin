import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import AccountantsModule from "../../Components/management/AccountantsModule";

const AccountantsPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
      <AccountantsModule />
    </PageContainer>
  );
};

export default AccountantsPage;
