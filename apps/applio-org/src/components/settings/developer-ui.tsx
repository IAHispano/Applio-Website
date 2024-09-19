"use client";

import ApiUsage from "@/components/api/usage";
import Background2 from "@/components/svg/background2";
import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";

export default function DeveloperUi() {
    const [authId, setAuthId] = useState<string>("");
    const [userTokens, setUserTokens] = useState<
        Array<{
            token: string;
            created_at: string;
            usage: number;
            role: "user" | "premium";
        }>
    >([]);
    const [loading, setLoading] = useState(true);
    const [end, setEnd] = useState(3);
    const [generating, setGenerating] = useState(false);

    const fetchUserTokens = async () => {
        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (error) {
            console.error("Error fetching session:", error);
            setLoading(false);
            return;
        }

        if (session?.user.id) {
            const { data, error: tokenError } = await supabase
                .from("tokens")
                .select("*")
                .eq("user", session.user.id)
                .range(0, end);

            if (tokenError) {
                console.error("Error fetching tokens:", tokenError);
                setLoading(false);
                return;
            }

            setUserTokens(data || []);
        } else {
            console.error("Error: User ID is undefined.");
        }
        setLoading(false);
    };

    const handleGenerateToken = async () => {
        setGenerating(true);
        const { data: user, error: userError } = await supabase.auth.getUser();

        if (userError) {
            console.error("Error fetching user:", userError);
            setGenerating(false);
            return;
        }

        if (user.user.id) {
            if (userTokens.length >= 3) {
                console.error("Error: You cannot create more than 3 keys.");
                setGenerating(false);
                return;
            }

            const { data: publicData, error: profileError } = await supabase
                .from("profiles")
                .select("premium")
                .eq("auth_id", user.user.id)
                .single();

            if (profileError) {
                console.error("Error fetching user role:", profileError.message);
                setGenerating(false);
                return;
            }

            const { error: tokenError } = await supabase.from("tokens").upsert([
                {
                    user: user.user.id,
                    role: publicData?.premium ? "premium" : "user",
                },
            ]);

            if (tokenError) {
                console.error("Error at saving token:", tokenError.message);
            } else {
                fetchUserTokens();
                window.location.reload(); // TODO: It it's better to use state updates.
            }
        } else {
            console.error("Error: User ID is undefined.");
        }
        setGenerating(false); // End generating
    };

    useEffect(() => {
        const tryGetSession = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error fetching user:", error);
                return;
            }

            if (data.user === null) {
                window.location.href = "/login";
            }

            if (data.user) {
                setAuthId(data.user.id);
            }
        };

        fetchUserTokens();
        tryGetSession();
    }, []);

    return (
        <main className="h-full w-full items-center flex flex-col mx-auto">
            <div className="absolute">
                <Background2 />
            </div>
            <div className="justify-between items-start flex flex-col mb-12 w-full relative">
                <div className="flex md:justify-between w-full max-md:gap-6">
                    <h1 className="pl-0.5 md:text-5xl text-4xl font-bold">
                        API Dashboard
                    </h1>
                    <button
                        className={`mt-2 px-4 rounded-xl h-10 bg-white hover:bg-white/80 slow text-black font-semibold flex justify-center items-center gap-2 max-md:mt-6 ${userTokens.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={userTokens.length < 3 ? handleGenerateToken : undefined}
                        disabled={userTokens.length >= 3 || generating}
                    >
                        {generating ? (
                            <span>Generating...</span>
                        ) : (
                            <>
                                <span>
                                    <svg
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="20"
                                        height="20"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </span>
                                Create an API key
                            </>
                        )}
                    </button>
                </div>
                <p className="pl-1 text-[#9E9E9E]">
                    Manage your API keys, if you have any questions please refer to the
                    documentation.
                </p>
            </div>
            <ApiUsage auth_id={authId} />
            {!loading && userTokens.length === 0 && (
                <p className="md:h-[40svh] text-[#9E9E9E] md:mt-40 text-xl max-md:mb-12 md:text-3xl">
                    Not find api keys, generate one.
                </p>
            )}
            {!loading && userTokens && (
                <p className="md:justify-start md:items-end flex max-md:flex-col max-md:text-center max-md:w-full text-[#9E9E9E] mt-4">
                    You have{" "}
                    <span className="read-font md:mx-1 text-white/80">
                        {userTokens.length}
                    </span>{" "}
                    space left out of{" "}
                    <span className="read-font md:mx-1 text-white/80">{end}</span> for a
                    new key.
                </p>
            )}
        </main>
    );
}
