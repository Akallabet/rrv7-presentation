import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Outlet, useNavigate } from "react-router";
import { createEmptyContact, getContacts } from "../data";

export default function SidebarLayout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: contacts = [] } = useQuery({
		queryKey: ["contacts"],
		queryFn: () => getContacts(),
	});
	const { mutate: createContact } = useMutation(
		{
			mutationFn: createEmptyContact,
			onSuccess: (newContact) => {
				// Invalidate and refetch
				queryClient.invalidateQueries({ queryKey: ["contacts"] });
				navigate(`contacts/${newContact.id}/edit`);
			},
		},
		queryClient,
	);

	return (
		<>
			<div id="sidebar">
				<h1>
					<Link to="about">React Router Contacts</Link>
				</h1>
				<div>
					<form id="search-form" role="search">
						<input
							aria-label="Search contacts"
							id="q"
							name="q"
							placeholder="Search"
							type="search"
						/>
						<div aria-hidden hidden={true} id="search-spinner" />
					</form>
					<form
						method="post"
						onSubmit={(event) => {
							event.preventDefault();
							createContact();
						}}
					>
						<button type="submit">New</button>
					</form>
				</div>
				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map((contact) => (
								<li key={contact.id}>
									<Link to={`contacts/${contact.id}`}>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>No Name</i>
										)}
										{contact.favorite ? <span>★</span> : null}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No contacts</i>
						</p>
					)}
				</nav>
			</div>
			<div id="detail">
				<Outlet />
			</div>
		</>
	);
}
