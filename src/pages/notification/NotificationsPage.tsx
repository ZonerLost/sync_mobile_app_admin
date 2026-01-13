import React from "react";
import PageContainer from "../../shared/layout/PageContainer";
import NotificationsEmptyState from "../../Components/notifications/NotificationEmptyState";
import NotificationsList from "../../Components/notifications/NotificationList";
import ConfirmDialog from "../../shared/overlay/ConfirmDialog";
import type { Notification } from "../../Components/models/notification";
import { MOCK_NOTIFICATIONS } from "./mockNotifications";

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>(
    MOCK_NOTIFICATIONS
  );

  const [toDelete, setToDelete] = React.useState<Notification | null>(null);

  const handleDeleteRequest = (item: Notification) => setToDelete(item);

  const handleConfirmDelete = () => {
    if (!toDelete) return;
    setNotifications((prev) => prev.filter((n) => n.id !== toDelete.id));
    setToDelete(null);
  };

  const handleCancelDelete = () => setToDelete(null);

  const hasNotifications = notifications.length > 0;

  return (
    <PageContainer fullWidth>
      <div className="mx-auto w-full max-w-5xl space-y-3 md:space-y-4 lg:space-y-5">
        {/* header */}
        <div className="space-y-1 md:space-y-2">
          <h1 className="text-lg font-semibold text-gray-900 md:text-xl">
            Notifications
          </h1>
          <p className="text-xs text-gray-500 md:text-sm">
            Admin alerts about reports, companies, operators and system activity.
          </p>
        </div>

        {/* content wrapper */}
        <div
          className={[
            "rounded-3xl bg-[#f5f5f6]",
            "p-3 md:p-4 lg:p-5",
            // dynamic viewport height fixes mobile chrome/safari issues
            "h-[calc(100dvh-190px)] md:h-[calc(100dvh-210px)]",
            "overflow-hidden",
          ].join(" ")}
        >
          <div className="h-full overflow-y-auto scrollbar-hide">
            {!hasNotifications ? (
              <NotificationsEmptyState />
            ) : (
              <NotificationsList
                notifications={notifications}
                onDeleteClick={handleDeleteRequest}
              />
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this notification?"
        description={toDelete ? `Are you sure you want to delete “${toDelete.title}”?` : ""}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </PageContainer>
  );
};

export default NotificationsPage;
