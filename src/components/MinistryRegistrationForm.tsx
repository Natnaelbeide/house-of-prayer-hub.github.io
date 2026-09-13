import { useState } from "react";
import { z } from "zod";
import { GraduationCap, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  full_name: z
    .string()
    .trim()
    .nonempty({ message: "Please enter your full name" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Please enter a valid phone number" })
    .max(30, { message: "Phone number must be less than 30 characters" }),
  notes: z
    .string()
    .trim()
    .max(1000, { message: "Please keep your message under 1000 characters" })
    .optional(),
});

type FormValues = z.infer<typeof schema>;
type FormErrors = Partial<Record<keyof FormValues, string>>;

export default function MinistryRegistrationForm() {
  const { toast } = useToast();
  const [values, setValues] = useState({ full_name: "", email: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("ministry_registrations").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      notes: parsed.data.notes || null,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "We could not send your registration",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
    setValues({ full_name: "", email: "", phone: "", notes: "" });
    toast({
      title: "Registration received",
      description: "Thank you! We will contact you with class details.",
    });
  };

  return (
    <div className="rounded-2xl border border-accent bg-card p-6 sm:p-8 shadow-card">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          <GraduationCap size={22} className="text-accent" />
        </div>
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
            School of Ministry — Bible School Registration
          </h2>
          <p className="text-muted-foreground mt-1 leading-relaxed">
            Grow in the Word and be equipped to serve. Register below and we will reach out with
            class dates, times, and materials.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="flex items-start gap-3 rounded-xl bg-accent/10 border border-accent/40 p-5">
          <CheckCircle2 className="text-accent flex-shrink-0" size={22} />
          <div>
            <p className="font-semibold text-foreground">Your registration was received.</p>
            <p className="text-sm text-muted-foreground mt-1">
              We will contact you soon with class details.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-3 text-sm font-medium text-accent hover:underline"
            >
              Register someone else
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="reg-name">Full name</Label>
              <Input
                id="reg-name"
                value={values.full_name}
                maxLength={100}
                autoComplete="name"
                onChange={(e) => handleChange("full_name", e.target.value)}
                aria-invalid={!!errors.full_name}
              />
              {errors.full_name && <p className="text-sm text-destructive">{errors.full_name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email">Email</Label>
              <Input
                id="reg-email"
                type="email"
                value={values.email}
                maxLength={255}
                autoComplete="email"
                onChange={(e) => handleChange("email", e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reg-phone">Phone number</Label>
            <Input
              id="reg-phone"
              type="tel"
              value={values.phone}
              maxLength={30}
              autoComplete="tel"
              onChange={(e) => handleChange("phone", e.target.value)}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reg-notes">Notes or questions (optional)</Label>
            <Textarea
              id="reg-notes"
              rows={4}
              value={values.notes}
              maxLength={1000}
              onChange={(e) => handleChange("notes", e.target.value)}
              aria-invalid={!!errors.notes}
            />
            {errors.notes && <p className="text-sm text-destructive">{errors.notes}</p>}
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto bg-gradient-gold text-foreground font-semibold hover:opacity-90"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={16} /> Submitting…
              </>
            ) : (
              "Submit registration"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
