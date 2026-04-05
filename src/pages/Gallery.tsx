import Layout from "@/components/Layout";
import { ImageIcon, Camera } from "lucide-react";

export default function Gallery() {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative py-28 bg-gradient-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(40_60%_50%/0.2),transparent_60%)]" />
        </div>
        <div className="relative container px-4 text-center">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Our Moments
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Gallery
          </h1>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full animate-fade-in-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }} />
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="max-w-md mx-auto text-center animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Camera size={36} className="text-muted-foreground/40" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">Coming Soon</h2>
            <p className="text-muted-foreground leading-relaxed">
              Gallery images will be available soon. Photos will be uploaded by the admin through the content management system.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
