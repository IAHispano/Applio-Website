import UserCard from "@/components/profile/user-card";
import { supabase } from "@/utils/database";

export async function generateMetadata({ params }: { params: { id: string } }) {
    const id = params.id;

    if (id) {
    const { data, error } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("full_name", id)
        .single();
  
    if (error) {
        return {
            title: 'Applio',
        };
    }
    if (data) {
    return {
        title: `${data.full_name} in Applio.`,
        description: `See ${data.full_name} profile.`,
        openGraph: {
            title:  `${data.full_name} in Applio.`,
            images: data.avatar_url,
            description: `See ${data.full_name} profile.`,
        }  
    };
    }
}
}

export default function Profile({ params }: { params: { id: string } }) {
    const id = params.id

    return (
        <main className="md:min-h-[80svh] flex justify-center items-start p-16 mx-auto">
           <UserCard id={id} />
        </main>
    )
}
