import { Database } from "@/app/types/database";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function UsersTable({ id }: { id: string }) {
    const supabase = createClientComponentClient<Database>();

    const [users, setUsers] = useState<any[] | null>(null);
    const [error, setError] = useState<PostgrestError | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const { data: userData, error: userError } = await supabase
                    .from("profiles")
                    .select("full_name, id, role");

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
                    <form style={{ marginBottom: '16px' }}>
                        <Input
                            placeholder="Type to search a user..."
                            size="sm"
                            startContent={<SearchIcon size={18} />}
                            type="search"
                            onChange={(e) => setSearch(e.target.value)} />
                    </form>
                    <Table aria-label="Users table">
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>ROLE</TableColumn>
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
                                        <TableCell className="select-all">{user.id}</TableCell>
                                        <TableCell ><a href={`/users/${user?.full_name}`}>{user.full_name}</a></TableCell>
                                        <TableCell>{user.role}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </section>
    );
}
