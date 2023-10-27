import { Database } from "@/app/types/database";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function BlogsTable({ id }: { id: string }) {
    const supabase = createClientComponentClient<Database>();

    const [users, setUsers] = useState<any[] | null>(null);
    const [error, setError] = useState<PostgrestError | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const { data: userData, error: userError } = await supabase
                    .from("blog")
                    .select("title, id, by");

                if (userError) {
                    setError(userError);
                } else {
                    setUsers(userData);
                }
            } catch (err: any) {
                setError(err);
            }
        }

        fetchData();
    }, []);

    return (
        <section className="hidden md:block">
            <div className="">
                <div className="md:mx-24 h-fit">
                <div className="flex justify-between items-center py-2">
                <span className="text-default-400 text-small">There are currently <span className="text-white">{users?.length} posts</span>.</span>
                </div>
                    <form style={{ marginBottom: '16px' }}>
                        <Input
                            placeholder="Type to search a post..."
                            size="sm"
                            startContent={<SearchIcon size={18} />}
                            type="search"
                            onChange={(e) => setSearch(e.target.value)} />
                    </form>
                    <Table aria-label="Users table">
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>TITLE</TableColumn>
                            <TableColumn>BY</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"Loading data..."}>
                            {(users || [])
                                ?.filter((item) => {
                                    const itemName = item && item.full_name ? item.full_name.toLowerCase() : '';
                                    const searchLower = search.toLowerCase();
                                    return searchLower === '' ? true : itemName.includes(searchLower);
                                })
                                .map((user: any) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.title}</TableCell>
                                        <TableCell>{user.by}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </section>
    );
}
