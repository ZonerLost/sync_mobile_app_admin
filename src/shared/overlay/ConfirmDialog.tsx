import React from "react";
import { cn } from "../../utils/cn";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  destructive = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            )}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium text-white",
              destructive
                ? "bg-rose-500 hover:bg-rose-600"
                : "bg-blue-600 hover:bg-blue-700"
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
