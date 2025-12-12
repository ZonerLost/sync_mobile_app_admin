import React from "react";
import ManagementList, { type ManagementRow } from "./ManagementList";
import SlideOver from "../../shared/overlay/SlideOver";
import ConfirmDialog from "../../shared/overlay/ConfirmDialog";
import AccountantForm from "./AccountantForm";
import { INITIAL_ACCOUNTANTS, statusToBadgeClass } from "./accountants.types";
import type { Accountant } from "./accountants.types";

const AccountantsModule: React.FC = () => {
  const [accountants, setAccountants] =
    React.useState<Accountant[]>(INITIAL_ACCOUNTANTS);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Accountant | null>(null);
  const [deleteTarget, setDeleteTarget] =
    React.useState<Accountant | null>(null);

  const columns = ["Name", "Email", "Role", "Last login", "Status"];

  const rows: ManagementRow[] = accountants.map((ac) => ({
    id: ac.id,
    cells: [
      ac.name,
      ac.email,
      ac.role,
      ac.lastLogin,
      <span
        key="status"
        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusToBadgeClass(
          ac.status
        )}`}
      >
        {ac.status}
      </span>,
    ],
  }));

  const handleAddClick = () => {
    setEditing(null);
    setDrawerOpen(true);
  };

  const handleEditRow = (row: ManagementRow) => {
    const found = accountants.find((ac) => ac.id === row.id);
    if (found) {
      setEditing(found);
      setDrawerOpen(true);
    }
  };

  const handleDeleteRow = (row: ManagementRow) => {
    const found = accountants.find((ac) => ac.id === row.id);
    if (found) setDeleteTarget(found);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setAccountants((prev) => prev.filter((ac) => ac.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleSubmit = (values: Omit<Accountant, "id" | "lastLogin">) => {
    if (editing) {
      setAccountants((prev) =>
        prev.map((ac) => (ac.id === editing.id ? { ...ac, ...values } : ac))
      );
    } else {
      const newAc: Accountant = {
        id: `ac-${Date.now()}`,
        lastLogin: "Never",
        ...values,
      };
      setAccountants((prev) => [newAc, ...prev]);
    }
    setDrawerOpen(false);
    setEditing(null);
  };

  return (
    <>
      <ManagementList
        title="Accountants list"
        description="Control access to financial reporting and exports."
        entityLabel="Accountant"
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
        <AccountantForm
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
        title="Delete accountant?"
        description={
          deleteTarget
            ? `Are you sure you want to remove ${deleteTarget.name} from accountants?`
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

export default AccountantsModule;
