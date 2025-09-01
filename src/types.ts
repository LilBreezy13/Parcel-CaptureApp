export type Role = "scanner" | "officer";
export type Status01 = "Rejected" | "New school / Late Registration" | "Shortages";
export type Status02 = "PAID" | "PART PAYMENT" | "NOT PAID";
export interface UserDoc { uid: string; displayName: string | null; email: string | null; role: Role; }
export interface ParcelRecord {
  id?: string;
  createdAt: number;
  dateKey: string;
  createdByUid: string;
  createdByName: string;
  submitterRole: "Marketer" | "Office Assistant" | "Management";
  submitterName: string;
  images: string[];
  imagePaths: string[];
  shots: number;
  parcelName: string;
  parcelDetails: string;
  parcelAddress: string;
  status01: Status01;
  status02?: Status02;
  locationKeywords: string[];
}
