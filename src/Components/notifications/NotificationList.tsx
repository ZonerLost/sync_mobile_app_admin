import React from "react";
import type { Notification } from "../models/notification";
import NotificationItem from "./NotificationItem";

interface NotificationsListProps {
  notifications: Notification[];
  onDeleteClick: (item: Notification) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ notifications, onDeleteClick }) => {
  const groups = React.useMemo(() => {
    const map = new Map<string, Notification[]>();

    for (const n of notifications) {
      const label = n.dateLabel || "Other";
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(n);
    }

    const orderPriority = (label: string) => {
      if (label === "Today") return 0;
      if (label === "Yesterday") return 1;
      if (label === "This week") return 2;
      return 3;
    };

    return Array.from(map.entries()).sort(([a], [b]) => orderPriority(a) - orderPriority(b));
  }, [notifications]);

  return (
    <div className="mt-3 space-y-4">
      {groups.map(([label, items]) => (
        <section key={label} className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 sm:text-xs">
            {label}
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <NotificationItem key={item.id} item={item} onDeleteClick={onDeleteClick} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default NotificationsList;
