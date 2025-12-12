import React from "react";
import SettingRow from "./SettingRow";
import { FiGlobe, FiLogOut, FiKey } from "react-icons/fi";

export type LanguageOption = "English" | "Spanish" | "Russian";

interface UserSettingsListProps {
  onChangePassword: () => void;
  onLanguageClick?: () => void;
  onLogout: () => void;
  language?: LanguageOption;
  onLanguageChange?: (language: LanguageOption) => void;
}

const UserSettingsList: React.FC<UserSettingsListProps> = ({
  onChangePassword,
  onLanguageClick,
  onLogout,
  language = "English",
  onLanguageChange,
}) => {
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<LanguageOption>(language);

  React.useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const handleLanguageChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const nextLanguage = event.target.value as LanguageOption;
    setSelectedLanguage(nextLanguage);
    onLanguageChange?.(nextLanguage);
    onLanguageClick?.();
  };

  return (
    <div className="mt-4">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
        Account Settings
      </div>

      <div className="space-y-2">
        <SettingRow
          icon={<FiKey className="h-4 w-4" />}
          label="Change Password"
          onClick={onChangePassword}
        />

        <div className="flex w-full items-center justify-between rounded-3xl bg-white px-4 py-3 text-sm shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
              <FiGlobe className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-gray-800">
              Language
            </span>
          </div>
          <select
            aria-label="Select language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="h-9 rounded-2xl border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Russian">Russian</option>
          </select>
        </div>

        <SettingRow
          icon={<FiLogOut className="h-4 w-4" />}
          label="Logout"
          isDestructive
          onClick={onLogout}
        />
      </div>
    </div>
  );
};

export default UserSettingsList;
