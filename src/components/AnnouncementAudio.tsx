import { useEffect, useRef, useState } from "react";
import { createParser } from "eventsource-parser";
import { Loader2, Square, Volume2 } from "lucide-react";
import { toast } from "sonner";

const ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/announcement-audio`;

interface AnnouncementAudioProps {
  text: string;
  label?: string;
}

export default function AnnouncementAudio({ text, label = "Listen" }: AnnouncementAudioProps) {
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");
  const ctxRef = useRef<AudioContext | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const stop = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    ctxRef.current?.close().catch(() => {});
    ctxRef.current = null;
    setState("idle");
  };

  useEffect(() => stop, []);

  const play = async () => {
    if (state !== "idle") {
      stop();
      return;
    }
    setState("loading");

    const ctx = new AudioContext({ sampleRate: 24000 });
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume().catch(() => {});

    let playhead = 0;
    let pending = new Uint8Array(0);
    let endsAt = 0;

    const playChunk = (incoming: Uint8Array) => {
      const bytes = new Uint8Array(pending.length + incoming.length);
      bytes.set(pending);
      bytes.set(incoming, pending.length);
      const usable = bytes.length - (bytes.length % 2);
      pending = bytes.slice(usable);
      if (usable === 0) return;
      const samples = new Int16Array(bytes.buffer, 0, usable / 2);
      const floats = Float32Array.from(samples, (s) => s / 32768);
      const buffer = ctx.createBuffer(1, floats.length, 24000);
      buffer.copyToChannel(floats, 0);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      if (playhead === 0) {
        playhead = ctx.currentTime + 0.05;
        setState("playing");
      } else {
        playhead = Math.max(playhead, ctx.currentTime);
      }
      source.start(playhead);
      playhead += buffer.duration;
      endsAt = playhead;
    };

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ text }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const detail = await res.json().catch(() => ({}));
        throw new Error(detail.error ?? "Could not play this announcement.");
      }

      const parser = createParser({
        onEvent(event) {
          let payload: { type: string; audio?: string };
          try {
            payload = JSON.parse(event.data);
          } catch {
            return;
          }
          if (payload.type !== "speech.audio.delta" || !payload.audio) return;
          const binary = atob(payload.audio);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
          playChunk(bytes);
        },
      });

      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        parser.feed(value);
      }

      const remaining = Math.max(0, (endsAt - ctx.currentTime) * 1000);
      window.setTimeout(() => {
        if (abortRef.current === controller) stop();
      }, remaining + 200);
    } catch (error) {
      if (controller.signal.aborted) return;
      toast.error(error instanceof Error ? error.message : "Could not play this announcement.");
      stop();
    }
  };

  return (
    <button
      type="button"
      onClick={play}
      aria-label={state === "idle" ? `${label} to this announcement` : "Stop audio"}
      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent text-accent text-sm font-semibold hover:bg-accent hover:text-primary-foreground transition-colors"
    >
      {state === "loading" ? (
        <>
          <Loader2 size={15} className="animate-spin" /> Preparing…
        </>
      ) : state === "playing" ? (
        <>
          <Square size={14} /> Stop
        </>
      ) : (
        <>
          <Volume2 size={15} /> {label}
        </>
      )}
    </button>
  );
}
