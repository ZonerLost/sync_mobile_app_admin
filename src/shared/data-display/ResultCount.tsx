import React from "react";

interface ResultCountProps {
  count: number;
  label: string; // e.g. "Companies found", "jobs found"
}

const ResultCount: React.FC<ResultCountProps> = ({ count, label }) => {
  return (
    <div className="border-b border-gray-100 bg-white px-4 py-2 text-xs text-gray-500">
      <span className="font-medium text-gray-700">{count}</span>{" "}
      {label}
    </div>
  );
};

export default ResultCount;
