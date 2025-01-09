import {
	index,
	layout,
	route,
	type RouteConfig,
} from "@react-router/dev/routes";

export default ([
	layout("layout/sidebar.tsx", [
		index("routes/home.tsx"),
		route("contacts/:contactId", "routes/contact.tsx"),
		route("contacts/:contactId/edit", "routes/contacts/edit.tsx"),
		route("contacts/:contactId/delete", "routes/contacts/delete.tsx"),
	]),

	route("about", "routes/about.tsx"),
] satisfies RouteConfig);
