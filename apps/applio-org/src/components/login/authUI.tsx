"use client";

import { supabase } from "@/utils/database";
import { AuthError, Provider } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthUI() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<AuthError>();
  const router = useRouter();

  async function loginWithProvider(provider: Provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  async function loginWithEmail(email: string, password: string) {
    setError(undefined);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error);
      console.log(error);
    } else {
      router.replace("/");
    }
  }

  return (
    <main className="w-full h-full absolute top-0 bg-gradient-to-b from-[#FFFFFF]/10 via-[#FFFFFF]/10 to-transparent z-50">
      <section className="flex justify-center items-center m-auto w-full h-full p-8">
        <div className="w-full h-full rounded-xl p-8 xl:max-w-[17%] md:max-w-[60%] md:max-h-[60%] flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">Log In to Applio</h1>

          <div className="flex flex-col w-full h-full gap-4 mt-4">
            <div className="flex flex-col gap-1 max-md:w-full">
              <div className="flex flex-col max-md:mx-auto max-md:mt-2 justify-center gap-2">
                <button
                  className="px-2 py-3 text-white font-semibold text-sm rounded-xl flex justify-center items-center gap-2 bg-[#252525] border border-white/20 hover:bg-opacity-80 hover:border-white/10 slow"
                  onClick={() => loginWithProvider("google")}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="-3 0 262 262"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                  >
                    <path
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      fill="#FFFFFF"
                    />
                  </svg>
                  Continue with Google
                </button>
                <button
                  className="px-2 py-3 text-white font-semibold text-sm rounded-xl flex justify-center items-center gap-2 bg-[#252525] border border-white/20 hover:bg-opacity-80 hover:border-white/10 slow"
                  onClick={() => loginWithProvider("discord")}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 -28.5 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path
                          d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                          fill="#FFFFFF"
                          fill-rule="nonzero"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  Continue with Discord
                </button>
                <button
                  className="px-2 py-3 text-white font-semibold text-sm rounded-xl flex justify-center items-center gap-2 bg-[#252525] border border-white/20 hover:bg-opacity-80 hover:border-white/10 slow"
                  onClick={() => loginWithProvider("github")}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>github [#142]</title>{" "}
                      <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        {" "}
                        <g
                          id="Dribbble-Light-Preview"
                          transform="translate(-140.000000, -7559.000000)"
                          fill="#000000"
                        >
                          {" "}
                          <g
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                          >
                            {" "}
                            <path
                              d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                              id="github-[#142]"
                              fill="#FFFFFF"
                            >
                              {" "}
                            </path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  Continue with Github
                </button>
              </div>
            </div>

            <div className="my-6 border-t border-white/20"></div>

            <h2 className="text-md flex font-bold justify-center">
              Continue with email
            </h2>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl bg-black/20 border border-white/20 p-3 focus:outline-none focus:border focus:border-white/40"
              placeholder="Email address"
            />
            <input
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value === "") {
                  setError(undefined);
                }
              }}
              type="password"
              className="rounded-xl bg-black/20 border border-white/20 p-3 focus:outline-none focus:border focus:border-white/40"
              placeholder="Password"
            />
            <a
              href="/login/forgot-password"
              className="text-xs w-fit px-1 -mt-2 text-neutral-300 hover:text-white slow hover:underline cursor-pointer mb-6"
            >
              Forgot your password?
            </a>
            {error && (
              <p className="flex justify-center text-xs p-3 bg-red-500/40 text-white rounded-xl font-medium">
                {error.message}
              </p>
            )}
            <div className="flex justify-between items-center gap-2 mt-4">
              <button
                onClick={() => loginWithEmail(email, password)}
                className="w-full  border border-white/20 hover:bg-opacity-80 hover:border-white/10 slow p-2 text-sm rounded-2xl font-semibold"
              >
                Log In
              </button>
            </div>
            <a
              href="/login/new-user"
              className="w-full bg-white text-black border border-white hover:bg-opacity-80 hover:border-white/20 slow p-2 text-sm rounded-2xl font-semibold text-center"
            >
              Sign Up
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
