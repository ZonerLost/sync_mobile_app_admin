import React from "react";
import TextField from "../../shared/inputs/TextField";
import type { Accountant, AccountantStatus } from "./accountants.types";

interface AccountantFormProps {
  initial?: Accountant;
  onSubmit: (values: Omit<Accountant, "id" | "lastLogin">) => void;
  onCancel: () => void;
}

const AccountantForm: React.FC<AccountantFormProps> = ({
  initial,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = React.useState(initial?.name ?? "");
  const [email, setEmail] = React.useState(initial?.email ?? "");
  const [role, setRole] = React.useState(initial?.role ?? "");
  const [status, setStatus] = React.useState<AccountantStatus>(
    initial?.status ?? "Active"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, role, status });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col bg-white px-3 pb-4 pt-3 sm:rounded-3xl sm:px-4 sm:shadow-md md:px-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <span className="text-sm">×</span>
        </button>
        <h2 className="flex-1 text-center text-sm font-semibold text-gray-900">
          {initial ? "Edit accountant" : "Add accountant"}
        </h2>
        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 overflow-y-auto px-1.5 pb-4 sm:px-2">
        <div className="space-y-3">
          <TextField
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sarah Collins"
          />
          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sarah.collins@company.com"
          />
          <TextField
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Lead Accountant"
          />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as AccountantStatus)}
              className="h-9 rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-2 px-1.5 sm:px-2">
        <button
          type="submit"
          className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#0F5CCF] text-sm font-semibold text-white hover:bg-[#0d4fb3] focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {initial ? "Save changes →" : "Create accountant →"}
        </button>
      </div>
    </form>
  );
};

export default AccountantForm;
