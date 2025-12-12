import React from "react";
import ManagementList, { type ManagementRow } from "./ManagementList";
import SlideOver from "../../shared/overlay/SlideOver";
import TextField from "../../shared/inputs/TextField";
import ConfirmDialog from "../../shared/overlay/ConfirmDialog";

type OperatorStatus = "Online" | "Away" | "Offline";

interface Operator {
  id: string;
  name: string;
  phone: string;
  shift: string;
  activeJobs: number;
  status: OperatorStatus;
}

const INITIAL_OPERATORS: Operator[] = [
  {
    id: "op-1",
    name: "Olivia Martin",
    phone: "+44 7700 910001",
    shift: "Morning",
    activeJobs: 5,
    status: "Online",
  },
  {
    id: "op-2",
    name: "James Scott",
    phone: "+44 7700 910002",
    shift: "Evening",
    activeJobs: 3,
    status: "Online",
  },
  {
    id: "op-3",
    name: "Isabella Lee",
    phone: "+44 7700 910003",
    shift: "Night",
    activeJobs: 1,
    status: "Away",
  },
  {
    id: "op-4",
    name: "Daniel Clark",
    phone: "+44 7700 910004",
    shift: "Morning",
    activeJobs: 0,
    status: "Offline",
  },
];

const statusToBadgeClass = (status: OperatorStatus) => {
  switch (status) {
    case "Online":
      return "bg-emerald-50 text-emerald-600";
    case "Away":
      return "bg-yellow-50 text-yellow-600";
    case "Offline":
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const OperatorsModule: React.FC = () => {
  const [operators, setOperators] = React.useState<Operator[]>(INITIAL_OPERATORS);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Operator | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Operator | null>(null);

  const columns = ["Name", "Phone", "Shift", "Active jobs", "Status"];

  const rows: ManagementRow[] = operators.map((op) => ({
    id: op.id,
    cells: [
      op.name,
      op.phone,
      op.shift,
      op.activeJobs,
      <span
        key="status"
        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusToBadgeClass(
          op.status
        )}`}
      >
        {op.status}
      </span>,
    ],
  }));

  const handleAddClick = () => {
    setEditing(null);
    setDrawerOpen(true);
  };

  const handleEditRow = (row: ManagementRow) => {
    const found = operators.find((op) => op.id === row.id);
    if (found) {
      setEditing(found);
      setDrawerOpen(true);
    }
  };

  const handleDeleteRow = (row: ManagementRow) => {
    const found = operators.find((op) => op.id === row.id);
    if (found) setDeleteTarget(found);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setOperators((prev) => prev.filter((op) => op.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleSubmit = (values: Omit<Operator, "id" | "activeJobs">) => {
    if (editing) {
      setOperators((prev) =>
        prev.map((op) => (op.id === editing.id ? { ...op, ...values } : op))
      );
    } else {
      const newOp: Operator = {
        id: `op-${Date.now()}`,
        activeJobs: 0,
        ...values,
      };
      setOperators((prev) => [newOp, ...prev]);
    }
    setDrawerOpen(false);
    setEditing(null);
  };

  return (
    <>
      <ManagementList
        title="Operators list"
        description="Overview of all operators and their current workload."
        entityLabel="Operator"
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
        <OperatorForm
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
        title="Delete operator?"
        description={
          deleteTarget
            ? `Are you sure you want to remove ${deleteTarget.name} from operators?`
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

interface OperatorFormProps {
  initial?: Operator;
  onSubmit: (values: Omit<Operator, "id" | "activeJobs">) => void;
  onCancel: () => void;
}

const OperatorForm: React.FC<OperatorFormProps> = ({ initial, onSubmit, onCancel }) => {
  const [name, setName] = React.useState(initial?.name ?? "");
  const [phone, setPhone] = React.useState(initial?.phone ?? "");
  const [shift, setShift] = React.useState(initial?.shift ?? "Morning");
  const [status, setStatus] = React.useState<OperatorStatus>(initial?.status ?? "Online");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, phone, shift, status });
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
          {initial ? "Edit operator" : "Add operator"}
        </h2>
        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 overflow-y-auto px-1.5 pb-4 sm:px-2">
        <div className="space-y-3">
          <TextField
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Olivia Martin"
          />
          <TextField
            label="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+44 7700 910001"
          />

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">Shift</label>
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="h-9 rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OperatorStatus)}
              className="h-9 rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="Online">Online</option>
              <option value="Away">Away</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-2 px-1.5 sm:px-2">
        <button
          type="submit"
          className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#0F5CCF] text-sm font-semibold text-white hover:bg-[#0d4fb3] focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {initial ? "Save changes →" : "Create operator →"}
        </button>
      </div>
    </form>
  );
};

export default OperatorsModule;
