import React from "react";
import AvatarCircle from "../../shared/data-display/AvatarCircle";
import { cn } from "../../utils/cn";

interface ProfileHeaderCardProps {
  name: string;
  email: string;
  avatarUrl?: string;
  onEditClick: () => void;
}

const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({
  name,
  email,
  avatarUrl,
  onEditClick,
}) => {
  return (
    <div className="mb-4 flex items-center justify-between rounded-3xl bg-white px-4 py-3 shadow-sm md:px-6 md:py-4">
      <div className="flex items-center gap-3">
        <AvatarCircle name={name} src={avatarUrl} size="lg" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">
            {name}
          </span>
          <span className="text-xs text-gray-500">{email}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onEditClick}
        className={cn(
          "hidden rounded-2xl bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm",
          "hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700/40",
          "sm:inline-flex"
        )}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeaderCard;
