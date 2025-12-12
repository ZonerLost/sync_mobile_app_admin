export type NotificationVariant = "success" | "warning" | "info";

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;      // "12:33 am"
  dateLabel: string; // "Today", "Yesterday", etc.
  initial: string;   // "A", "D" ...
  variant: NotificationVariant;
}
