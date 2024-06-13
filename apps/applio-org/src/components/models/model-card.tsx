export default function ModelCard({ data }: { data: { name: string, author_username: string, tags: string, created_at: string, id: string } }) {
    return (
      <div className="bg-neutral-700/30 border border-white/10 rounded-lg w-full h-full max-md:p-6 p-5 hover:shadow-lg hover:shadow-white/10 slow">
        <div className="md:justify-between flex max-md:flex-col">
        <div>
        <h1 className="text-2xl max-xs:max-w-[50px] max-lg:max-w-[500px] max-xl:max-w-[600px] max-w-5xl max-md:text-wrap truncate text-left font-semibold">{data.name}</h1>
        <h2 className="text-white/80 text-xl text-left">by {data.author_username}</h2>
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