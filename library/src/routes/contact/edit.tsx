import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getContact, updateContact } from "../../data";

export default function EditContact() {
	const { contactId = "" } = useParams();
	const { data: contact } = useQuery({
		queryKey: ["contact", contactId],
		queryFn: () => getContact(contactId),
	});

	const queryClient = useQueryClient();
	const { mutate } = useMutation(
		{
			mutationFn: ({ id, ...contactDetails }) => {
				updateContact(id, contactDetails);
			},
			onSuccess: () => {
				// Invalidate and refetch
				queryClient.invalidateQueries({ queryKey: ["contacts"] });
			},
		},
		queryClient,
	);

	return (
		contact && (
			<form
				key={contact.id}
				id="contact-form"
				method="post"
				onSubmit={(e) => {
					console.log(e.currentTarget);
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					mutate({
						id: contact.id,
						first: formData.get("first") as string,
						last: formData.get("last") as string,
						twitter: formData.get("twitter") as string,
						avatar: formData.get("avatar") as string,
						notes: formData.get("notes") as string,
					});
				}}
			>
				<p>
					<span>Name</span>
					<input
						aria-label="First name"
						defaultValue={contact.first}
						name="first"
						placeholder="First"
						type="text"
					/>
					<input
						aria-label="Last name"
						defaultValue={contact.last}
						name="last"
						placeholder="Last"
						type="text"
					/>
				</p>
				<label>
					<span>Twitter</span>
					<input
						defaultValue={contact.twitter}
						name="twitter"
						placeholder="@jack"
						type="text"
					/>
				</label>
				<label>
					<span>Avatar URL</span>
					<input
						aria-label="Avatar URL"
						defaultValue={contact.avatar}
						name="avatar"
						placeholder="https://example.com/avatar.jpg"
						type="text"
					/>
				</label>
				<label>
					<span>Notes</span>
					<textarea defaultValue={contact.notes} name="notes" rows={6} />
				</label>
				<p>
					<button type="submit">Save</button>
					<button type="button">Cancel</button>
				</p>
			</form>
		)
	);
}
