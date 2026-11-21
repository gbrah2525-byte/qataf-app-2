import React from "react";

export interface HistoryItem {
  id: string;
  title?: string;
  label?: string;
  date?: string;
  status?: string;
  amount?: string | number;
}

export interface HistoryViewProps {
  items?: HistoryItem[];
  history?: HistoryItem[];
  onSelect?: (item: HistoryItem) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  items,
  history,
  onSelect,
}) => {
  const list = items ?? history ?? [];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 text-zinc-100">
      <h2 className="text-base font-bold mb-3">السجل</h2>

      {list.length === 0 ? (
        <p className="text-sm text-zinc-400">لا توجد عناصر مسجلة حالياً.</p>
      ) : (
        <div className="space-y-2">
          {list.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelect?.(entry)}
              className="w-full text-right flex items-center justify-between rounded-xl bg-zinc-950/80 hover:bg-zinc-800/80 px-3.5 py-2.5 border border-zinc-800/60 transition"
            >
              <div>
                <div className="text-sm font-medium">
                  {entry.title ?? entry.label ?? `عنصر #${entry.id}`}
                </div>
                {entry.date && (
                  <div className="text-xs text-zinc-400 mt-0.5">{entry.date}</div>
                )}
              </div>
              <div className="text-xs text-zinc-300">
                {entry.amount !== undefined ? String(entry.amount) : entry.status ?? ""}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
