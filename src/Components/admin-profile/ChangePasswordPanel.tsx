import React from "react";
import PasswordField from "../../shared/inputs/PasswordField";
import { cn } from "../../utils/cn";

export interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordPanelProps {
  onClose: () => void;
  onSubmit: (values: ChangePasswordValues) => void;
}

const ChangePasswordPanel: React.FC<ChangePasswordPanelProps> = ({
  onClose,
  onSubmit,
}) => {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password should be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setError(null);
    onSubmit({ currentPassword, newPassword, confirmPassword });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col rounded-3xl bg-white px-4 pb-4 pt-3 shadow-md"
    >
      {/* header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <span className="text-sm">×</span>
        </button>
        <h2 className="flex-1 text-center text-sm font-semibold text-gray-900">
          Change Password
        </h2>
        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <div className="space-y-3">
          <PasswordField
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
          />
          <PasswordField
            label="Create new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
          />
          <PasswordField
            label="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="mt-3 text-xs text-rose-500">
            {error}
          </div>
        )}
      </div>

      <div className="mt-2 px-2">
        <button
          type="submit"
          className={cn(
            "flex h-11 w-full items-center justify-center rounded-2xl bg-[#0F5CCF]",
            "text-sm font-semibold text-white",
            "hover:bg-[#0d4fb3] focus:outline-none focus:ring-2 focus:ring-blue-200"
          )}
        >
          Update →
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordPanel;
