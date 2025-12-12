import React from "react";
import { cn } from "../../utils/cn";

interface ListCardProps {
  leftSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  metaRight?: React.ReactNode; // right top area (status, price, etc.)
  metaBottomRight?: React.ReactNode; // e.g. time
  actionsSlot?: React.ReactNode; // edit/delete icons or chevron
  className?: string;
  onClick?: () => void;
}

const ListCard: React.FC<ListCardProps> = ({
  leftSlot,
  title,
  subtitle,
  metaRight,
  metaBottomRight,
  actionsSlot,
  className,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-stretch justify-between border-b border-gray-100 bg-white px-4 py-3 text-left last:border-b-0 hover:bg-gray-50",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* left + text */}
      <div className="flex flex-1 items-start gap-3">
        {leftSlot && <div className="mt-0.5">{leftSlot}</div>}
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900">
            {title}
          </div>
          {subtitle && (
            <div className="mt-1 text-xs text-gray-500">{subtitle}</div>
          )}
        </div>
      </div>

      {/* right meta */}
      <div className="flex items-center gap-4">
        {(metaRight || metaBottomRight) && (
          <div className="flex flex-col items-end text-xs text-gray-500">
            {metaRight && (
              <div className="mb-1 flex items-center gap-1">
                {metaRight}
              </div>
            )}
            {metaBottomRight && <div>{metaBottomRight}</div>}
          </div>
        )}
        {actionsSlot && <div className="flex items-center">{actionsSlot}</div>}
      </div>
    </button>
  );
};

export default ListCard;
