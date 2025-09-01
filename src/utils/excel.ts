import * as XLSX from "xlsx";
import { ParcelRecord } from "../types";
export function exportRecordsToExcel(filename: string, records: ParcelRecord[]) {
  const rows = records.map(r => ({
    Date: new Date(r.createdAt).toLocaleString(),
    SubmitterRole: r.submitterRole,
    SubmitterName: r.submitterName,
    Shots: r.shots,
    ParcelName: r.parcelName,
    ParcelDetails: r.parcelDetails,
    ParcelAddress: r.parcelAddress,
    Status01: r.status01,
    Status02: r.status02 || ""
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Parcels");
  XLSX.writeFile(wb, filename);
}
