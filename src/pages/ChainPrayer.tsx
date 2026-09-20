import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { CheckCircle2, Clock, Flame, Loader2, Users } from "lucide-react";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type SlotSummary = { hour: number; count: number };

const schema = z.object({
  fullName: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.union([z.string().trim().min(5, "Please enter a valid phone number").max(30), z.literal("")]),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

const initialValues: Values = { fullName: "", email: "", phone: "" };

const formatHour = (hour: number) => {
  const suffix = hour < 12 ? "AM" : "PM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:00 ${suffix}`;
};

const hourLabel = (hour: number) => `${formatHour(hour)} – ${formatHour((hour + 1) % 24)}`;

export default function ChainPrayer() {
  const { toast } = useToast();
  const cardsRef = useScrollReveal();
  const [slots, setSlots] = useState<SlotSummary[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const loadSlots = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("chain-prayer-signup", { method: "GET" });
      if (error) throw error;
      setSlots((data?.slots ?? []) as SlotSummary[]);
    } catch (error) {
      console.error("Chain prayer slots failed to load", error);
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    loadSlots();
  }, []);

  const byHour = useMemo(() => {
    const map = new Map<number, SlotSummary>();
    slots.forEach((slot) => map.set(slot.hour, slot));
    return map;
  }, [slots]);

  const coveredCount = byHour.size;

  const update = <K extends keyof Values>(field: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedHour === null) {
      toast({ title: "Choose an hour", description: "Please pick the hour you can pray.", variant: "destructive" });
      return;
    }
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: Errors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof Values;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("chain-prayer-signup", {
      body: { ...parsed.data, hour: selectedHour },
    });
    setSubmitting(false);

    if (error) {
      const details = error instanceof FunctionsHttpError ? await error.context.text() : error.message;
      console.error("Chain prayer sign-up failed", details);
      const alreadySigned = details?.includes("already signed up");
      toast({
        title: alreadySigned ? "You already have this hour" : "We could not save your sign-up",
        description: alreadySigned
          ? "This email is already praying during that hour. Try another hour."
          : "Please try again in a few minutes.",
        variant: "destructive",
      });
      return;
    }

    setConfirmed(data?.slotLabel || hourLabel(selectedHour));
    setValues(initialValues);
    setSelectedHour(null);
    loadSlots();
    toast({
      title: "Your prayer hour is reserved",
      description: data?.warning || "We emailed you a confirmation with the hour you chose.",
    });
  };

  return (
    <Layout>
      <Seo
        title="24/7 Chain Prayer | House of Prayer Church DMV"
        description="Join the 24/7 chain of prayer at House of Prayer Church DMV. Choose an hour to cover in prayer and receive email reminders before your prayer hour."
        path="/chain-prayer"
      />

      <section className="relative py-28 bg-gradient-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(40_60%_50%/0.2),transparent_60%)]" />
        </div>
        <div className="relative container px-4 text-center">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Pray Without Ceasing</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">
            24/7 Chain Prayer
          </h1>
          <p className="text-primary-foreground/90 text-lg mb-2" lang="ti">
            ናይ 24 ሰዓት ሰንሰለት ጸሎት
          </p>
          <p className="text-accent text-xl font-semibold mb-4" lang="ti">
            “1ይ ተሰሎንቄ 5:17 — ከየባተኽኩም ጸልዩ።”
          </p>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-6" />
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg">
            Every hour of the day covered in prayer. Choose the hour you can stand in the gap — we
            will text you a reminder about an hour before your prayer time each day (email if you
            prefer not to share a number).
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div ref={cardsRef} className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              {[
                { icon: Clock, label: "Hours covered", value: `${coveredCount} of 24` },
                { icon: Users, label: "Prayer partners", value: `${slots.reduce((sum, s) => sum + s.count, 0)}` },
                { icon: Flame, label: "Time zone", value: "Eastern (ET)" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-border bg-card p-5 text-center shadow-card">
                  <stat.icon className="text-accent mx-auto mb-2" size={22} />
                  <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">Pick Your Prayer Hour</h2>
            <p className="text-muted-foreground mb-6">
              Gold hours already have prayer partners. More than one person may cover the same hour.
            </p>

            {loadingSlots ? (
              <div className="flex items-center gap-2 text-muted-foreground py-6">
                <Loader2 className="animate-spin" size={18} /> Loading the prayer chain…
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
                {Array.from({ length: 24 }, (_, hour) => {
                  const slot = byHour.get(hour);
                  const selected = selectedHour === hour;
                  return (
                    <button
                      key={hour}
                      type="button"
                      onClick={() => setSelectedHour(hour)}
                      aria-pressed={selected}
                      className={`rounded-lg border p-3 text-left transition-all hover:-translate-y-0.5 ${
                        selected
                          ? "border-accent bg-accent/15 shadow-card"
                          : slot
                            ? "border-accent/40 bg-card"
                            : "border-border bg-card"
                      }`}
                    >
                      <p className="font-heading font-bold text-foreground text-sm">{hourLabel(hour)}</p>
                      <p className="text-xs text-accent mt-1">
                        {slot ? slot.count : "Open hour"}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="rounded-lg border border-border bg-card p-6 sm:p-8 shadow-card">
              {confirmed ? (
                <div className="rounded-lg border border-accent/40 bg-accent/10 p-6 text-center">
                  <CheckCircle2 className="text-accent mx-auto mb-3" size={30} />
                  <p className="font-heading text-xl font-bold text-foreground">
                    Your prayer hour is {confirmed}.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    We sent your confirmation, and we will remind you about an hour before your prayer
                    time each day — by text if you gave a mobile number. Thank you for standing in the gap.
                  </p>
                  <Button type="button" variant="link" onClick={() => setConfirmed(null)} className="mt-3 text-accent">
                    Sign up for another hour
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground">Join the Chain</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {selectedHour === null
                        ? "Select an hour above, then add your details."
                        : `Selected hour: ${hourLabel(selectedHour)} (Eastern Time)`}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chain-name">Full name</Label>
                    <Input
                      id="chain-name"
                      value={values.fullName}
                      maxLength={100}
                      autoComplete="name"
                      onChange={(e) => update("fullName", e.target.value)}
                      aria-invalid={Boolean(errors.fullName)}
                    />
                    {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="chain-email">Email address</Label>
                      <Input
                        id="chain-email"
                        type="email"
                        value={values.email}
                        maxLength={255}
                        autoComplete="email"
                        onChange={(e) => update("email", e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chain-phone">Mobile number (for text reminders)</Label>
                      <Input
                        id="chain-phone"
                        type="tel"
                        value={values.phone}
                        maxLength={30}
                        autoComplete="tel"
                        onChange={(e) => update("phone", e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                      />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto bg-gradient-gold text-foreground font-semibold hover:opacity-90"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin" size={17} /> Reserving…
                      </>
                    ) : (
                      "Reserve my prayer hour"
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Your details stay private with the church office. By adding your mobile number you
                    agree to receive prayer reminder texts about an hour before your prayer time
                    (Eastern Time); reply STOP anytime. Without a number we send reminders by email.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
