import React from "react";
import type { Notification } from "../models/notification";
import AvatarCircle from "../../shared/data-display/AvatarCircle";
import { FiTrash2 } from "react-icons/fi";
import { cn } from "../../utils/cn";

interface NotificationItemProps {
  item: Notification;
  onDeleteClick: (item: Notification) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item, onDeleteClick }) => {
  return (
    <div
      className={cn(
        "group mb-2 rounded-3xl bg-white px-3 py-3 shadow-sm last:mb-0",
        "sm:px-4 sm:py-3"
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* left: avatar + text */}
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
          <AvatarCircle name={item.initial} size="md" color={variantToColor(item.variant)} />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="min-w-0 break-words text-sm font-semibold leading-snug text-gray-900">
                {item.title}
              </span>

              {/* time shows inline on larger screens */}
              <span className="hidden text-xs text-gray-400 sm:inline">{item.time}</span>
            </div>

            <div className="mt-1 break-words text-xs leading-relaxed text-gray-500">
              {item.body}
            </div>

            {/* time shows on mobile below */}
            <div className="mt-2 text-xs text-gray-400 sm:hidden">{item.time}</div>
          </div>
        </div>

        {/* right: delete */}
        <div className="flex items-center justify-end sm:ml-3">
          <button
            type="button"
            onClick={() => onDeleteClick(item)}
            className={cn(
              "inline-flex h-9 w-full items-center justify-center gap-2 rounded-2xl",
              "bg-rose-50 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-100",
              "sm:h-8 sm:w-8 sm:px-0 sm:rounded-full",
              // desktop can keep the hover behavior; mobile always visible due to full-width button
              "sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity"
            )}
            aria-label="Delete notification"
          >
            <FiTrash2 className="h-4 w-4" />
            <span className="sm:hidden">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;

function variantToColor(variant: Notification["variant"]) {
  switch (variant) {
    case "success":
      return "green";
    case "warning":
      return "amber";
    default:
      return "gray";
  }
}
