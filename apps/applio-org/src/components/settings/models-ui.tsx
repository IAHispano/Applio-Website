"use client";

import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";

interface Model {
	id: string;
	name: string;
	created_at: string;
	description: string;
	link: string;
}

export default function ModelsUI() {
	const [models, setModels] = useState<Model[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingModel, setEditingModel] = useState<Model | null>(null);
	const [editedName, setEditedName] = useState("");
	const [editedField2, setEditedField2] = useState("");
	const [editedField3, setEditedField3] = useState("");

	useEffect(() => {
		async function fetchUser() {
			setLoading(true);
			const { data, error } = await supabase.auth.getSession();
			if (error) {
				setLoading(false);
				return;
			}
			if (data.session) {
				const { data: user, error } = await supabase
					.from("profiles")
					.select("*")
					.eq("auth_id", data.session.user.id)
					.single();
				if (error) {
					setLoading(false);
					return;
				}
				if (user) {
					const { data: models, error } = await supabase
						.from("models")
						.select("*")
						.eq("author_username", user.full_name);
					if (error) {
						setLoading(false);
						return;
					}
					setModels(models);
				}
			}
			setLoading(false);
		}

		fetchUser();
	}, []);

	async function removeModel(id: string) {
		const { data, error } = await supabase.from("models").delete().eq("id", id);
		window.location.href = "/settings?p=models";
	}

	function redirectToModels(id: string) {
		window.location.href = `/models?id=${id}`;
	}

	function openEditForm(model: Model) {
		console.log("hola", model);
		setEditingModel(model);
		setEditedName(model.name);
		setEditedField2(model.description);
		setEditedField3(model.link);
	}

	function closeEditForm() {
		setEditingModel(null);
		setEditedName("");
		setEditedField2("");
		setEditedField3("");
	}

	async function saveEditedModel() {
		if (editingModel && editedName && editedField2 && editedField3) {
			const { data, error } = await supabase
				.from("models")
				.update({
					name: editedName,
					description: editedField2,
					link: editedField3,
				})
				.eq("id", editingModel.id);
			if (error) {
				console.log(error);
			} else {
				setModels(
					models.map((model) =>
						model.id === editingModel.id
							? { ...model, name: editedName }
							: model,
					),
				);
				closeEditForm();
			}
		}
	}

	if (loading) return <p className="text-xs text-neutral-400">Loading...</p>;

	return (
		<section className="flex flex-col items-start justify-start w-full">
			<h1 className="text-5xl font-bold">Models</h1>
			<h2 className="text-neutral-400 text-sm mx-0.5">
				Edit or delete your models.
			</h2>
			<div className="grid md:grid-cols-3 mt-6 gap-4">
				{models.map((model) => (
					<div
						key={model.id}
						className="hover:bg-neutral-700/30 flex flex-col items-start justify-start rounded-lg border border-white/20 min-h-[15svh] p-4"
					>
						<div className="flex justify-between w-full">
							<h3 className="text-xl font-bold">{model.name}</h3>
							<div className="flex flex-col items-center justify-end gap-2 h-fit">
								<button
									onClick={() => redirectToModels(model.id)}
									className="bg-neutral-700/40 hover:bg-neutral-600 text-white/80 text-sm p-2 rounded-xl border border-white/10"
									type="button"
								>
									<svg
										className="w-4 h-4"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M11.9944 15.5C13.9274 15.5 15.4944 13.933 15.4944 12C15.4944 10.067 13.9274 8.5 11.9944 8.5C10.0614 8.5 8.49439 10.067 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5ZM11.9944 13.4944C11.1691 13.4944 10.5 12.8253 10.5 12C10.5 11.1747 11.1691 10.5056 11.9944 10.5056C12.8197 10.5056 13.4888 11.1747 13.4888 12C13.4888 12.8253 12.8197 13.4944 11.9944 13.4944Z"
											fill="#ffffff"
										></path>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M12 5C7.18879 5 3.9167 7.60905 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C16.8112 19 20.0833 16.391 21.8107 14.5202C23.1426 13.0778 23.1426 10.9222 21.8107 9.47978C20.0833 7.60905 16.8112 5 12 5ZM3.65868 10.8366C5.18832 9.18002 7.9669 7 12 7C16.0331 7 18.8117 9.18002 20.3413 10.8366C20.9657 11.5128 20.9657 12.4872 20.3413 13.1634C18.8117 14.82 16.0331 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366Z"
											fill="#ffffff"
										></path>
									</svg>
								</button>
								<button
									onClick={() => openEditForm(model)}
									className="bg-neutral-700/40 hover:bg-neutral-600 text-white/80 text-sm p-2 rounded-xl border border-white/10"
									type="button"
								>
									<svg
										className="w-4 h-4"
										viewBox="0 0 214 214"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
									>
										<path
											d="M210.523 48.0542C215.159 43.4181 215.159 35.6914 210.523 31.2932L182.707 3.47702C178.309 -1.15901 170.582 -1.15901 165.946 3.47702L144.073 25.2307L188.65 69.8078M0 169.423V214H44.5771L176.05 82.4083L131.473 37.8311L0 169.423Z"
											fill="white"
										/>
									</svg>
								</button>
								<button
									onClick={() => removeModel(model.id)}
									className="bg-neutral-700/40 hover:bg-red-500/30 text-white/80 text-sm px-2 py-2 rounded-xl border border-white/10"
									type="button"
								>
									<svg
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										className="w-4 h-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#ffffff"
										strokeWidth="1"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M3 6h18" />
										<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
										<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
									</svg>
								</button>
							</div>
						</div>
						<p className="text-neutral-400 text-sm mx-0.5">
							{new Date(model.created_at).toLocaleDateString("en-EN", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
					</div>
				))}
			</div>

			{editingModel && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-neutral-800 rounded-lg p-6 w-full max-w-md">
						<h2 className="text-2xl font-bold mb-4">Edit Model</h2>
						<div className="space-y-4">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-neutral-300 mb-2"
								>
									Name
								</label>
								<input
									id="name"
									value={editedName}
									onChange={(e) => setEditedName(e.target.value)}
									className="w-full bg-neutral-700/40 hover:bg-neutral-600 text-white/80 text-sm p-2 rounded-xl border border-white/10 focus:outline-none slow"
								/>
							</div>
							<div>
								<label
									htmlFor="field2"
									className="block text-sm font-medium text-gray-300 mb-2"
								>
									Description
								</label>
								<input
									id="field2"
									value={editedField2}
									onChange={(e) => setEditedField2(e.target.value)}
									className="w-full bg-neutral-700/40 hover:bg-neutral-600 text-white/80 text-sm p-2 rounded-xl border border-white/10 focus:outline-none slow"
								/>
							</div>
							<div>
								<label
									htmlFor="field3"
									className="block text-sm font-medium text-gray-300 mb-2"
								>
									Link
								</label>
								<input
									id="field3"
									required
									type="url"
									value={editedField3}
									onChange={(e) => setEditedField3(e.target.value)}
									className="w-full bg-neutral-700/40 hover:bg-neutral-600 text-white/80 text-sm p-2 rounded-xl border border-white/10 focus:outline-none slow"
								/>
							</div>
						</div>
						<div className="mt-6 flex justify-end space-x-3">
							<button type="button" onClick={closeEditForm}>
								Cancel
							</button>
							<button
								type="submit"
								onClick={saveEditedModel}
								className="px-4 py-1 bg-white text-black rounded-xl font-medium"
							>
								Save changes
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
