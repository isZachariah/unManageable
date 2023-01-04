import { type AppType } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from "../utils/trpc";
import type { AppProps } from 'next/app';
import "../styles/globals.css";
import React from "react";
import Layout from "../components/layout/layout";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient)
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </>

  );
};

export default trpc.withTRPC(MyApp);
