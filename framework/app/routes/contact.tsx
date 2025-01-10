import { Form, useFetcher } from "react-router";

import type { ContactRecord } from "../data";
import { getContact, updateContact } from "../data";
import type { Route } from "./+types/contact";

export async function action({ params, request }: Route.ActionArgs) {
	const formData = await request.formData();
	if (formData.get("favorite") === "true") {
		return updateContact(params.contactId, {
			favorite: true,
		});
	}
	if (!!formData.get("custom")) {
		const contact = await getContact(params.contactId);
		return { contact: { ...contact, custom: "This is your custom action" } };
	}
}

export async function loader({ params }: Route.LoaderArgs) {
	const contact = await getContact(params.contactId);
	return { contact };
}

export default function Contact({ loaderData }: Route.ComponentProps) {
	const { contact } = loaderData;
	if (!contact) {
		throw new Response("Not Found", { status: 404 });
	}

	return (
		contact && (
			<div id="contact">
				<div>
					<img
						alt={`${contact.first} ${contact.last} avatar`}
						key={contact.avatar}
						src={contact.avatar}
					/>
				</div>

				<div>
					<h1>
						{contact.first || contact.last ? (
							<>
								{contact.first} {contact.last}
							</>
						) : (
							<i>No Name</i>
						)}
						<Favorite contact={contact} />
					</h1>

					{contact.twitter ? (
						<p>
							<a href={`https://twitter.com/${contact.twitter}`}>
								{contact.twitter}
							</a>
						</p>
					) : null}

					{contact.notes ? <p>{contact.notes}</p> : null}

					<div>
						<Form action="edit">
							<button type="submit">Edit</button>
						</Form>

						<Form
							action="delete"
							method="post"
							onSubmit={(event) => {
								const response = confirm(
									"Please confirm you want to delete this record."
								);
								if (!response) {
									event.preventDefault();
								}
							}}
						>
							<button type="submit">Delete</button>
						</Form>

						<CustomAction />

						{contact.custom ? <p>{contact.custom}</p> : null}
					</div>
				</div>
			</div>
		)
	);
}

function Favorite({ contact }: { contact: Pick<ContactRecord, "favorite"> }) {
	const fetcher = useFetcher();
	const favorite = contact.favorite;

	return (
		<fetcher.Form method="post">
			<button
				aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
				name="favorite"
				value={favorite ? "false" : "true"}
			>
				{favorite ? "★" : "☆"}
			</button>
		</fetcher.Form>
	);
}

function CustomAction() {
	const fetcher = useFetcher();
	return (
		<fetcher.Form method="post">
			<button type="submit" name="custom" value="custom">
				Custom action
			</button>
		</fetcher.Form>
	);
}
