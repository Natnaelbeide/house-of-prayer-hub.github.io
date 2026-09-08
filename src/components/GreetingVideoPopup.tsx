import { useEffect, useState } from "react";
import { X, Youtube } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "fapim-greeting-video";
const SHOW_DELAY_MS = 800;
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // once a day

// Latest upload from youtube.com/@rahabot (uploads playlist)
const LATEST_VIDEO_SRC =
  "https://www.youtube.com/embed/videoseries?list=UUjokQ06rjxq7k2nFf9NiMNw&rel=0";

export default function GreetingVideoPopup({
  onDismiss,
}: {
  onDismiss?: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const seenAt = Number(raw);
      if (!Number.isNaN(seenAt) && Date.now() - seenAt < COOLDOWN_MS) return;
    }
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-2xl border-accent/30 bg-card p-0 overflow-hidden">
        <div className="bg-gradient-navy px-6 py-5 text-primary-foreground">
          <DialogHeader>
            <DialogTitle className="text-center font-heading text-2xl text-primary-foreground">
              Welcome to House of Prayer Church DMV
            </DialogTitle>
            <DialogDescription className="text-center text-primary-foreground/80">
              A greeting from Pastor Henok Habte — our latest message.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-4 sm:p-6">
          <div className="rounded-xl overflow-hidden border border-border aspect-video shadow-elevated">
            <iframe
              title="Greeting video"
              src={LATEST_VIDEO_SRC}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>

        <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleClose}
            className="bg-gradient-gold text-foreground font-semibold hover:opacity-90"
          >
            Continue to the site
          </Button>
          <a
            href="https://www.youtube.com/@rahabot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Youtube size={18} className="text-destructive" /> More videos
          </a>
        </div>

        <button
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-full p-1.5 text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground transition-colors"
          aria-label="Close greeting video"
        >
          <X size={18} />
        </button>
      </DialogContent>
    </Dialog>
  );
}
