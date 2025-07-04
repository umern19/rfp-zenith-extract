
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DocumentProvider } from "./contexts/DocumentContext";
import Index from "./pages/Index";
import TranslationViewer from "./pages/TranslationViewer";
import FeatureExtraction from "./pages/FeatureExtraction";
import ScopeExtraction from "./pages/ScopeExtraction";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DocumentProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/translate" element={<TranslationViewer />} />
            <Route path="/features" element={<FeatureExtraction />} />
            <Route path="/scope" element={<ScopeExtraction />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DocumentProvider>
  </QueryClientProvider>
);

export default App;
