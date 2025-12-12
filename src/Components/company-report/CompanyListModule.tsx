import React from "react";
import ManagementList, { type ManagementRow } from "../management/ManagementList";
import SectionCard from "../../shared/layout/SectionCard";
import SlideOver from "../../shared/overlay/SlideOver";
import ConfirmDialog from "../../shared/overlay/ConfirmDialog";
import TextField from "../../shared/inputs/TextField";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

type CompanyStatus = "Active" | "Pending" | "Inactive";

interface CompanyListItem {
  id: string;
  name: string;
  city: string;
  contactName: string;
  billingEmail: string;
  totalJobs: number;
  cancelledJobs: number;
  revenue: number;
  status: CompanyStatus;
}

const INITIAL_COMPANIES: CompanyListItem[] = [
  {
    id: "rep-co-1",
    name: "SafeKeys Ltd",
    city: "London",
    contactName: "Emma Johnson",
    billingEmail: "emma@safekeys.co.uk",
    totalJobs: 320,
    cancelledJobs: 14,
    revenue: 18250,
    status: "Active",
  },
  {
    id: "rep-co-2",
    name: "DoorFix Solutions",
    city: "Manchester",
    contactName: "Adam Brown",
    billingEmail: "adam@doorfix.co.uk",
    totalJobs: 210,
    cancelledJobs: 9,
    revenue: 12680,
    status: "Active",
  },
  {
    id: "rep-co-3",
    name: "Rapid Locks UK",
    city: "Bristol",
    contactName: "Chloe Evans",
    billingEmail: "chloe@rapidlocks.uk",
    totalJobs: 95,
    cancelledJobs: 7,
    revenue: 6540,
    status: "Pending",
  },
  {
    id: "rep-co-4",
    name: "City Access Services",
    city: "Leeds",
    contactName: "Robert Harris",
    billingEmail: "robert@cityaccess.co.uk",
    totalJobs: 40,
    cancelledJobs: 6,
    revenue: 2800,
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

const CompanyListModule: React.FC = () => {
  const [companies, setCompanies] = React.useState<CompanyListItem[]>(INITIAL_COMPANIES);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<CompanyListItem | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<CompanyListItem | null>(null);

  const columns = ["Company", "Contact", "Total jobs", "Cancellations", "Revenue", "Status"];

  const rows: ManagementRow[] = companies.map((co) => ({
    id: co.id,
    cells: [
      <div key="company" className="flex flex-col">
        <span className="text-xs font-semibold text-gray-900">{co.name}</span>
        <span className="text-[11px] text-gray-500">{co.city}</span>
      </div>,
      <div key="contact" className="flex flex-col">
        <span className="text-xs text-gray-900">{co.contactName}</span>
        <span className="text-[11px] text-gray-500">{co.billingEmail}</span>
      </div>,
      co.totalJobs,
      co.cancelledJobs,
      `£${co.revenue.toLocaleString()}`,
      <span
        key="status"
        className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusToBadgeClass(
          co.status
        )}`}
      >
        {co.status}
      </span>,
    ],
  }));

  const openAdd = () => {
    setEditing(null);
    setDrawerOpen(true);
  };

  const openEdit = (co: CompanyListItem) => {
    setEditing(co);
    setDrawerOpen(true);
  };

  const openDelete = (co: CompanyListItem) => setDeleteTarget(co);

  const handleEditRow = (row: ManagementRow) => {
    const found = companies.find((co) => co.id === row.id);
    if (found) openEdit(found);
  };

  const handleDeleteRow = (row: ManagementRow) => {
    const found = companies.find((co) => co.id === row.id);
    if (found) openDelete(found);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setCompanies((prev) => prev.filter((co) => co.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleSubmit = (
    values: Omit<CompanyListItem, "id" | "totalJobs" | "cancelledJobs" | "revenue">
  ) => {
    if (editing) {
      setCompanies((prev) =>
        prev.map((co) => (co.id === editing.id ? { ...co, ...values } : co))
      );
    } else {
      const newCo: CompanyListItem = {
        id: `rep-co-${Date.now()}`,
        totalJobs: 0,
        cancelledJobs: 0,
        revenue: 0,
        ...values,
      };
      setCompanies((prev) => [newCo, ...prev]);
    }
    setDrawerOpen(false);
    setEditing(null);
  };

  return (
    <SectionCard
      title="Company list"
      description="High-level overview of companies using SYC Mobile with aggregated stats."
      className="space-y-3"
    >
      {/* ✅ Mobile cards */}
      <div className="md:hidden">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-900">Companies</div>
          <button
            type="button"
            onClick={openAdd}
            className="rounded-2xl bg-[#0F5CCF] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0d4fb3]"
          >
            + Add company
          </button>
        </div>

        <div className="space-y-2">
          {companies.map((co) => (
            <div
              key={co.id}
              className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-gray-900">
                    {co.name}
                  </div>
                  <div className="text-[11px] text-gray-500">{co.city}</div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusToBadgeClass(
                    co.status
                  )}`}
                >
                  {co.status}
                </span>
              </div>

              <div className="mt-2 text-[11px] text-gray-700">
                <div className="truncate">
                  <span className="font-semibold text-gray-900">{co.contactName}</span>{" "}
                  • {co.billingEmail}
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-gray-50 p-3 text-[11px]">
                <div>
                  <div className="text-gray-500">Jobs</div>
                  <div className="mt-0.5 font-semibold text-gray-900">{co.totalJobs}</div>
                </div>
                <div>
                  <div className="text-gray-500">Cancel</div>
                  <div className="mt-0.5 font-semibold text-gray-900">{co.cancelledJobs}</div>
                </div>
                <div>
                  <div className="text-gray-500">Revenue</div>
                  <div className="mt-0.5 font-semibold text-gray-900">
                    £{co.revenue.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(co)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <FiEdit2 className="h-4 w-4" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => openDelete(co)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                >
                  <FiTrash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Tablet/Laptop table */}
      <div className="hidden md:block">
        <ManagementList
          title=""
          description={undefined}
          entityLabel="Company"
          columns={columns}
          rows={rows}
          onAddClick={openAdd}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
        />
      </div>

      <SlideOver
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditing(null);
        }}
        widthClassName="w-full max-w-md"
      >
        <CompanyEditForm
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
        title="Remove company?"
        description={
          deleteTarget
            ? `Are you sure you want to remove ${deleteTarget.name} from company reports?`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </SectionCard>
  );
};

interface CompanyEditFormProps {
  initial?: CompanyListItem;
  onSubmit: (
    values: Omit<CompanyListItem, "id" | "totalJobs" | "cancelledJobs" | "revenue">
  ) => void;
  onCancel: () => void;
}

const CompanyEditForm: React.FC<CompanyEditFormProps> = ({ initial, onSubmit, onCancel }) => {
  const [name, setName] = React.useState(initial?.name ?? "");
  const [city, setCity] = React.useState(initial?.city ?? "");
  const [contactName, setContactName] = React.useState(initial?.contactName ?? "");
  const [billingEmail, setBillingEmail] = React.useState(initial?.billingEmail ?? "");
  const [status, setStatus] = React.useState<CompanyStatus>(initial?.status ?? "Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, city, contactName, billingEmail, status });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col bg-white px-4 pb-4 pt-3 sm:rounded-3xl sm:shadow-md"
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

      <div className="flex-1 overflow-y-auto px-1 pb-4 sm:px-2">
        <div className="space-y-3">
          <TextField
            label="Company name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="SafeKeys Ltd"
          />
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="London"
          />
          <TextField
            label="Contact person"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Emma Johnson"
          />
          <TextField
            label="Billing email"
            type="email"
            value={billingEmail}
            onChange={(e) => setBillingEmail(e.target.value)}
            placeholder="emma@safekeys.co.uk"
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

      <div className="mt-2">
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

export default CompanyListModule;
