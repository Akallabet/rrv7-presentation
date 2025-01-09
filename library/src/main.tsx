import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SidebarLayout from "./layouts/sidebar.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route element={<SidebarLayout />}>
						<Route path="/" element={<App />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);
