import React from "react";
import SectionCard from "../../shared/layout/SectionCard";
import SlideOver from "../../shared/overlay/SlideOver";
import ConfirmDialog from "../../shared/overlay/ConfirmDialog";
import ReportExportButtons from "./ReportExportButtons";

interface WeeklyCancellationItem {
  id: string;
  reason: string;
  count: number;
  percentage: number; // from total
  topCompany: string;
  topOperator: string;
}

const INITIAL_CANCELLATIONS: WeeklyCancellationItem[] = [
  {
    id: "wc-1",
    reason: "Customer no-show",
    count: 23,
    percentage: 32,
    topCompany: "SafeKeys Ltd",
    topOperator: "Operator 04",
  },
  {
    id: "wc-2",
    reason: "Quote too high",
    count: 18,
    percentage: 25,
    topCompany: "DoorFix Solutions",
    topOperator: "Operator 02",
  },
  {
    id: "wc-3",
    reason: "Locksmith delayed",
    count: 12,
    percentage: 17,
    topCompany: "Rapid Locks UK",
    topOperator: "Operator 01",
  },
  {
    id: "wc-4",
    reason: "Customer resolved themselves",
    count: 9,
    percentage: 13,
    topCompany: "City Access Services",
    topOperator: "Operator 06",
  },
];

const WeeklyCancellationsModule: React.FC = () => {
  const [range, setRange] = React.useState<string>("this-week");
  const [items, setItems] =
    React.useState<WeeklyCancellationItem[]>(INITIAL_CANCELLATIONS);

  const [selectedRow, setSelectedRow] =
    React.useState<WeeklyCancellationItem | null>(null);

  const [deleteTarget, setDeleteTarget] =
    React.useState<WeeklyCancellationItem | null>(null);

  const totalCancellations = React.useMemo(
    () => items.reduce((sum, it) => sum + it.count, 0),
    [items]
  );

  const handleExportCsv = () => {
    console.log("Export weekly cancellations CSV for range:", range);
  };
  const handleExportPdf = () => {
    console.log("Export weekly cancellations PDF for range:", range);
  };

  // ✅ reference from your previous chats: when deleting, close slider first
  const requestDelete = (row: WeeklyCancellationItem) => {
    setSelectedRow(null);
    setDeleteTarget(row);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((it) => it.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <SectionCard
      title="Weekly cancellations"
      description="Breakdown of cancellations by reason to support quality and product improvements."
    >
      {/* Toolbar */}
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Filters
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400">Range</span>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="h-9 w-full rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:h-8 sm:w-auto"
            >
              <option value="this-week">This week</option>
              <option value="last-week">Last week</option>
              <option value="last-4-weeks">Last 4 weeks</option>
            </select>
          </div>
        </div>

        <ReportExportButtons onExportCsv={handleExportCsv} onExportPdf={handleExportPdf} />
      </div>

      {/* Summary */}
      <div className="mb-3 rounded-2xl bg-gray-50 px-3 py-2 text-[11px] text-gray-700 sm:text-xs md:px-4 md:py-3">
        <span className="font-semibold text-gray-900">{totalCancellations}</span>{" "}
        total cancellations in this range.
      </div>

      {/* ✅ MOBILE CARDS */}
      <div className="space-y-2 md:hidden">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center text-[11px] text-gray-400">
            No cancellations recorded for this range.
          </div>
        ) : (
          items.map((row) => (
            <div key={row.id} className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-gray-900">
                    {row.reason}
                  </div>
                  <div className="mt-0.5 text-[11px] text-gray-500">
                    {row.percentage}% share • {row.count} cancels
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-gray-50 p-3 text-[11px] text-gray-800">
                <div>
                  <div className="text-gray-500">Top company</div>
                  <div className="font-semibold text-gray-900">{row.topCompany}</div>
                </div>
                <div>
                  <div className="text-gray-500">Top operator</div>
                  <div className="font-semibold text-gray-900">{row.topOperator}</div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRow(row)}
                  className="h-9 rounded-2xl bg-white px-3 text-[11px] font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => requestDelete(row)}
                  className="h-9 rounded-2xl bg-rose-50 px-3 text-[11px] font-semibold text-rose-600 shadow-sm hover:bg-rose-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ DESKTOP TABLE */}
      <div className="hidden overflow-x-auto pb-1 md:block">
        <table className="w-full min-w-[720px] table-auto border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Reason
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Count
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Share
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Top company
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Top operator
              </th>
              <th className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-xs text-gray-400">
                  No cancellations recorded for this range.
                </td>
              </tr>
            ) : (
              items.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/70">
                  <td className="px-3 py-2 text-gray-900">{row.reason}</td>
                  <td className="px-3 py-2 text-gray-800">{row.count}</td>
                  <td className="px-3 py-2 text-gray-800">{row.percentage}%</td>
                  <td className="px-3 py-2 text-gray-800">{row.topCompany}</td>
                  <td className="px-3 py-2 text-gray-800">{row.topOperator}</td>
                  <td className="px-3 py-2 text-right text-gray-500">
                    <div className="inline-flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRow(row)}
                        className="rounded-2xl bg-white px-3 py-1.5 text-[11px] font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => requestDelete(row)}
                        className="rounded-2xl bg-rose-50 px-3 py-1.5 text-[11px] font-semibold text-rose-600 shadow-sm hover:bg-rose-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <SlideOver
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        widthClassName="w-full sm:max-w-md"
      >
        {selectedRow && (
          <WeeklyCancellationDetailsPanel item={selectedRow} onClose={() => setSelectedRow(null)} />
        )}
      </SlideOver>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Remove cancellation reason?"
        description={
          deleteTarget
            ? `This will remove “${deleteTarget.reason}” from this weekly view.`
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

interface WeeklyCancellationDetailsPanelProps {
  item: WeeklyCancellationItem;
  onClose: () => void;
}

const WeeklyCancellationDetailsPanel: React.FC<WeeklyCancellationDetailsPanelProps> = ({
  item,
  onClose,
}) => {
  return (
    <div className="flex h-full flex-col bg-white px-3 pb-4 pt-3 sm:rounded-3xl sm:px-4 sm:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <span className="text-sm">×</span>
        </button>
        <h2 className="flex-1 text-center text-sm font-semibold text-gray-900">
          {item.reason}
        </h2>
        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-1.5 pb-4 text-[11px] text-gray-800 sm:px-2 sm:text-xs">
        <div className="grid grid-cols-1 gap-2 rounded-2xl bg-gray-50 p-3 sm:grid-cols-2">
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Count</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{item.count}</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Share</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{item.percentage}%</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Top company</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{item.topCompany}</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Top operator</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{item.topOperator}</div>
          </div>
        </div>

        <p className="mt-2 text-[11px] text-gray-500">
          Later you can show example jobs, timestamps, or customer feedback for this cancellation bucket.
        </p>
      </div>
    </div>
  );
};

export default WeeklyCancellationsModule;
