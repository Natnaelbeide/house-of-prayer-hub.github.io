import Layout from "@/components/Layout";
import { ImageIcon } from "lucide-react";

export default function Gallery() {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container px-4">
          <h1 className="font-heading text-4xl font-bold text-center text-foreground mb-2">Gallery</h1>
          <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full mb-10" />
          <div className="text-center py-20">
            <ImageIcon size={64} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">Gallery images coming soon.</p>
            <p className="text-muted-foreground/60 text-sm mt-2">
              Photos will be uploaded by the admin through the content management system.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
