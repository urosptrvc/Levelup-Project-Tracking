"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = React.useState(() => new QueryClient({}));
    return (
    <QueryClientProvider client={queryClient}>
            <SessionProvider>
                {children}
            </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    );
}

export default Providers;
