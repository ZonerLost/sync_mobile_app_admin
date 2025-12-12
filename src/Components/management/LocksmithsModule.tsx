import React from "react";
import ManagementList, { type ManagementRow } from "./ManagementList";
import SlideOver from "../../shared/overlay/SlideOver";
import TextField from "../../shared/inputs/TextField";
import ConfirmDialog from "../../shared/overlay/ConfirmDialog";

type LocksmithStatus = "Active" | "Inactive" | "On break";

interface Locksmith {
  id: string;
  name: string;
  phone: string;
  city: string;
  jobsToday: number;
  status: LocksmithStatus;
}

const INITIAL_LOCKSMITHS: Locksmith[] = [
  {
    id: "ls-1",
    name: "John Carter",
    phone: "+44 7700 900001",
    city: "London",
    jobsToday: 6,
    status: "Active",
  },
  {
    id: "ls-2",
    name: "Emily Brown",
    phone: "+44 7700 900002",
    city: "Manchester",
    jobsToday: 4,
    status: "Active",
  },
  {
    id: "ls-3",
    name: "Liam Wilson",
    phone: "+44 7700 900003",
    city: "Birmingham",
    jobsToday: 0,
    status: "Inactive",
  },
  {
    id: "ls-4",
    name: "Sophia Green",
    phone: "+44 7700 900004",
    city: "Leeds",
    jobsToday: 2,
    status: "On break",
  },
];

const statusToBadgeClass = (status: LocksmithStatus) => {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-600";
    case "On break":
      return "bg-yellow-50 text-yellow-600";
    case "Inactive":
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const LocksmithsModule: React.FC = () => {
  const [locksmiths, setLocksmiths] = React.useState<Locksmith[]>(INITIAL_LOCKSMITHS);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Locksmith | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Locksmith | null>(null);

  const columns = ["Name", "Phone", "City", "Jobs today", "Status"];

  const rows: ManagementRow[] = locksmiths.map((ls) => ({
    id: ls.id,
    cells: [
      ls.name,
      ls.phone,
      ls.city,
      ls.jobsToday,
      <span
        key="status"
        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusToBadgeClass(
          ls.status
        )}`}
      >
        {ls.status}
      </span>,
    ],
  }));

  const handleAddClick = () => {
    setEditing(null);
    setDrawerOpen(true);
  };

  const handleEditRow = (row: ManagementRow) => {
    const found = locksmiths.find((ls) => ls.id === row.id);
    if (found) {
      setEditing(found);
      setDrawerOpen(true);
    }
  };

  const handleDeleteRow = (row: ManagementRow) => {
    const found = locksmiths.find((ls) => ls.id === row.id);
    if (found) setDeleteTarget(found);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setLocksmiths((prev) => prev.filter((ls) => ls.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleSubmit = (values: Omit<Locksmith, "id" | "jobsToday">) => {
    if (editing) {
      setLocksmiths((prev) =>
        prev.map((ls) => (ls.id === editing.id ? { ...ls, ...values } : ls))
      );
    } else {
      const newLocksmith: Locksmith = {
        id: `ls-${Date.now()}`,
        jobsToday: 0,
        ...values,
      };
      setLocksmiths((prev) => [newLocksmith, ...prev]);
    }
    setDrawerOpen(false);
    setEditing(null);
  };

  return (
    <>
      <ManagementList
        title="Locksmiths list"
        description="Overview of all locksmiths connected to SYC Mobile."
        entityLabel="Locksmith"
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
        <LocksmithForm
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
        title="Delete locksmith?"
        description={
          deleteTarget
            ? `Are you sure you want to remove ${deleteTarget.name} from locksmiths?`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
};

interface LocksmithFormProps {
  initial?: Locksmith;
  onSubmit: (values: Omit<Locksmith, "id" | "jobsToday">) => void;
  onCancel: () => void;
}

const LocksmithForm: React.FC<LocksmithFormProps> = ({ initial, onSubmit, onCancel }) => {
  const [name, setName] = React.useState(initial?.name ?? "");
  const [phone, setPhone] = React.useState(initial?.phone ?? "");
  const [city, setCity] = React.useState(initial?.city ?? "");
  const [status, setStatus] = React.useState<LocksmithStatus>(initial?.status ?? "Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, phone, city, status });
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
          {initial ? "Edit locksmith" : "Add locksmith"}
        </h2>
        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 overflow-y-auto px-1.5 pb-4 sm:px-2">
        <div className="space-y-3">
          <TextField
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Carter"
          />
          <TextField
            label="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+44 7700 900001"
          />
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="London"
          />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as LocksmithStatus)}
              className="h-9 rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="Active">Active</option>
              <option value="On break">On break</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-2 px-1.5 sm:px-2">
        <button
          type="submit"
          className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#0F5CCF] text-sm font-semibold text-white hover:bg-[#0d4fb3] focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {initial ? "Save changes →" : "Create locksmith →"}
        </button>
      </div>
    </form>
  );
};

export default LocksmithsModule;
