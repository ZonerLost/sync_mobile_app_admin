import React from "react";
import SectionCard from "../../shared/layout/SectionCard";
import SlideOver from "../../shared/overlay/SlideOver";
import StatCard from "../../shared/data-display/StatCard";
import ReportExportButtons from "./ReportExportButtons";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type RevenueDimension = "company" | "locksmith" | "operator";

interface RevenueRow {
  id: string;
  name: string; // company / locksmith / operator
  jobs: number;
  revenue: number;
  avgPerJob: number;
  sharePercent: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RevenueReportsModuleProps {}

const COMPANY_REVENUE: RevenueRow[] = [
  {
    id: "c-1",
    name: "SafeKeys Ltd",
    jobs: 142,
    revenue: 8250,
    avgPerJob: 58,
    sharePercent: 32,
  },
  {
    id: "c-2",
    name: "DoorFix Solutions",
    jobs: 118,
    revenue: 6970,
    avgPerJob: 59,
    sharePercent: 27,
  },
  {
    id: "c-3",
    name: "Rapid Locks UK",
    jobs: 91,
    revenue: 5240,
    avgPerJob: 57,
    sharePercent: 21,
  },
  {
    id: "c-4",
    name: "City Access Services",
    jobs: 65,
    revenue: 3550,
    avgPerJob: 54,
    sharePercent: 13,
  },
];

const LOCKSMITH_REVENUE: RevenueRow[] = [
  {
    id: "l-1",
    name: "John Miller",
    jobs: 76,
    revenue: 4320,
    avgPerJob: 57,
    sharePercent: 19,
  },
  {
    id: "l-2",
    name: "Sarah Collins",
    jobs: 69,
    revenue: 4110,
    avgPerJob: 60,
    sharePercent: 18,
  },
  {
    id: "l-3",
    name: "Adam Brown",
    jobs: 52,
    revenue: 2930,
    avgPerJob: 56,
    sharePercent: 13,
  },
];

const OPERATOR_REVENUE: RevenueRow[] = [
  {
    id: "o-1",
    name: "Operator 01",
    jobs: 102,
    revenue: 5850,
    avgPerJob: 57,
    sharePercent: 23,
  },
  {
    id: "o-2",
    name: "Operator 02",
    jobs: 88,
    revenue: 5040,
    avgPerJob: 57,
    sharePercent: 20,
  },
  {
    id: "o-3",
    name: "Operator 03",
    jobs: 67,
    revenue: 3830,
    avgPerJob: 57,
    sharePercent: 15,
  },
];

const dimensionOptions: { id: RevenueDimension; label: string }[] = [
  { id: "company", label: "By Company" },
  { id: "locksmith", label: "By Locksmith" },
  { id: "operator", label: "By Operator" },
];

const rangeOptions = [
  { id: "week", label: "This week" },
  { id: "month", label: "This month" },
  { id: "quarter", label: "Last 3 months" },
] as const;

type RangeId = (typeof rangeOptions)[number]["id"];

const RevenueReportsModule: React.FC<RevenueReportsModuleProps> = () => {
  const [dimension, setDimension] =
    React.useState<RevenueDimension>("company");
  const [range, setRange] = React.useState<RangeId>("week");
  const [selectedRow, setSelectedRow] = React.useState<RevenueRow | null>(
    null
  );

  const rows: RevenueRow[] = React.useMemo(() => {
    if (dimension === "locksmith") return LOCKSMITH_REVENUE;
    if (dimension === "operator") return OPERATOR_REVENUE;
    return COMPANY_REVENUE;
  }, [dimension]);

  const totals = React.useMemo(
    () =>
      rows.reduce(
        (acc, r) => {
          acc.revenue += r.revenue;
          acc.jobs += r.jobs;
          return acc;
        },
        { revenue: 0, jobs: 0 }
      ),
    [rows]
  );

  const avgPerJob =
    totals.jobs > 0 ? Math.round((totals.revenue / totals.jobs) * 100) / 100 : 0;

  const topRow = rows[0];

  const chartData = rows.map((r) => ({
    label: r.name,
    revenue: r.revenue,
  }));

  const handleExportCsv = () => {
    console.log("Export revenue CSV", { dimension, range });
  };

  const handleExportPdf = () => {
    console.log("Export revenue PDF", { dimension, range });
  };

  const titleByDimension =
    dimension === "company"
      ? "Revenue by company"
      : dimension === "locksmith"
      ? "Revenue by locksmith"
      : "Revenue by operator";

  const subtitle =
    "Breakdown of completed jobs and revenue for payouts and finance exports.";

  const entityLabel =
    dimension === "company"
      ? "Company"
      : dimension === "locksmith"
      ? "Locksmith"
      : "Operator";

  return (
    <SectionCard title={titleByDimension} description={subtitle}>
      {/* Filters + export */}
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Left side filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Dimension pills */}
          <div className="inline-flex items-center gap-[2px] rounded-full bg-gray-100 p-[3px]">
            {dimensionOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDimension(opt.id)}
                className={[
                  "rounded-full px-3 py-1 font-medium transition",
                  dimension === opt.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-800",
                ].join(" ")}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Range selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Range
            </span>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value as RangeId)}
              className="h-8 rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {rangeOptions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right side export buttons */}
        <ReportExportButtons
          onExportCsv={handleExportCsv}
          onExportPdf={handleExportPdf}
        />
      </div>

      {/* KPI row */}
      <div className="mb-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        <StatCard
          label="Total revenue"
          value={`£${totals.revenue.toLocaleString()}`}
          subLabel="Completed jobs in selected range"
        />
        <StatCard
          label="Total jobs"
          value={totals.jobs}
          subLabel="Jobs included in revenue"
        />
        <StatCard
          label="Average revenue per job"
          value={`£${avgPerJob.toFixed(2)}`}
          subLabel="Across selected range"
        />
      </div>

      {/* Chart + table */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
        {/* Chart */}
        <div className="rounded-3xl bg-gray-50 p-3 md:p-4">
          <div className="mb-2 text-xs font-semibold text-gray-800">
            Top {entityLabel.toLowerCase()} by revenue
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Bar dataKey="revenue" fill="#0F5CCF" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {topRow && (
            <div className="mt-3 rounded-2xl bg-white px-3 py-2 text-xs text-gray-700 shadow-sm">
              <span className="font-semibold text-gray-900">
                {topRow.name}
              </span>{" "}
              contributes{" "}
              <span className="font-semibold text-gray-900">
                {topRow.sharePercent}%
              </span>{" "}
              of revenue in this view.
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto pb-1">
          <table className="w-full min-w-[560px] table-auto border-collapse text-left text-[11px] sm:min-w-full sm:text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3">
                  {entityLabel}
                </th>
                <th className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3">
                  Jobs
                </th>
                <th className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3">
                  Revenue
                </th>
                <th className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3">
                  Avg / job
                </th>
                <th className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3">
                  Share
                </th>
                <th className="px-2 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-2 py-6 text-center text-[11px] text-gray-400 sm:px-3 sm:text-xs"
                  >
                    No revenue data for this selection yet.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-50 hover:bg-gray-50/70"
                  >
                    <td className="px-2 py-2 text-[11px] text-gray-900 sm:px-3 sm:text-xs">
                      {row.name}
                    </td>
                    <td className="px-2 py-2 text-[11px] text-gray-800 sm:px-3 sm:text-xs">
                      {row.jobs}
                    </td>
                    <td className="px-2 py-2 text-[11px] text-gray-800 sm:px-3 sm:text-xs">
                      £{row.revenue.toLocaleString()}
                    </td>
                    <td className="px-2 py-2 text-[11px] text-gray-800 sm:px-3 sm:text-xs">
                      £{row.avgPerJob.toFixed(2)}
                    </td>
                    <td className="px-2 py-2 text-[11px] text-gray-800 sm:px-3 sm:text-xs">
                      {row.sharePercent}%
                    </td>
                    <td className="px-2 py-2 text-right text-[11px] text-gray-500 sm:px-3 sm:text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedRow(row)}
                        className="w-full rounded-2xl bg-white px-2.5 py-1.5 text-[11px] font-semibold text-blue-600 shadow-sm hover:bg-blue-50 sm:w-auto sm:px-3"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over for row details */}
      <SlideOver
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        widthClassName="max-w-md"
      >
        {selectedRow && (
          <RevenueRowDetailsPanel
            row={selectedRow}
            entityLabel={entityLabel}
            onClose={() => setSelectedRow(null)}
          />
        )}
      </SlideOver>
    </SectionCard>
  );
};

interface RevenueRowDetailsPanelProps {
  row: RevenueRow;
  entityLabel: string;
  onClose: () => void;
}

const RevenueRowDetailsPanel: React.FC<RevenueRowDetailsPanelProps> = ({
  row,
  entityLabel,
  onClose,
}) => {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-white px-3 pb-4 pt-3 shadow-md sm:px-4">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <span className="text-sm">×</span>
        </button>
        <h2 className="flex-1 text-center text-sm font-semibold text-gray-900">
          {entityLabel}: {row.name}
        </h2>
        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-1.5 pb-4 text-[11px] text-gray-800 sm:px-2 sm:text-xs">
        <div className="grid grid-cols-1 gap-2 rounded-2xl bg-gray-50 p-3 sm:grid-cols-2">
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">
              Jobs
            </div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              {row.jobs}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">
              Total revenue
            </div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              £{row.revenue.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">
              Avg per job
            </div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              £{row.avgPerJob.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">
              Revenue share
            </div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              {row.sharePercent}%
            </div>
          </div>
        </div>

        <p className="mt-2 text-[11px] text-gray-500">
          Later you can enrich this panel with invoice IDs, payout batches or
          per-job breakdown when backend endpoints are available.
        </p>
      </div>
    </div>
  );
};

export default RevenueReportsModule;
