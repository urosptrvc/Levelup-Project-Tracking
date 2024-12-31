"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ThemeProvider} from "next-themes";


const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = React.useState(() => new QueryClient({}));
    return (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    );
}

export default Providers;
