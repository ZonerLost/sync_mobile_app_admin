import React from "react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import SectionCard from "../../shared/layout/SectionCard";

export interface ManagementRow {
  id: string;
  cells: React.ReactNode[];
}

interface ManagementListProps {
  title: string;
  description?: string;
  entityLabel: string; // e.g. "Locksmith"
  columns: string[];
  rows: ManagementRow[];
  onAddClick?: () => void;
  onEditRow?: (row: ManagementRow) => void;
  onDeleteRow?: (row: ManagementRow) => void;
}

const ManagementList: React.FC<ManagementListProps> = ({
  title,
  description,
  entityLabel,
  columns,
  rows,
  onAddClick,
  onEditRow,
  onDeleteRow,
}) => {
  const [search, setSearch] = React.useState("");

  const filteredRows = React.useMemo(() => {
    if (!search.trim()) return rows;
    const lower = search.toLowerCase();

    return rows.filter((row) =>
      row.cells.some((cell) => {
        if (typeof cell === "string" || typeof cell === "number") {
          return String(cell).toLowerCase().includes(lower);
        }
        return false;
      })
    );
  }, [rows, search]);

  const totalCount = rows.length;
  const hasActions = !!(onEditRow || onDeleteRow);

  const hasStatus =
    columns[columns.length - 1]?.toLowerCase() === "status" &&
    columns.length === rows[0]?.cells.length;

  const canUseSubtitle =
    (value: unknown) => typeof value === "string" || typeof value === "number";

  return (
    <SectionCard title={title} description={description}>
      {/* Top controls: search + add */}
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-gray-500">
          {totalCount} {totalCount === 1 ? entityLabel : `${entityLabel}s`} in
          total
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex w-full items-center rounded-full bg-gray-100 px-3 py-2 text-xs text-gray-500 sm:w-auto">
            <input
              type="text"
              placeholder={`Search ${entityLabel.toLowerCase()}s...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400 sm:w-56"
            />
          </div>

          {onAddClick && (
            <button
              type="button"
              onClick={onAddClick}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-[#0F5CCF] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0d4fb3] sm:w-auto"
            >
              <FiPlus className="mr-1.5 h-4 w-4" />
              Add {entityLabel}
            </button>
          )}
        </div>
      </div>

      {/* ✅ MOBILE: cards */}
      <div className="space-y-2 md:hidden">
        {filteredRows.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center text-[11px] text-gray-400">
            No {entityLabel.toLowerCase()}s match your search.
          </div>
        ) : (
          filteredRows.map((row) => {
            const cells = row.cells;
            const statusCell = hasStatus ? cells[cells.length - 1] : null;

            const subtitleCandidate = cells[1];
            const showSubtitle = canUseSubtitle(subtitleCandidate);

            // ✅ avoid duplicate: title uses cell[0], subtitle uses cell[1]
            // details should start from cell[2]
            const detailsStartIndex = showSubtitle ? 2 : 1;
            const detailsEndIndex = hasStatus ? cells.length - 1 : cells.length;

            const detailLabels = columns.slice(detailsStartIndex, detailsEndIndex);

            const details = detailLabels.map((label, idx) => ({
              label,
              value: cells[detailsStartIndex + idx],
            }));

            return (
              <div
                key={row.id}
                className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-gray-900">
                      {cells[0]}
                    </div>

                    {showSubtitle && (
                      <div className="mt-0.5 truncate text-[11px] text-gray-500">
                        {subtitleCandidate}
                      </div>
                    )}
                  </div>

                  {statusCell && <div className="shrink-0">{statusCell}</div>}
                </div>

                {details.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-gray-50 p-3 text-[11px]">
                    {details.slice(0, 6).map((d) => (
                      <div key={d.label} className="min-w-0">
                        <div className="text-gray-500">{d.label}</div>
                        <div className="mt-0.5 font-semibold text-gray-900">
                          {d.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {hasActions && (
                  <div className="mt-3 flex items-center justify-end gap-2">
                    {onEditRow && (
                      <button
                        type="button"
                        onClick={() => onEditRow(row)}
                        className="inline-flex items-center justify-center rounded-2xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100"
                      >
                        <FiEdit2 className="mr-1.5 h-4 w-4" />
                        Edit
                      </button>
                    )}
                    {onDeleteRow && (
                      <button
                        type="button"
                        onClick={() => onDeleteRow(row)}
                        className="inline-flex items-center justify-center rounded-2xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                      >
                        <FiTrash2 className="mr-1.5 h-4 w-4" />
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ✅ TABLET/LAPTOP: table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px] table-auto border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500"
                >
                  {col}
                </th>
              ))}
              {hasActions && (
                <th className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="px-3 py-6 text-center text-xs text-gray-400"
                >
                  No {entityLabel.toLowerCase()}s match your search.
                </td>
              </tr>
            ) : (
              filteredRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-50 hover:bg-gray-50/70"
                >
                  {row.cells.map((cell, index) => (
                    <td
                      key={index}
                      className="px-3 py-2 align-middle text-xs text-gray-800"
                    >
                      {cell}
                    </td>
                  ))}

                  {hasActions && (
                    <td className="px-3 py-2 text-right text-xs text-gray-500">
                      <div className="inline-flex items-center gap-1.5">
                        {onEditRow && (
                          <button
                            type="button"
                            onClick={() => onEditRow(row)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                            aria-label={`Edit ${entityLabel}`}
                          >
                            <FiEdit2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {onDeleteRow && (
                          <button
                            type="button"
                            onClick={() => onDeleteRow(row)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100"
                            aria-label={`Delete ${entityLabel}`}
                          >
                            <FiTrash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};

export default ManagementList;
