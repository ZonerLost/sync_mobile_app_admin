import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import EmailAddressesModule from "../../Components/management/EmailAddressesModule";

const EmailAddressesPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
      <EmailAddressesModule />
    </PageContainer>
  );
};

export default EmailAddressesPage;
