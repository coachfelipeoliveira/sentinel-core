import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import ETLJobs from "@/pages/ETLJobs";
import QualysIntegration from "@/pages/QualysIntegration";
import AIAssistant from "@/pages/AIAssistant";
import Vulnerabilities from "@/pages/Vulnerabilities";
import MitreAttack from "@/pages/MitreAttack";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/etl-jobs" element={<MainLayout><ETLJobs /></MainLayout>} />
          <Route path="/qualys" element={<MainLayout><QualysIntegration /></MainLayout>} />
          <Route path="/ai-assistant" element={<MainLayout><AIAssistant /></MainLayout>} />
          <Route path="/vulnerabilities" element={<MainLayout><Vulnerabilities /></MainLayout>} />
          <Route path="/mitre" element={<MainLayout><MitreAttack /></MainLayout>} />
          <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
