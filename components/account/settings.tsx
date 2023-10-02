"use client"
import { useEffect, useState } from "react";
import { Avatar, Code, Spinner } from "@nextui-org/react";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/types/database";

const supabase = createClientComponentClient<Database>();

interface ModelInfoProps {
  userFullName: string;
}

function AccountSettings({ userFullName }: ModelInfoProps) {
  const [error, setError] = useState<PostgrestError | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("full_name, id, role, avatar_url, bio")
        .eq("full_name", userFullName);

      if (userError) {
        setError(userError);
        return;
      }

      setUser(userData[0]);
    }

    fetchData();
  }, [userFullName]);

  return (
    <section>
      <Code>Edit components/account/settings.tsx</Code>
    </section>
  );
}

export default AccountSettings;
