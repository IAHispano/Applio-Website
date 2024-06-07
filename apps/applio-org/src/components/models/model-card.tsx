export default function ModelCard({ data }: { data: { name: string, author_username: string, tags: string, created_at: string } }) {

    function handleDownload() {
        // download model logic here
    }


    return (
      <a className="bg-white/10 border border-white/10 rounded-md w-full h-full p-4">
        <div className="md:justify-between flex max-md:flex-col">
        <div>
        <h1 className="text-2xl max-xs:max-w-[50px] max-lg:max-w-[500px] max-xl:max-w-[600px] max-w-5xl max-md:text-wrap truncate">{data.name}</h1>
        <h2 className="text-white/80 text-xl">by {data.author_username}</h2>
        </div>
        <div className="max-md:mt-4 max-md:flex max-md:flex-col max-md:text-center">
            <button className="text-black bg-white hover:bg-white/80 slow px-6 py-2 md:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl md:rounded-full" onClick={handleDownload}>
            <p className="md:hidden block font-semibold">Download</p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="md:block hidden"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            </button>
        </div>
        </div>
        <div className="md:justify-between max-md:flex max-md:flex-col max-md:text-center flex md:mt-4 mt-2">
        <div className="flex max-md:flex-col gap-2">
        {data.tags.split(',').map((tag, index) => (
            <p className="bg-white/10 px-4 max-md:py-2 rounded-full border border-white/10" key={index}>{tag}</p>
        ))}
        </div>
        <div>
        <p className="text-white/70 max-md:mt-4">published {(() => { const t = Math.round((new Date().getTime() - new Date(data.created_at).getTime()) / (1000 * 60)); return t < 60 ? `${t} minutes` : t < 1440 ? `${Math.floor(t / 60)}h` : `${Math.floor(t / 1440)} days`; })()} ago</p>
        </div>
        </div>
      </a>
    );
  }