import { ContainerScroll } from "@/components/landing/container-scroll"
import { TextRevealCard } from "@/components/landing/text-card"

export default function IndexPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <div
        className="absolute top-0 h-full min-w-full opacity-10 overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #fff, transparent)",
        }}
      ></div>
      <ContainerScroll
        images=""
        titleComponent={
          <>
            <h1 className="md:text-4xl text-6xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-6xl md:text-[8rem] font-extrabold mt-1 max-md:mt-3 leading-none">
                <span className="block md:hidden">Applio</span>
                Version 3
              </span>
            </h1>
          </>
        }
      />
      <main className="flex flex-col w-full justify-start items-center text-center relative">
        <div className="h-[950px] flex flex-col items-center w-full p-5 -scroll-mt-1 max-md:-mt-32">
          <p className="text-4xl md:text-6xl font-semibold tracking-tighter text-neutral-300 gtransition pb-4">
            But what is <span className="text-white font-bold">Applio</span>?
          </p>
          <p className="font-space-grotesk leading-snug text-white text-[16px] lg:text-[20px] max-w-md md:max-w-xl lg:max-w-[640px] text-center mb-8">
            It is known as the ultimate voice cloning tool, meticulously
            optimized to offer unmatched power, modularity and ease of use.
          </p>
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6 max-w-[1200px]">
            <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">
                  Code Modularization
                </h3>
              </div>
            </div>
            <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">
                  Hop Length Implementation
                </h3>
              </div>
            </div>
            <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">
                  Translations to +30 Languages
                </h3>
              </div>
            </div>
            <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">
                  Cross-Platform Compatibility
                </h3>
              </div>
            </div>
            <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">
                  Optimized Requirements
                </h3>
              </div>
            </div>
            <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">
                  Simple Installation
                </h3>
              </div>
            </div>
            <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">
                  Discord Rich Presence
                </h3>
              </div>
            </div>
            <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">
                  Dataset Creator
                </h3>
              </div>
            </div>
            <div className="box-border relative flex flex-col gap-5 p-8 overflow-hidden no-underline border text-white rounded-xl dark:border-neutral-800">
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-bold leading-5  font-space-grotesk text-white">
                  Efficient Training
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="md:h-[1000px] flex flex-col items-center w-full p-5 md:-mt-64">
          <p className="text-4xl md:text-6xl font-semibold tracking-tighter text-neutral-300 gtransition pb-4 max-md:pt-32">
            And who made <span className="font-bold text-white">Applio</span>?
          </p>
          <p className="font-space-grotesk leading-snug text-white text-[16px] lg:text-[20px] max-w-md md:max-w-xl lg:max-w-[640px] text-center mb-8">
            Who better to do it than you, the community.
          </p>
          <a
            href="https://github.com/IAHispano/Applio?tab=readme-ov-file#contributors"
            rel="noreferrer"
            target="_blank"
          >
            <img
              src="https://contrib.rocks/image?repo=IAHispano/Applio"
              alt="Github collaborators"
            />
          </a>
        </div>
        <div className="md:h-[400px]  flex flex-col items-center w-full p-5">
          <a
            href="https://download.applio.org"
            rel="noreferrer"
            target="_blank"
          >
            <TextRevealCard
              text="Download Applio V3"
              revealText=""
            ></TextRevealCard>
          </a>
        </div>
      </main>
    </div>
  )
}
