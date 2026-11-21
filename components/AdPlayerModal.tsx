import React, { useEffect, useState } from "react";

export interface AdPlayerModalProps {
  isOpen?: boolean;
  open?: boolean;
  onClose?: () => void;
  onComplete?: () => void;
  durationSeconds?: number;
  title?: string;
  children?: React.ReactNode;
}

export const AdPlayerModal: React.FC<AdPlayerModalProps> = ({
  isOpen,
  open,
  onClose,
  onComplete,
  durationSeconds = 5,
  title = "مشاهدة الإعلان",
  children,
}) => {
  const visible = Boolean(isOpen ?? open);
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);

  useEffect(() => {
    if (!visible) return;
    setSecondsLeft(durationSeconds);

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [visible, durationSeconds, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-5 text-white shadow-xl border border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300">
            {secondsLeft > 0 ? `${secondsLeft} ث` : "مكتمل"}
          </span>
        </div>

        <div className="rounded-xl bg-zinc-950 p-4 text-sm text-zinc-300 min-h-[120px] flex items-center justify-center text-center">
          {children ?? <p>جاري عرض المحتوى الإعلاني...</p>}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          {secondsLeft === 0 && onComplete && (
            <button
              type="button"
              onClick={onComplete}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-medium"
            >
              تأكيد الإتمام
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm font-medium"
            >
              إغلاق
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdPlayerModal;
