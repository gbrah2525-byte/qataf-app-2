import React from "react";

export interface SelfEngineViewProps {
  status?: string;
  metrics?: Record<string, string | number>;
  onAction?: () => void;
}

export const SelfEngineView: React.FC<SelfEngineViewProps> = ({
  status = "جاهز للتشغيل",
  metrics,
  onAction,
}) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 text-zinc-100">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold">لوحة المحرك الداخلي</h2>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          {status}
        </span>
      </div>

      {metrics && Object.keys(metrics).length > 0 ? (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {Object.entries(metrics).map(([k, v]) => (
            <div key={k} className="rounded-xl bg-zinc-950 p-3 border border-zinc-800/60">
              <div className="text-xs text-zinc-400">{k}</div>
              <div className="text-sm font-semibold mt-0.5">{String(v)}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-400 mb-3">
          تم تهيئة واجهة المحرك بنجاح وجاهزة لربط البيانات.
        </p>
      )}

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white"
        >
          تحديث الحالة
        </button>
      )}
    </div>
  );
};

export default SelfEngineView;
