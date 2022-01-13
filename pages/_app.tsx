import React from "react";
import { AppProps } from "next/app";
import "antd/dist/antd.css";
import "@styles/global.scss";
import { Provider } from "react-redux";
import store from "@redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
                staleTime: 1,
            },
        },
    });
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ReactQueryDevtools initialIsOpen />
                <Component {...pageProps} />
            </Provider>
        </QueryClientProvider>
    );
}

export default MyApp;
