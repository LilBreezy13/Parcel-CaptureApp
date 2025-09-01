import React from "react";
import { Status01, Status02 } from "../types";

export function Status01Picker({ value, onChange }: { value: Status01 | ""; onChange: (v: Status01) => void }) {
  const options: Status01[] = ["Rejected","New school / Late Registration","Shortages"];
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map(opt => (
        <label key={opt} className={`px-3 py-1.5 rounded-full border cursor-pointer ${value===opt ? "bg-brand-600 text-white border-brand-600" : "bg-white hover:border-brand-600"}`}>
          <input type="radio" className="hidden" checked={value===opt} onChange={() => onChange(opt)} />
          {opt}
        </label>
      ))}
    </div>
  );
}

export function Status02Picker({ value, onChange, disabled }: { value: Status02 | ""; onChange: (v: Status02) => void, disabled?: boolean }) {
  const options: Status02[] = ["PAID","PART PAYMENT","NOT PAID"];
  return (
    <div className={`flex gap-2 flex-wrap ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      {options.map(opt => (
        <label key={opt} className={`px-3 py-1.5 rounded-full border cursor-pointer ${value===opt ? "bg-brand-600 text-white border-brand-600" : "bg-white hover:border-brand-600"}`}>
          <input type="radio" className="hidden" checked={value===opt} onChange={() => onChange(opt)} />
          {opt}
        </label>
      ))}
    </div>
  );
}
