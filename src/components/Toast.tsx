import { cn } from "@/utils/cn";
import { Icon } from "./Ornaments";

export function Toast({
  message,
  onDismiss,
}: {
  message: string | null;
  onDismiss: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "fixed inset-x-4 bottom-5 z-[130] mx-auto max-w-[470px] transition-all duration-500 ease-out",
        message ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <div className="flex items-start gap-3 border border-champagne/45 bg-ivory/98 px-4 py-3.5 shadow-luxe backdrop-blur-sm">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-champagne/45 text-antique">
          <Icon name="check" className="h-3.5 w-3.5" />
        </span>
        <p className="flex-1 text-[9px] uppercase leading-[1.8] tracking-[0.16em] text-ink">
          {message ?? ""}
        </p>
        <button
          type="button"
          onClick={onDismiss}
          disabled={!message}
          aria-label="Dismiss notification"
          className="text-ink-soft transition-colors hover:text-antique disabled:pointer-events-none"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
