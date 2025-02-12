
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthDocumentation from "./pages/AuthDocumentation";
import PianoManagementDocs from "./pages/PianoManagementDocs";
import AdminDocs from "./pages/AdminDocs";
import UserGuideDocs from "./pages/UserGuideDocs";
import TechnicalDocs from "./pages/TechnicalDocs";
import FAQDocs from "./pages/FAQDocs";
import Pianos from "./pages/Pianos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/documentation" element={<AuthDocumentation />} />
            <Route path="/docs/piano-management" element={<PianoManagementDocs />} />
            <Route path="/docs/admin" element={<AdminDocs />} />
            <Route path="/docs/user-guide" element={<UserGuideDocs />} />
            <Route path="/docs/technical" element={<TechnicalDocs />} />
            <Route path="/docs/faq" element={<FAQDocs />} />
            <Route path="/pianos" element={<Pianos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
