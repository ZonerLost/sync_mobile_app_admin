import React from "react";
import AvatarCircle from "../../shared/data-display/AvatarCircle";
import TextField from "../../shared/inputs/TextField";
import { cn } from "../../utils/cn";

export interface EditProfileValues {
  name: string;
  email: string;
  avatarUrl?: string | null;
}

interface EditProfilePanelProps {
  initialName: string;
  initialEmail: string;
  initialAvatarUrl?: string;
  onClose: () => void;
  onSave: (values: EditProfileValues) => void;
}

const EditProfilePanel: React.FC<EditProfilePanelProps> = ({
  initialName,
  initialEmail,
  initialAvatarUrl,
  onClose,
  onSave,
}) => {
  const [name, setName] = React.useState(initialName);
  const [email, setEmail] = React.useState(initialEmail);
  const [avatarPreview, setAvatarPreview] = React.useState<
    string | undefined | null
  >(initialAvatarUrl ?? undefined);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    setName(initialName);
    setEmail(initialEmail);
    setAvatarPreview(initialAvatarUrl ?? undefined);
  }, [initialName, initialEmail, initialAvatarUrl]);

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      email,
      avatarUrl: avatarPreview,
    });
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
          Edit Profile
        </h2>
        <div className="h-8 w-8" /> {/* spacer */}
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {/* avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <AvatarCircle
              name={name}
              src={avatarPreview ?? undefined}
              size="xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-xs text-white">
                📷
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs font-medium text-gray-600">
            Upload Profile Photo
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="rounded-full border border-gray-200 px-4 py-1.5 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Remove photo
            </button>
            <button
              type="button"
              onClick={handleChangePhoto}
              className="rounded-full bg-blue-50 px-4 py-1.5 font-semibold text-blue-600 hover:bg-blue-100"
            >
              Change Photo
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* personal info */}
        <div className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          Personal Information
        </div>

        <div className="mt-2 space-y-3">
          <TextField
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Admin Name"
          />
          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
        </div>
      </div>

      {/* footer button */}
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

export default EditProfilePanel;
