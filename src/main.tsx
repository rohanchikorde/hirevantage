
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import App from './App.tsx'
import './index.css'

// Configure React Query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

// Initialize the app
const initApp = async () => {
  // Check Supabase connection on startup (for debugging)
  const { checkSupabaseConnection } = await import('./utils/supabaseHelpers');
  const connected = await checkSupabaseConnection();
  console.log("Supabase connection check on startup:", connected ? "Success" : "Failed");

  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

initApp().catch(error => {
  console.error("Error initializing app:", error);
  // Render the app anyway to avoid a blank screen
  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </QueryClientProvider>
  );
});
