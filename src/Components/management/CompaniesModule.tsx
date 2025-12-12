import React from "react";
import ManagementList, { type ManagementRow } from "./ManagementList";
import SlideOver from "../../shared/overlay/SlideOver";
import TextField from "../../shared/inputs/TextField";
import ConfirmDialog from "../../shared/overlay/ConfirmDialog";

type CompanyStatus = "Active" | "Pending" | "Inactive";

interface Company {
  id: string;
  name: string;
  contact: string;
  activeJobs: number;
  city: string;
  status: CompanyStatus;
}

const INITIAL_COMPANIES: Company[] = [
  {
    id: "co-1",
    name: "SafeKeys Ltd",
    contact: "Emma Johnson",
    activeJobs: 12,
    city: "London",
    status: "Active",
  },
  {
    id: "co-2",
    name: "DoorFix Solutions",
    contact: "Adam Brown",
    activeJobs: 7,
    city: "Manchester",
    status: "Active",
  },
  {
    id: "co-3",
    name: "Rapid Locks UK",
    contact: "Chloe Evans",
    activeJobs: 0,
    city: "Bristol",
    status: "Pending",
  },
  {
    id: "co-4",
    name: "City Access Services",
    contact: "Robert Harris",
    activeJobs: 0,
    city: "Leeds",
    status: "Inactive",
  },
];

const statusToBadgeClass = (status: CompanyStatus) => {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-600";
    case "Pending":
      return "bg-yellow-50 text-yellow-600";
    case "Inactive":
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const CompaniesModule: React.FC = () => {
  const [companies, setCompanies] =
    React.useState<Company[]>(INITIAL_COMPANIES);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Company | null>(null);
  const [deleteTarget, setDeleteTarget] =
    React.useState<Company | null>(null);

  const columns = ["Company", "Contact", "Active jobs", "City", "Status"];

  const rows: ManagementRow[] = companies.map((co) => ({
    id: co.id,
    cells: [
      co.name,
      co.contact,
      co.activeJobs,
      co.city,
      <span
        key="status"
        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusToBadgeClass(
          co.status
        )}`}
      >
        {co.status}
      </span>,
    ],
  }));

  const handleAddClick = () => {
    setEditing(null);
    setDrawerOpen(true);
  };

  const handleEditRow = (row: ManagementRow) => {
    const found = companies.find((co) => co.id === row.id);
    if (found) {
      setEditing(found);
      setDrawerOpen(true);
    }
  };

  const handleDeleteRow = (row: ManagementRow) => {
    const found = companies.find((co) => co.id === row.id);
    if (found) setDeleteTarget(found);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setCompanies((prev) => prev.filter((co) => co.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleSubmit = (values: Omit<Company, "id" | "activeJobs">) => {
    if (editing) {
      setCompanies((prev) =>
        prev.map((co) => (co.id === editing.id ? { ...co, ...values } : co))
      );
    } else {
      const newCo: Company = {
        id: `co-${Date.now()}`,
        activeJobs: 0,
        ...values,
      };
      setCompanies((prev) => [newCo, ...prev]);
    }
    setDrawerOpen(false);
    setEditing(null);
  };

  return (
    <>
      <ManagementList
        title="Companies list"
        description="Onboard, review and maintain company accounts."
        entityLabel="Company"
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
        <CompanyForm
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
        title="Delete company?"
        description={
          deleteTarget ? `Are you sure you want to remove ${deleteTarget.name}?` : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
};

interface CompanyFormProps {
  initial?: Company;
  onSubmit: (values: Omit<Company, "id" | "activeJobs">) => void;
  onCancel: () => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ initial, onSubmit, onCancel }) => {
  const [name, setName] = React.useState(initial?.name ?? "");
  const [contact, setContact] = React.useState(initial?.contact ?? "");
  const [city, setCity] = React.useState(initial?.city ?? "");
  const [status, setStatus] = React.useState<CompanyStatus>(initial?.status ?? "Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, contact, city, status });
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
          {initial ? "Edit company" : "Add company"}
        </h2>
        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 overflow-y-auto px-1.5 pb-4 sm:px-2">
        <div className="space-y-3">
          <TextField
            label="Company name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="SafeKeys Ltd"
          />
          <TextField
            label="Contact person"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Emma Johnson"
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
              onChange={(e) => setStatus(e.target.value as CompanyStatus)}
              className="h-9 rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
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
          {initial ? "Save changes →" : "Create company →"}
        </button>
      </div>
    </form>
  );
};

export default CompaniesModule;
