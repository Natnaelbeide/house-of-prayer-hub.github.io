import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Sparkles, X } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const autoDismissRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const showProgram = (index: number) => {
    videoRef.current?.pause();
    setActiveIndex(index);
  };

  if (!hasPrograms) return null;

  const program = upcomingPrograms[activeIndex];
  if (!program) return null;
  const hasMultiplePrograms = upcomingPrograms.length > 1;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-lg border-accent/30 bg-card p-0 overflow-hidden">
        <div className="bg-gradient-navy px-5 py-4 text-primary-foreground">
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
            <DialogDescription className="sr-only">Video announcements for upcoming church events.</DialogDescription>
          </DialogHeader>
        </div>

        <div className="max-h-[68vh] overflow-y-auto">
          <div className="relative aspect-video bg-primary">
            <video
              key={program.id}
              ref={videoRef}
              src={program.videoUrl}
              className="h-full w-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${program.title} video announcement`}
            />
            {program.isNew && (
              <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground shadow-gold">
                New
              </span>
            )}
          </div>

          <div className="space-y-3 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">{program.title}</h3>
                <p lang="ti" className="mt-1 text-lg font-semibold leading-snug text-accent">
                  {program.geezTitle}
                </p>
              </div>
              <span className="shrink-0 text-xs font-medium text-muted-foreground">
                {activeIndex + 1} / {upcomingPrograms.length}
              </span>
            </div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={15} className="shrink-0 text-accent" />
                <span>{program.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="shrink-0 text-accent" />
                <span>{program.time}</span>
              </div>
              {program.location && (
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                  <span>{program.location}</span>
                </div>
              )}
            </div>
            <p lang="ti" className="text-sm leading-relaxed text-foreground/80">
              {program.geezDescription}
            </p>
            {program.link && (
              <Button asChild variant="outline" className="w-full border-accent text-foreground">
                <a href={program.link}>Registration & details</a>
              </Button>
            )}

            {hasMultiplePrograms && (
              <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => showProgram((activeIndex - 1 + upcomingPrograms.length) % upcomingPrograms.length)}
                  aria-label="Previous announcement"
                >
                  <ChevronLeft />
                </Button>
                <div className="flex items-center justify-center gap-1.5" aria-label="Announcement pages">
                  {upcomingPrograms.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => showProgram(index)}
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${index === activeIndex ? "bg-accent" : "bg-muted-foreground/30"}`}
                      aria-label={`Show ${item.title}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => showProgram((activeIndex + 1) % upcomingPrograms.length)}
                  aria-label="Next announcement"
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="px-5 pb-5">
          <Button
            onClick={handleClose}
            className="w-full bg-gradient-gold text-foreground font-semibold hover:opacity-90"
          >
            Got it
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute right-2 top-2 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
          aria-label="Close popup"
        >
          <X size={18} />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
