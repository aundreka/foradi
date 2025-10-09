import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React from 'react';

const qc = new QueryClient({
defaultOptions: {
queries: { staleTime: 60_000, refetchOnWindowFocus: false },
},
});

export default function AppProviders({ children }: { children: React.ReactNode }) {
return (
<QueryClientProvider client={qc}>
<BrowserRouter>
{children}
<Toaster position="top-right" />
</BrowserRouter>
</QueryClientProvider>
);
}