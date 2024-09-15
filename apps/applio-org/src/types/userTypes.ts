export type User = {
	id: string;
	updated_at: string;
	full_name: string;
	avatar_url: string | null;
	role: string;
	bio: string;
	auth_id: string;
	links: string;
	followers: string;
	developer: boolean;
	writer: boolean;
	premium: boolean;
	admin: boolean;
};
