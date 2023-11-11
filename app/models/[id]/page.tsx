"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/types/database";
import React, { useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { Button, Spinner, Tooltip, Skeleton } from "@nextui-org/react";
import { ThumbsUp, Copy, Download } from "lucide-react";
import { addPost } from "@/app/actions/like-model-action";
import { Toaster } from "@/components/ui/toaster";
import { useClipboard } from "@mantine/hooks";
import { useToast } from "@/components/ui/use-toast"

interface Model {
    id: string;
    image_url: string; 
    name: string
    author_username: string | null;
    author_id: string | null;
    created_at: string;
    type: string;
    epochs: string;
    algorithm: string;
    link: string;
    likes: string;
  }

  export default function Home({ params }: { params: { id: string } }) {
    const { id } = params;
  
    const supabase = createClientComponentClient<Database>();
    const [data, setData] = useState<Model | null>(null);
    const [error, setError] = useState<PostgrestError | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any | null>(null);
    const [userModels, setUserModel] = useState<any | null>(null);
    const [buttonClicked, setClicked] = useState(false);
    const { toast } = useToast()
    const [allLoad, setAllLoad] = useState(false)
    const [userAllLoad, setUserAllLoad] = useState(false)

  
    useEffect(() => {
        async function fetchData() {
            try {
              const { data: userData, error: userError } = await supabase
                .from("models")
                .select("*")
                .eq("id", id);
      
              if (userError) {
                setError(userError);
              } else {
                setData((userData && userData.length > 0) ? {
                  id: userData[0].id,
                  author_id: userData[0].author_id,
                  name: userData[0].name || null,
                  author_username: null,
                  algorithm: userData[0].algorithm || null,
                  created_at: userData[0].created_at ? new Date(userData[0].created_at).toLocaleDateString('en-US') : null,
                  epochs: userData[0].epochs || null,
                  image_url: userData[0].image_url || null,
                  link: userData[0].link || null,
                  type: userData[0].type || null,
                } as Model : null);
              }
            } catch (error) {
              setError;
            } finally {
              setLoading(false); 
              setAllLoad(true);
            }
          }
  
      fetchData();
    }, [id]);

    useEffect(() => {
        async function fetchUserData() {
          try {
            const { data: userData, error: userError } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", data?.author_id ?? '');
      
            if (userError) {
              setError(userError);
              return;
            }
      
            setUser(userData && userData.length > 0 ? userData[0] : { full_name: "Unknown username" });
          } catch (error) {
            setError;
          }
        }
        if (data?.author_id) {
          fetchUserData();
        }
      }, [data?.author_id]); 
  
    const defaultImageUrl = "https://i.imgur.com/jDmINMQ.png";
    const defaultImageUrl2 = "https://i.imgur.com/UYCcsNM.png";
    const defaultName = "Unknown name";
    const defaultDate = "Unknown date";
    const imageUrlToShow =
      data?.image_url === null || data?.image_url === "n/a" || error
        ? defaultImageUrl
        : data?.image_url;
    const name =
      data?.name === null || data?.name === "n/a" ? defaultName : data?.name;

    const date =
      data?.created_at === null || data?.created_at === "n/a" ? defaultDate : data?.created_at;

    const defaultType = "Unknown type";
    const type =
    data?.type === null || data?.type === "n/a" ? defaultType : data?.type;

    const defaultEpochs = "Unknown";
    const epochs =
    data?.epochs === null || data?.epochs === "n/a" ? defaultEpochs : data?.epochs;

    const defaultAlgorithm = "Unknown algorithm";
    const algorithm =
    data?.algorithm === null || data?.algorithm === "n/a" ? defaultAlgorithm : data?.algorithm;

  
      const handleImageError: React.ReactEventHandler<HTMLImageElement> = (event) => {
        setData((prevData) => {
          if (prevData) {
            return { ...prevData, image_url: defaultImageUrl };
          }
          return prevData;
        });
      };

      const goToProfile = () => {
        window.location.href = `/user/${user.full_name}`;
      }

      function redirect(destination: string) {
        window.location.href = destination;
      }

      const handleDeletePost = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session === null) {
          redirect('/login');
        } else {
    
        if (userLiked) {
          return; 
        }
      
        const likedItems = JSON.parse(localStorage.getItem("likedItems") || "[]");
        likedItems.push(id);
        localStorage.setItem("likedItems", JSON.stringify(likedItems));
    
        const formData = new FormData();
        formData.append("id", id);
      
        await addPost(formData);
        
        setUserLiked(true);
      }
      };
      const [userLiked, setUserLiked] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const clipboard = useClipboard({ timeout: 500 });
      
      useEffect(() => {
        async function fetchModelsUser() {
          try {
            const { data: userData, error: userError } = await supabase
              .from("models")
              .select("*")
              .eq("author_id", data?.author_id ?? '');
      
            if (userError) {
              setError(userError);
              return;
            }
      
            setUserModel(userData);
            setUserAllLoad(true);
            console.log(userData)
          } catch (error) {
            setError;
          }
        }
        if (data?.author_id) {
          fetchModelsUser();
          setUserAllLoad(false);
        }
      }, [data?.author_id]); 

      const downloadModel = () => {
        window.open(`/models/download/${data?.id}`, '_blank');
      }
  

    return (
      <main className="px-2 mx-auto max-w-7xl h-[calc(100vh-64px)] w-full">
        <div className="px-2 py-12">
        <article>
        <Skeleton isLoaded={allLoad} className="rounded-lg bg-white dark:bg-[#3c3c3c]">
          <div className="rounded-xl drop-shadow-md p-4 bg-white dark:bg-[#3c3c3c]">
          <div className="w-full h-40 md:w-full md:h-[480px] rounded-lg object-cover justify-center items-center mx-auto flex mb-4">
          <img
                  src={imageUrlToShow}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover rounded-lg hover:scale-95 gtransition"
                  width={300}
                  height={300}
                  onError={handleImageError}
                  style={{ 
                    objectFit: 'cover',  
                    objectPosition: '50% 20%'  
                }}
                />
            </div>
            <div className="flex items-start flex-col md:flex-row">
              <div className="flex flex-col w-full h-full md:h-24">
                <a>
                  <h3 className="text-2xl font-bold dark:text-white mt-1 md:mt-0 hover:text-3xl gtransition">
                    {name}
                  </h3>
                </a>
                <div className="flex items-center gap-1 -mt-1 md:mt-0">
                    <span className="font-bold text-gray-400 dark:text-neutral-400 cursor-pointer hover:underline text-md" onClick={goToProfile} >{user?.full_name}</span>
                    <span className=" text-gray-400 dark:text-neutral-400 text-md">on {data?.created_at}</span>
                </div>
                <div className="flex items-end md:mt-auto gap-1">
                <div className="flex gap-1 flex-wrap">
                    <span className="bg-gray-200  dark:bg-neutral-900  text-gray-600 dark:text-gray-300 px-2 py-1 rounded-lg text-xs flex items-center justify-center text-center whitespace-pre">
                        {type}
                    </span>
                    <span className="bg-gray-200  dark:bg-neutral-900  text-gray-600 dark:text-gray-300 px-2 py-1 rounded-lg text-xs flex items-center justify-center text-center whitespace-pre">
                        {epochs} epochs
                    </span>
                    <span className="bg-gray-200  dark:bg-neutral-900  text-gray-600 dark:text-gray-300 px-2 py-1 rounded-lg text-xs flex items-center justify-center text-center whitespace-pre uppercase">
                        {algorithm}
                    </span>
                </div>
                </div>
              </div>
              <div className="hidden md:flex h-24 flex-col items-end">
                    <div className="flex gap-2 justify-center items-end mb-auto">
                        <div>
                        <Tooltip placement="left" color="foreground" showArrow content="You must open Applio for this to work!">
                        {data?.link.endsWith('.zip') && ( 
                        <Button
                            color="success"
                            radius="md"
                            size="lg"
                            variant="shadow"
                            className="px-3 py-1 w-14 h-10 rounded-lg flex items-center justify-center gap-1 cursor-pointer bg-green-500 text-black"
                            isIconOnly
                            startContent={isLoading ? null : <img src="https://i.imgur.com/UYCcsNM.png" className="w-full h-full scale-150 hover:scale-110 gtransition"></img>}
                            isDisabled={isLoading}
                            isLoading={isLoading}
                            onClick={async () => {
                                toast({
                                title: "Be patient, this process can take time.",
                                description: "You can check the CMD to see how the download is going."
                                })
                                setTimeout(() => {
                                setIsLoading(true);
                                }, 4000);

                                try {
                                const response = await fetch('http://localhost:8000/download/' + data?.link);
                                toast({
                                    title: '${name} has been downloaded!',
                                })

                                if (!response.ok) {
                                    throw new Error('La solicitud no pudo completarse correctamente');
                                }
                                setTimeout(() => {
                                    setIsLoading(false);
                                }, 4000);
                    
                                } catch (error) {
                                console.error('Error en la solicitud:', error);
                    
                                setIsLoading(false);
                                }
                            }}
                            >
                            </Button>
                             )}
                            </Tooltip>
                        </div> 
                        <Button className="px-3 py-1 w-12 h-10 rounded-lg flex items-center justify-center gap-1 cursor-pointer bg-gray-200 text-black hover:scale-110 active:scale-75 gtransition-low" onClick={handleDeletePost}  isDisabled={userLiked} isIconOnly>
                            <ThumbsUp className={userLiked ? 'text-green-500' : 'text-black'} />
                        </Button> 
                        <div className="px-3 py-1 w-12 h-10 rounded-lg flex  items-center justify-center gap-1 cursor-pointer bg-gray-200 text-black hover:scale-110 active:scale-75 gtransition-low"
                          onClick={() => {
                            clipboard.copy(`https://applio.org/models/download/${id}`);
                            toast({
                              title: "Link copied to clipboard",
                              description: `Now you can share the ${name} model with your friends!`,
                            }) }}
                            >
                        <Copy />
                        </div> 
                        <div className="px-3 py-1 w-12 h-10 rounded-lg flex items-center justify-center gap-1 cursor-pointer bg-black text-white hover:scale-110 active:scale-75 gtransition-low" onClick={downloadModel}>
                            <Download />
                        </div>
                    </div> 
                </div> 
            </div>
          </div>
          </Skeleton>
        <Skeleton isLoaded={userAllLoad} className="flex flex-col p-4 rounded-xl gap-2 items-start w-full drop-shadow-md bg-white dark:bg-neutral-700 mt-4">
            <p>More models by {user?.full_name}</p>
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full rounded-xl MuiBox-root css-0 mt-4">
            {userModels?.map((model: Model) => (
                <div key={model.id} className="relative flex items-start bg-gray-100 dark:bg-neutral-800 rounded-xl flex-shrink-0 h-18 w-72 md:w-[300px] cursor-pointer hover:scale-95 gtransition"  onClick={() => (window.location.href = `/models/${model.id}`)}>
                    <div className="w-32 h-20 md:w-32 md:h-20 rounded-l-lg mr-4 relative object-cover">
                    <img 
                    className="rounded-lg w-full h-full object-cover"  
                    loading="lazy" 
                    decoding="async" 
                    data-nimg="fill" 
                    sizes="(max-width: 768px) 4rem, (max-width: 1200px) 7rem"  
                    src={(model.image_url === null || model.image_url === "N/A") ? defaultImageUrl2 : model.image_url}
                    style={{ 
                        objectFit: 'cover',  
                        objectPosition: '50% 50%'  
                    }}
                />
                    </div> 
                    <div className="flex flex-col items-start py-2 px-1 ">
                        <h1 className="line-clamp-1 overflow-hidden overflow-ellipsis w-full">{model.name}</h1>
                        <h2>{isNaN(new Date(model.created_at).getTime()) ? 'Unknown date' : new Date(model.created_at).toLocaleDateString('en-US')}</h2>
                    </div>
                    <div className="absolute bottom-1 right-2 flex items-center gap-1 rounded-md">
                        <div className="flex items-center gap-1 rounded-md bg-gray-100 dark:bg-neutral-800 px-2 text-center text-gray-400">
                            <ThumbsUp className="w-4 h-4"/>
                            <div className="ml-auto mr-auto">{model.likes}</div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </Skeleton>
        </article>
          </div> 
      </main>
    )
  }