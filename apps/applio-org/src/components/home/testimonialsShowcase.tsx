const TestimonialsShowcase= () => {

    return (
      <div className="gap-4 md:p-4 mt-12 w-full flex flex-col justify-center items-center max-md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:grid-rows-4 gap-4 xl:w-[100svh] xl:h-[50svh]">
          <div className="md:row-span-1 bg-white/10 rounded-xl w-full h-full border border-white/10 flex justify-center items-center mx-auto p-4">
            <p className="p-2">&quot;Fastest and easiest way to demo with any voice.&quot;</p>
          </div>
          <div className="md:row-span-1 bg-white/10 rounded-xl w-full h-full border border-white/10 flex justify-center items-center mx-auto p-4">
           <p className="p-2">&quot;I love the speed and quality of Applio&apos;s voice conversions.&quot;</p>
          </div>
          <div className="md:row-span-3 bg-white/10 rounded-xl w-full h-full border border-white/10 flex justify-center items-center mx-auto p-4">
            <p>&quot;Applio stands out as the sole actively updated fork, ensuring it remains reliable, current, and optimized. Its simplicity and convenience contribute to its dependability.&quot;</p>
          </div>
          <div className="md:row-span-2 bg-white/10 rounded-xl w-full h-full border border-white/10 flex justify-center items-center mx-auto p-2">
            <p>&quot;I am very satisfied with Applio. I have always liked Applio and everything has been fine so far, so far I haven&apos;t found any bugs, everything is fine.&quot;</p>
          </div>
          <div className="md:row-span-3 bg-white/10 rounded-xl w-full h-full border border-white/10 flex justify-center items-center mx-auto p-4">
            <p className="max-w-[140px]">&quot;After experimenting with several similar applications, this is definitely the best I have tried, very clean, easy to understand, and top quality results!&quot;</p>
          </div>
          <div className="md:row-span-1 bg-white/10 rounded-xl w-full h-full border border-white/10 flex justify-center items-center mx-auto p-4">
            <p>&quot;i really like applio&quot;</p>
          </div>
          <div className="md:-span-1 bg-white/10 rounded-xl w-full h-full border border-white/10 flex justify-center items-center mx-auto p-4">
            <p>&quot;It has an incredible variety of models.&quot;</p>
          </div>
        </div>
        <div className="md:flex gap-12 md:mt-12">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">50,000+</h1>
            <h2>downloads /month</h2>
          </div>
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">600,000+</h1>
            <h2>supported by users</h2>
          </div>
        </div>
      </div>
    );
};

export default TestimonialsShowcase;
