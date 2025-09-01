import { ParcelRecord } from "../types";
export default function RecordCard({ r, onClick }: { r: ParcelRecord, onClick?: ()=>void }) {
  return (
    <div onClick={onClick} className="p-4 rounded-xl bg-white shadow hover:shadow-md transition cursor-pointer">
      <div className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
      <div className="font-medium mt-1">{r.parcelName || "(No name detected)"}</div>
      <div className="text-sm text-gray-700 line-clamp-2">{r.parcelDetails}</div>
      <div className="text-sm text-gray-700 line-clamp-2">{r.parcelAddress}</div>
      <div className="flex gap-2 mt-2 text-xs">
        <span className="px-2 py-0.5 rounded bg-gray-100">{r.submitterRole}</span>
        <span className="px-2 py-0.5 rounded bg-gray-100">{r.submitterName}</span>
        <span className="px-2 py-0.5 rounded bg-green-100 text-green-800">{r.status01}</span>
        {r.status02 && <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800">{r.status02}</span>}
      </div>
      <div className="mt-3 flex gap-2">
        {r.images.map((url, i) => (
          <img key={i} src={url} alt="" className="w-28 h-28 object-cover rounded border" />
        ))}
      </div>
    </div>
  );
}
