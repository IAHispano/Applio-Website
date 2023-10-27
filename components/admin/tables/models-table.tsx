import { Database } from "@/app/types/database";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Spinner } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ModelsTable({ id }: { id: string }) {
    const supabase = createClientComponentClient<Database>();

    const [users, setUsers] = useState<any[] | null>(null);
    const [error, setError] = useState<PostgrestError | null>(null);
    const [search, setSearch] = useState('');
    const [end, setEnd] = useState(20000);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data: userData, error: userError } = await supabase
                    .from("models")
                    .select("*")
                    .range(0, end)

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
    function loadmore() {
        setEnd(end + 49); 
      }
    const usersLength: number = users?.length ?? 0
    return (
        <section className="hidden md:block">
            <div className="">
                <div className="md:mx-24 h-fit">
                    <div className="flex justify-between items-center py-2">
                    <span className="text-default-400 text-small">There are currently {users?.length} models. (Limited by Supabase, in <span className="text-white">total there are 15535 models</span>.)</span>
                    </div>
                    <form style={{ marginBottom: '16px' }}>
                        <Input
                            placeholder="Type to search a model..."
                            size="sm"
                            startContent={<SearchIcon size={18} />}
                            type="search"
                            onChange={(e) => setSearch(e.target.value)} />
                    </form>
                    <Table aria-label="Users table">
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>AUTHOR ID</TableColumn>
                            <TableColumn>TYPE</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"Loading data..."}>
                            {(users || [])
                                ?.filter((item) => {
                                    const itemName = item && item.name ? item.name.toLowerCase() : '';
                                    const searchLower = search.toLowerCase();
                                    return searchLower === '' ? true : itemName.includes(searchLower);
                                })
                                .map((user: any) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="select-all">{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.author_id}</TableCell>
                                        <TableCell>{user.type}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </section>
    );
}
