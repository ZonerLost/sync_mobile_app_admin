import React from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../shared/layout/PageContainer";
import SlideOver from "../../shared/overlay/SlideOver";
import ConfirmDialog from "../../shared/overlay/ConfirmDialog";

import ProfileHeaderCard from "../../Components/admin-profile/ProfileHeaderCard";
import UserSettingsList, {
  type LanguageOption,
} from "../../Components/admin-profile/UserSettingsList";
import EditProfilePanel, {
  type EditProfileValues,
} from "../../Components/admin-profile/EditProfilePanel";
import ChangePasswordPanel, {
  type ChangePasswordValues,
} from "../../Components/admin-profile/ChangePasswordPanel";
// import { useAuth } from "../../context/AuthContext"; // when you wire your auth

interface UserProfileState {
  name: string;
  email: string;
  avatarUrl?: string;
}

const AdminProfilePage: React.FC = () => {
  // const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = React.useState<UserProfileState>({
    name: "Admin User",
    email: "admin@example.com",
    avatarUrl: undefined,
  });

  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] =
    React.useState(false);
  const [language, setLanguage] =
    React.useState<LanguageOption>("English");
  const [showLogoutConfirm, setShowLogoutConfirm] =
    React.useState(false);

  const handleEditSave = (values: EditProfileValues) => {
    setUserProfile((prev) => ({
      ...prev,
      name: values.name,
      email: values.email,
      avatarUrl: values.avatarUrl ?? undefined,
    }));
    setIsEditProfileOpen(false);
  };

  const handleChangePasswordSubmit = (values: ChangePasswordValues) => {
    // TODO: call your API here
    console.log("Change password:", values);
    setIsChangePasswordOpen(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    // if you have auth context:
    // logout();
    // clear tokens/storage here if needed
    navigate("/login", { replace: true });
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <PageContainer fullWidth>
      <div className="mx-auto flex w-full max-w-4xl flex-col space-y-4 md:space-y-5 xl:max-w-5xl">
        <div className="space-y-1 md:space-y-2">
          <h1 className="text-lg font-semibold text-gray-900 md:text-xl">
            Admin Profile
          </h1>
          <p className="text-xs text-gray-500 md:text-sm">
            Manage your admin account details, password and preferences.
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          <ProfileHeaderCard
            name={userProfile.name}
            email={userProfile.email}
            avatarUrl={userProfile.avatarUrl}
            onEditClick={() => setIsEditProfileOpen(true)}
          />

          <UserSettingsList
            onChangePassword={() => setIsChangePasswordOpen(true)}
            onLanguageClick={() => console.log("Language clicked")}
            language={language}
            onLanguageChange={setLanguage}
            onLogout={handleLogoutClick}
          />
        </div>
      </div>

      {/* Edit Profile slide-over */}
      <SlideOver
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        widthClassName="max-w-sm"
      >
        <EditProfilePanel
          initialName={userProfile.name}
          initialEmail={userProfile.email}
          initialAvatarUrl={userProfile.avatarUrl}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={handleEditSave}
        />
      </SlideOver>

      {/* Change Password slide-over */}
      <SlideOver
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        widthClassName="max-w-sm"
      >
        <ChangePasswordPanel
          onClose={() => setIsChangePasswordOpen(false)}
          onSubmit={handleChangePasswordSubmit}
        />
      </SlideOver>

      {/* Logout confirmation – use shared ConfirmDialog to avoid duplication */}
      <ConfirmDialog
        open={showLogoutConfirm}
        title="Log out?"
        description="You will be signed out of the admin panel and returned to the login page."
        confirmLabel="Logout"
        cancelLabel="Cancel"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
        destructive
      />
    </PageContainer>
  );
};

export default AdminProfilePage;
