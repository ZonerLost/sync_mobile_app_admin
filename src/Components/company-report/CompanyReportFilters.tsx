import React from "react";
import { FiDownload, FiFileText } from "react-icons/fi";

type Mode = "daily" | "weekly";

interface CompanyReportFiltersProps {
  mode: Mode;
  selectedDate?: string;
  onDateChange?: (value: string) => void;
  selectedRange?: string;
  onRangeChange?: (value: string) => void;
  onExportCsv?: () => void;
  onExportPdf?: () => void;
}

const CompanyReportFilters: React.FC<CompanyReportFiltersProps> = ({
  mode,
  selectedDate,
  onDateChange,
  selectedRange,
  onRangeChange,
  onExportCsv,
  onExportPdf,
}) => {
  return (
    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      {/* Left */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Filters
          </span>
        </div>

        {mode === "daily" && (
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <span className="text-[11px] text-gray-400">Date</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange?.(e.target.value)}
              className="h-9 w-full rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-auto"
            />
          </div>
        )}

        {mode === "weekly" && (
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <span className="text-[11px] text-gray-400">Range</span>
            <select
              value={selectedRange}
              onChange={(e) => onRangeChange?.(e.target.value)}
              className="h-9 w-full rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-auto"
            >
              <option value="this-week">This week</option>
              <option value="last-week">Last week</option>
              <option value="last-4-weeks">Last 4 weeks</option>
            </select>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="grid grid-cols-2 gap-2 md:flex md:items-center">
        <button
          type="button"
          onClick={onExportCsv}
          className="inline-flex w-full items-center justify-center gap-1 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 md:w-auto md:py-1.5"
        >
          <FiFileText className="h-3.5 w-3.5" />
          CSV
        </button>

        <button
          type="button"
          onClick={onExportPdf}
          className="inline-flex w-full items-center justify-center gap-1 rounded-2xl bg-[#0F5CCF] px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0d4fb3] md:w-auto md:py-1.5"
        >
          <FiDownload className="h-3.5 w-3.5" />
          PDF
        </button>
      </div>
    </div>
  );
};

export default CompanyReportFilters;
