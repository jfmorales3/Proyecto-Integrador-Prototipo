
export enum AppView {
  LANDING,
  WELCOME,
  DASHBOARD,
  JOB_IN_PROGRESS,
  ROAD_REPORT,
  SCAN_QR,
  PAYMENT_SUCCESS,
  TRANSACTION_HISTORY,
  MY_APPLICATIONS,
}

export enum TransactionStatus {
  PENDING = 'Pendiente',
  SYNCED = 'Sincronizado',
  ERROR = 'Error',
}

export interface Transaction {
  id: string;
  date: string;
  payer: string;
  amount: number;
  status: TransactionStatus;
}