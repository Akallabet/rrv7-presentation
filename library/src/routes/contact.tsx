import { useQuery } from "@tanstack/react-query";
import { ContactRecord, getContact } from "../data";
import { useParams } from "react-router";

export default function Contact() {
	const { contactId = "" } = useParams();
	const { isLoading, data: contact } = useQuery({
		queryKey: ["contact", contactId],
		queryFn: () => getContact(contactId),
	});
	return (
		(isLoading && <div>Loading...</div>) ||
		(!isLoading && !contact && (
			<main id="error-page">
				<h1>404</h1>
				<p>Contact not found</p>
			</main>
		)) ||
		(!isLoading && contact && (
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
						<form action="edit">
							<button type="submit">Edit</button>
						</form>

						<form
							action="destroy"
							method="post"
							onSubmit={(event) => {
								const response = confirm(
									"Please confirm you want to delete this record.",
								);
								if (!response) {
									event.preventDefault();
								}
							}}
						>
							<button type="submit">Delete</button>
						</form>
					</div>
				</div>
			</div>
		))
	);
}

function Favorite({
	contact,
}: {
	contact: Pick<ContactRecord, "favorite">;
}) {
	const favorite = contact.favorite;

	return (
		<form method="post">
			<button
				aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
				name="favorite"
				value={favorite ? "false" : "true"}
			>
				{favorite ? "★" : "☆"}
			</button>
		</form>
	);
}
