import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import LocksmithsModule from "../../Components/management/LocksmithsModule";

const LocksmithsPage: React.FC = () => {
  return (
    <PageContainer fullWidth>
        <LocksmithsModule />
    </PageContainer>
  );
};

export default LocksmithsPage;
