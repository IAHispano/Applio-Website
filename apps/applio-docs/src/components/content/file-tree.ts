export interface FileTreeEntry {
	name: string;
	children?: FileTreeEntry[];
	description?: string;
	highlighted?: boolean;
	open?: boolean;
}
