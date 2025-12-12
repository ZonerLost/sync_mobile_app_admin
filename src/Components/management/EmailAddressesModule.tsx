import React from "react";
import ManagementList, { type ManagementRow } from "./ManagementList";
import SlideOver from "../../shared/overlay/SlideOver";
import TextField from "../../shared/inputs/TextField";
import ConfirmDialog from "../../shared/overlay/ConfirmDialog";

type EmailStatus = "Active" | "Limited" | "Disabled";

interface EmailAddress {
  id: string;
  label: string;
  email: string;
  type: string;
  linkedTo: string;
  status: EmailStatus;
}

const INITIAL_EMAILS: EmailAddress[] = [
  {
    id: "em-1",
    label: "System notifications",
    email: "no-reply@sycmobile.com",
    type: "System",
    linkedTo: "Platform",
    status: "Active",
  },
  {
    id: "em-2",
    label: "Finance reports",
    email: "finance-reports@sycmobile.com",
    type: "Reports",
    linkedTo: "Accounting",
    status: "Active",
  },
  {
    id: "em-3",
    label: "Support inbox",
    email: "support@sycmobile.com",
    type: "Support",
    linkedTo: "Support team",
    status: "Limited",
  },
  {
    id: "em-4",
    label: "Legacy alerts",
    email: "legacy-alerts@sycmobile.com",
    type: "System",
    linkedTo: "Old system",
    status: "Disabled",
  },
];

const statusToBadgeClass = (status: EmailStatus) => {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-600";
    case "Limited":
      return "bg-yellow-50 text-yellow-600";
    case "Disabled":
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const EmailAddressesModule: React.FC = () => {
  const [emails, setEmails] = React.useState<EmailAddress[]>(INITIAL_EMAILS);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<EmailAddress | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<EmailAddress | null>(null);

  const columns = ["Label", "Email", "Type", "Linked to", "Status"];

  const rows: ManagementRow[] = emails.map((em) => ({
    id: em.id,
    cells: [
      em.label,
      em.email,
      em.type,
      em.linkedTo,
      <span
        key="status"
        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusToBadgeClass(
          em.status
        )}`}
      >
        {em.status}
      </span>,
    ],
  }));

  const handleAddClick = () => {
    setEditing(null);
    setDrawerOpen(true);
  };

  const handleEditRow = (row: ManagementRow) => {
    const found = emails.find((em) => em.id === row.id);
    if (found) {
      setEditing(found);
      setDrawerOpen(true);
    }
  };

  const handleDeleteRow = (row: ManagementRow) => {
    const found = emails.find((em) => em.id === row.id);
    if (found) setDeleteTarget(found);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setEmails((prev) => prev.filter((em) => em.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleSubmit = (values: Omit<EmailAddress, "id">) => {
    if (editing) {
      setEmails((prev) => prev.map((em) => (em.id === editing.id ? { ...em, ...values } : em)));
    } else {
      const newEm: EmailAddress = { id: `em-${Date.now()}`, ...values };
      setEmails((prev) => [newEm, ...prev]);
    }
    setDrawerOpen(false);
    setEditing(null);
  };

  return (
    <>
      <ManagementList
        title="Email addresses list"
        description="Control where system alerts and reports are delivered."
        entityLabel="Email address"
        columns={columns}
        rows={rows}
        onAddClick={handleAddClick}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
      />

      <SlideOver
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditing(null);
        }}
        widthClassName="w-full max-w-md"
      >
        <EmailAddressForm
          initial={editing ?? undefined}
          onCancel={() => {
            setDrawerOpen(false);
            setEditing(null);
          }}
          onSubmit={handleSubmit}
        />
      </SlideOver>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete email address?"
        description={
          deleteTarget ? `Are you sure you want to remove ${deleteTarget.label}?` : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
};

interface EmailAddressFormProps {
  initial?: EmailAddress;
  onSubmit: (values: Omit<EmailAddress, "id">) => void;
  onCancel: () => void;
}

const EmailAddressForm: React.FC<EmailAddressFormProps> = ({ initial, onSubmit, onCancel }) => {
  const [label, setLabel] = React.useState(initial?.label ?? "");
  const [email, setEmail] = React.useState(initial?.email ?? "");
  const [type, setType] = React.useState(initial?.type ?? "System");
  const [linkedTo, setLinkedTo] = React.useState(initial?.linkedTo ?? "");
  const [status, setStatus] = React.useState<EmailStatus>(initial?.status ?? "Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ label, email, type, linkedTo, status });
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
          {initial ? "Edit email address" : "Add email address"}
        </h2>
        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 overflow-y-auto px-1.5 pb-4 sm:px-2">
        <div className="space-y-3">
          <TextField
            label="Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="System notifications"
          />
          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="no-reply@sycmobile.com"
          />
          <TextField
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="System / Support / Reports"
          />
          <TextField
            label="Linked to"
            value={linkedTo}
            onChange={(e) => setLinkedTo(e.target.value)}
            placeholder="Platform, Support team, Accounting..."
          />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as EmailStatus)}
              className="h-9 rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="Active">Active</option>
              <option value="Limited">Limited</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-2 px-1.5 sm:px-2">
        <button
          type="submit"
          className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#0F5CCF] text-sm font-semibold text-white hover:bg-[#0d4fb3] focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {initial ? "Save changes →" : "Create email address →"}
        </button>
      </div>
    </form>
  );
};

export default EmailAddressesModule;
