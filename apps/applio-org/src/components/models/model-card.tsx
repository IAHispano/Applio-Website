export default function ModelCard({ data }: { data: { name: string, author_username: string, tags: string, created_at: string, id: string } }) {

    function handleDownload() {
        // download model logic here
    }


    return (
      <div className="bg-neutral-700/30 border border-white/10 rounded-lg w-full h-full max-md:p-6 p-5 hover:shadow-lg hover:shadow-white/10 slow">
        <div className="md:justify-between flex max-md:flex-col">
        <div>
        <h1 className="text-2xl max-xs:max-w-[50px] max-lg:max-w-[500px] max-xl:max-w-[600px] max-w-5xl max-md:text-wrap truncate text-left">{data.name}</h1>
        <h2 className="text-white/80 text-xl text-left">by {data.author_username}</h2>
        </div>
        <div className="max-md:mt-4 max-md:flex max-md:flex-col max-md:text-center">
            <a className="text-black bg-white hover:bg-white/80 slow px-6 py-2 md:w-fit w-full justify-center items-center mx-auto flex h-fit rounded-xl shadow-lg shadow-white/50" onClick={handleDownload}>
            <p className="md:hidden block font-semibold">Download</p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:block hidden"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            </a>
        </div>
        </div>
        <div className="md:justify-between max-md:flex md:items-center max-md:flex-col flex md:mt-4 mt-2">
        <div className="grid max-md:grid-cols-3 grid-cols-5 gap-2 max-md:mt-4 h-full max-md:w-full">
        {data.tags && (
        <>        
        {data.tags.split(',').map((tag, index) => (
          <div key={index} className="border border-white/10 rounded-xl py-2 w-full text-center text-sm md:px-4">
            <p className="" key={index}>{tag}</p>
          </div>
        ))}
        </>
        )}
        </div>
        <div>
        <p className="text-white/70 max-md:mt-4 max-md:text-right">published {(() => { const t = Math.round((new Date().getTime() - new Date(data.created_at).getTime()) / (1000 * 60)); return t < 60 ? `${t} minutes` : t < 1440 ? `${Math.floor(t / 60)}h` : `${Math.floor(t / 1440)} days`; })()} ago</p>
        </div>
        </div>
      </div>
    );
  }