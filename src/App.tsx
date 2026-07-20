import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Giving from "./pages/Giving";
import Gallery from "./pages/Gallery";
import Connect from "./pages/Connect";
import ChildrenAndYouth from "./pages/ChildrenAndYouth";
import BibleTracker from "./pages/BibleTracker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/giving" element={<Giving />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/children-youth" element={<ChildrenAndYouth />} />
          <Route path="/bible-tracker" element={<BibleTracker />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
