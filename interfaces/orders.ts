export interface Order {
  id: string;
  trackingNumber: string;
  instruction: string;
  date: string;
  logisticsItemId?: number | null;
  logisticsItem?: any;
}
