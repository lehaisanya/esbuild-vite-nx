import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TRPCProvider, trpcClient } from '../api/trpc';
import { AppPages } from './AppPages';
import { AuthProvider } from '../context/auth.context';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <TRPCProvider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppPages />
        </AuthProvider>
      </QueryClientProvider>
    </TRPCProvider>
  );
};
