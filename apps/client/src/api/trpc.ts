import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import { AppRouter } from '@app/routes';
import { getToken } from './tokenStorage';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api',
      headers: () => {
        const token = getToken();

        if (!token) return {};

        return {
          Authorization: `BEARER ${token}`,
        };
      },
    }),
  ],
});

export const TRPCProvider = trpc.Provider;
