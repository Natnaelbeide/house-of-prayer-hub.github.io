import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, MapPin, X, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { upcomingPrograms, POPUP_VERSION } from "@/data/upcomingPrograms";

const STORAGE_KEY = "fapim-upcoming-popup";
const AUTO_DISMISS_MS = 3 * 60 * 1000; // 3 minutes
const SHOW_DELAY_MS = 1500; // 1.5 seconds after mount
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

interface PopupState {
  dismissedAt: number;
  dismissedVersion: string;
}

export default function UpcomingPopup() {
  const [open, setOpen] = useState(false);
  const autoDismissRef = useRef<NodeJS.Timeout | null>(null);

  const hasPrograms = upcomingPrograms.length > 0;

  useEffect(() => {
    if (!hasPrograms) return;

    const raw = localStorage.getItem(STORAGE_KEY);
    let shouldShow = true;

    if (raw) {
      try {
        const state = JSON.parse(raw) as PopupState;
        const versionChanged = state.dismissedVersion !== POPUP_VERSION;
        const cooldownOver = Date.now() - state.dismissedAt > COOLDOWN_MS;
        shouldShow = versionChanged || cooldownOver;
      } catch {
        // Invalid stored state, show popup
      }
    }

    if (!shouldShow) return;

    const showTimer = setTimeout(() => {
      setOpen(true);
      autoDismissRef.current = setTimeout(() => {
        setOpen(false);
      }, AUTO_DISMISS_MS);
    }, SHOW_DELAY_MS);

    return () => {
      clearTimeout(showTimer);
      if (autoDismissRef.current) clearTimeout(autoDismissRef.current);
    };
  }, [hasPrograms]);

  const handleClose = () => {
    setOpen(false);
    if (autoDismissRef.current) clearTimeout(autoDismissRef.current);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ dismissedAt: Date.now(), dismissedVersion: POPUP_VERSION })
    );
  };

  if (!hasPrograms) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-md border-accent/30 bg-card p-0 overflow-hidden">
        <div className="bg-gradient-navy p-6 text-primary-foreground">
          <DialogHeader>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="text-accent" size={22} />
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                Coming Up
              </span>
              <Sparkles className="text-accent" size={22} />
            </div>
            <DialogTitle className="text-center font-heading text-2xl text-primary-foreground">
              House of Prayer Church DMV
            </DialogTitle>
            <DialogDescription className="text-center text-primary-foreground/80">
              New programs and events you do not want to miss.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 pt-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {upcomingPrograms.map((program) => (
            <div
              key={program.id}
              className="relative rounded-xl border border-border bg-muted/40 p-4 hover:bg-muted transition-colors"
            >
              {program.isNew && (
                <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground shadow-gold">
                  New
                </span>
              )}
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                {program.title}
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-accent" />
                  <span>{program.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-accent" />
                  <span>{program.time}</span>
                </div>
                {program.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-accent" />
                    <span>{program.location}</span>
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
                {program.description}
              </p>
              {program.link && (
                <a
                  href={program.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-sm font-medium text-accent hover:underline"
                >
                  Learn more
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 pt-0 flex flex-col gap-3">
          <Button
            onClick={handleClose}
            className="w-full bg-gradient-gold text-foreground font-semibold hover:opacity-90"
          >
            Got it
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            This message will close automatically in a few minutes.
          </p>
        </div>

        <button
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-full p-1.5 text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground transition-colors"
          aria-label="Close popup"
        >
          <X size={18} />
        </button>
      </DialogContent>
    </Dialog>
  );
}
