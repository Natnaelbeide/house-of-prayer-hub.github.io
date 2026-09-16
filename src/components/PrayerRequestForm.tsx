import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, HeartHandshake, Loader2 } from "lucide-react";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  fullName: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.union([z.string().trim().email("Please enter a valid email address").max(255), z.literal("")]),
  phone: z.union([z.string().trim().min(7, "Please enter a valid phone number").max(30), z.literal("")]),
  request: z.string().trim().min(1, "Please share your prayer request").max(2000),
  isPrivate: z.boolean(),
}).refine((data) => Boolean(data.email || data.phone), {
  message: "Please provide an email address or phone number",
  path: ["email"],
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

const initialValues: Values = { fullName: "", email: "", phone: "", request: "", isPrivate: true };

export default function PrayerRequestForm() {
  const { toast } = useToast();
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof Values>(field: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
    const { data, error } = await supabase.functions.invoke("submit-prayer-request", { body: parsed.data });
    setSubmitting(false);

    if (error) {
      const details = error instanceof FunctionsHttpError ? await error.context.text() : error.message;
      console.error("Prayer request submission failed", details);
      toast({ title: "We could not send your request", description: "Please try again in a few minutes.", variant: "destructive" });
      return;
    }

    setValues(initialValues);
    setSubmitted(true);
    toast({
      title: "Prayer request received",
      description: data?.warning || "Your request was sent privately to the pastor for immediate follow-up.",
    });
  };

  return (
    <div className="max-w-3xl mx-auto rounded-lg border border-border bg-card p-6 sm:p-8 shadow-card">
      <div className="flex items-start gap-4 mb-7">
        <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
          <HeartHandshake className="text-accent" size={24} />
        </div>
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">Share a Prayer Request</h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Your request will be sent privately to Apostle Henok Habte, with an immediate follow-up reminder.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="rounded-lg border border-accent/40 bg-accent/10 p-6 text-center">
          <CheckCircle2 className="text-accent mx-auto mb-3" size={30} />
          <p className="font-heading text-xl font-bold text-foreground">Your prayer request was received.</p>
          <p className="text-muted-foreground mt-2">We are standing with you in prayer.</p>
          <Button type="button" variant="link" onClick={() => setSubmitted(false)} className="mt-3 text-accent">
            Send another request
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="prayer-name">Full name</Label>
            <Input id="prayer-name" value={values.fullName} maxLength={100} autoComplete="name" onChange={(e) => update("fullName", e.target.value)} aria-invalid={Boolean(errors.fullName)} />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="prayer-email">Email address</Label>
              <Input id="prayer-email" type="email" value={values.email} maxLength={255} autoComplete="email" onChange={(e) => update("email", e.target.value)} aria-invalid={Boolean(errors.email)} />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="prayer-phone">Phone number</Label>
              <Input id="prayer-phone" type="tel" value={values.phone} maxLength={30} autoComplete="tel" onChange={(e) => update("phone", e.target.value)} aria-invalid={Boolean(errors.phone)} />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Please provide at least one way for the pastor to contact you.</p>

          <div className="space-y-2">
            <Label htmlFor="prayer-request">Prayer request</Label>
            <Textarea id="prayer-request" rows={6} value={values.request} maxLength={2000} onChange={(e) => update("request", e.target.value)} aria-invalid={Boolean(errors.request)} />
            <div className="flex justify-between gap-4">
              {errors.request ? <p className="text-sm text-destructive">{errors.request}</p> : <span />}
              <span className="text-xs text-muted-foreground">{values.request.length}/2000</span>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-muted p-4">
            <Checkbox id="prayer-private" checked={values.isPrivate} onCheckedChange={(checked) => update("isPrivate", checked === true)} />
            <div>
              <Label htmlFor="prayer-private" className="cursor-pointer">Keep this request private for the pastor</Label>
              <p className="text-xs text-muted-foreground mt-1">Uncheck only if it may be shared with the church prayer team.</p>
            </div>
          </div>

          <Button type="submit" disabled={submitting} className="w-full sm:w-auto bg-gradient-gold text-foreground font-semibold hover:opacity-90">
            {submitting ? <><Loader2 className="animate-spin" size={17} /> Sending…</> : "Send prayer request"}
          </Button>
        </form>
      )}
    </div>
  );
}