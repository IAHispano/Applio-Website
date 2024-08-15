"use client"

export const runtime = "edge"

export default function CareersPage() {
  return (
    <main className="flex flex-col w-full justify-start items-center text-center relative">
      <div className="min-h-[90svh] flex flex-col justify-center items-center bg-zone w-full p-10 pt-12 pb-28 relative">
        <div className="relative">
          <div className="mx-auto">
            <div className="md:pb-16 py-4 lg:text-center">
              <p className="text-base font-semibold leading-6 tracking-wide text-[#00AA68] uppercase ">
                CAREERS
              </p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight md:tracking-tighter py-2 text-white ltransition max-w-4xl">
                Help us to recover the magic of artificial intelligence.
              </h1>
              <div className="mt-10">
                <a
                  className="bg-white text-black font-medium text-md px-3 py-2 rounded-lg cursor-pointer"
                  href="#join-us"
                >
                  See open positions
                </a>
              </div>
              <p className="flex justify-center items-center mx-auto mt-14">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 234 262"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M135.513 62.3751C147.067 58.1154 158.525 55.8833 170.37 56.3098C187.624 56.6716 200.645 64.798 211.496 77.4453C223.714 91.6854 230.765 108.314 232.816 127.159C233.997 138.015 233.579 148.867 232.096 159.712C230.079 174.461 226.723 188.814 220.711 202.377C215.539 214.046 210.122 225.671 201.937 235.467C191.702 247.715 179.377 256.934 163.96 261.07C158.673 262.489 153.394 262.284 148.174 260.46C140.316 257.715 132.336 255.377 124.382 252.951C120.685 251.823 117.075 251.778 113.381 252.779C103.715 255.397 94.1003 258.262 84.352 260.501C70.7036 263.635 58.4583 260.589 47.8815 250.749C31.5163 235.525 20.0427 216.888 11.6532 196.056C6.3285 182.835 2.38509 169.159 1.11337 154.889C-1.00264 131.144 2.09256 108.292 14.5403 87.6696C21.3562 76.3778 30.1515 66.9244 41.8262 60.7726C48.9133 57.0381 56.5469 55.9969 64.3976 56.211C77.8502 56.5777 90.9126 59.6333 104.022 62.364C104.929 62.553 105.843 62.7072 106.758 62.8502C106.882 62.8695 107.029 62.7277 107.387 62.5514C106.487 59.0799 104.779 55.9439 102.981 52.9121C98.641 45.5932 93.7666 38.6507 88.6491 31.8884C87.094 29.8335 85.2169 28.8951 82.6445 28.9401C77.21 29.0352 75.1317 25.9196 76.8318 20.5179C78.6004 14.8982 83.636 13.0338 88.4334 16.1936C90.0258 17.2423 91.34 18.575 92.5448 20.0585C97.7514 26.4697 102.077 33.4992 106.113 40.7275C108.181 44.4316 109.465 48.471 110.632 52.5545C110.929 53.5964 111.012 54.7785 112.093 55.6003C113.53 54.3577 113.268 52.5027 113.421 50.9983C114.94 36.0447 122.093 24.6043 133.415 15.5219C141.19 9.28455 149.27 3.72894 158.812 0.812341C159.702 0.54056 160.606 0.301193 161.517 0.130463C165.002 -0.521938 167.028 1.30135 167.459 4.9527C169.472 22.037 162.663 35.4978 151.473 47.2382C147.213 51.707 142.602 55.7337 137.741 59.4719C136.959 60.073 136.013 60.546 135.513 62.3751Z"
                    fill="#EAEAEA"
                  />
                </svg>
              </p>
            </div>
            <div className="text-[#f7f8f8] text-[16px] tracking-tight mt-12 max-w-2xl mx-auto text-justify">
              <p className="mb-4 ">
                Do you remember the beginnings of Artificial Intelligence? It
                was something unique, never seen before, that transformed the
                way we live. We were in the future.
              </p>
              <p className="mb-4">
                Today, although Artificial Intelligence is ubiquitous, finding
                products developed with dedication and knowledge is increasingly
                rare. Some open source projects have lost quality and developer
                craftsmanship has been replaced by automatically generated code.
              </p>
              <p className="mb-4">
                At Applio we want to revive that magic, we are working on the
                best open source voice cloning tool for free. Our team is made
                up of qualified engineers who contribute their experience and
                knowledge without expecting anything in return.
              </p>
              <p className="mb-4">
                You too can join our team and contribute to revive the original
                essence and magic of Artificial Intelligence.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-fit flex flex-col w-full p-5 -scroll-mt-1" id="join-us">
        <p className="text-neutral-300">No vacancies are available.</p>
      </div>
    </main>
  )
}
