import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type L = { to: string; label: string; blurb: string };
const ALL: Record<string, L> = {
  services: { to: "/services", label: "Plan Your Visit", blurb: "Service times & location" },
  announcements: { to: "/announcements", label: "Announcements", blurb: "Upcoming events & programs" },
  tracker: { to: "/bible-tracker", label: "90-Day Bible Tracker", blurb: "Read the whole Bible with us" },
  chain: { to: "/chain-prayer", label: "24/7 Chain Prayer", blurb: "Claim a prayer hour" },
  connect: { to: "/connect", label: "Connect", blurb: "Watch live & follow us" },
  giving: { to: "/giving", label: "Give & Prayer Requests", blurb: "Support the ministry" },
  youth: { to: "/children-youth", label: "Children & Youth", blurb: "Sunday School & lessons" },
  lessons: { to: "/children-youth/bible-lessons", label: "Bible Lessons", blurb: "Weekly Sunday School summaries" },
  gallery: { to: "/gallery", label: "Gallery", blurb: "Photos from our church family" },
};
const MAP: Record<string, (keyof typeof ALL)[]> = {
  "/": ["services", "announcements", "chain"],
  "/services": ["announcements", "connect", "giving"],
  "/announcements": ["chain", "services", "connect"],
  "/bible-tracker": ["lessons", "chain", "announcements"],
  "/how-to-read-the-bible-in-90-days": ["tracker", "lessons", "chain"],
  "/connect": ["services", "announcements", "giving"],
  "/children-youth": ["lessons", "tracker", "services"],
  "/children-youth/bible-lessons": ["tracker", "youth", "announcements"],
  "/chain-prayer": ["giving", "tracker", "announcements"],
  "/giving": ["chain", "services", "connect"],
  "/gallery": ["connect", "services", "announcements"],
};

const ExploreMore = () => {
  const { pathname } = useLocation();
  const keys = MAP[pathname];
  if (!keys) return null;
  return (
    <section className="border-t border-border bg-secondary/40 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-xl font-bold text-primary mb-5 text-center">Keep Exploring</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {keys.map((k) => {
            const l = ALL[k];
            return (
              <Link key={l.to} to={l.to} className="group rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent hover:shadow-md">
                <div className="flex items-center justify-between font-heading font-semibold text-primary">
                  {l.label}
                  <ArrowRight className="h-4 w-4 text-accent transition group-hover:translate-x-1" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{l.blurb}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default ExploreMore;
