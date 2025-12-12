import React from "react";
import { FiDownload, FiFileText } from "react-icons/fi";

interface ReportExportButtonsProps {
  onExportCsv?: () => void;
  onExportPdf?: () => void;
}

const ReportExportButtons: React.FC<ReportExportButtonsProps> = ({
  onExportCsv,
  onExportPdf,
}) => {
  return (
    <div className="grid w-full grid-cols-2 gap-2 text-xs sm:flex sm:w-auto sm:justify-end">
      <button
        type="button"
        onClick={onExportCsv}
        className="inline-flex h-9 w-full items-center justify-center gap-1 rounded-2xl border border-gray-200 bg-white px-3 font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
      >
        <FiFileText className="h-3.5 w-3.5" />
        CSV
      </button>
      <button
        type="button"
        onClick={onExportPdf}
        className="inline-flex h-9 w-full items-center justify-center gap-1 rounded-2xl bg-[#0F5CCF] px-3 font-semibold text-white shadow-sm hover:bg-[#0d4fb3]"
      >
        <FiDownload className="h-3.5 w-3.5" />
        PDF
      </button>
    </div>
  );
};

export default ReportExportButtons;
