import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import NetworkDetector from "./components/NetworkDetector.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <NetworkDetector>
                    <App />
                </NetworkDetector>
            </QueryClientProvider>
        </Provider>
    </StrictMode>
)