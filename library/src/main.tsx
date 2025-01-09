import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import Home from "./routes/home.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SidebarLayout from "./layouts/sidebar.tsx";
import Contact from "./routes/contact.tsx";
import About from "./routes/about.tsx";
import EditContact from "./routes/contact/edit.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route element={<SidebarLayout />}>
						<Route index element={<Home />} />
						<Route path="contacts/:contactId" element={<Contact />} />
						<Route path="contacts/:contactId/edit" element={<EditContact />} />
					</Route>
					<Route path="about" element={<About />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);
