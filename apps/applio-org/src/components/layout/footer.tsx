export default function Footer() {
  return (
    <footer id="footer" className="relative pt-3 bg-gradient-to-b from-transparent to-white/[0.05] mt-52 border-t border-white/10 z-[1]">
      <div className="m-auto grid min-h-64 max-w-[100rem] relative grid-cols-2 gap-6 p-8 pb-20 pt-10 text-white sm:grid-cols-2 lg:grid-cols-7 z-[1]">
        <div className="col-span-2">
          <h2 className="text-3xl font-bold truncate tracking-tight gtransition mb-5">
            Applio
          </h2>
          <p className="text-sm max-w-xs tracking-wide">
            Dive into a world of endless possibilities fueled by advanced AI audio technology.
          </p>
          <p className="text-md text-neutral-200  mt-5">
            Copyright © 2024 Applio. All Right Reserved.
          </p>
        </div>
        <div className="col-span-1 flex flex-col space-y-2">
          <h1 className="mb-1 text-xs font-bold uppercase">
            Products
          </h1>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/bot"
            target="_blank"
          >
            Discord Bot
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/guides"
            target="_blank"
          >
            Guides
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/playground"
            target="_blank"
          >
            Playground
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/pricing"
            target="_blank"
          >
            Pricing
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/models"
            target="_blank"
          >
            Explore
          </a>
        </div>
        <div className="col-span-1 flex flex-col space-y-2">
          <h1 className="mb-1 text-xs font-bold uppercase">
            Resources
          </h1>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="https://docs.applio.org/faq/"
            target="_blank"
          >
            FAQs
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="https://discord.gg/iahispano"
            target="_blank"
          >
            Support
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="https://docs.applio.org"
            target="_blank"
          >
            Docs
          </a>
        </div>
        <div className="col-span-1 flex flex-col space-y-2">
          <h1 className="mb-1 text-xs font-bold uppercase">
            Legal
          </h1>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/terms/service"
            rel="noreferrer"
            target="_blank"
          >
            Terms of service
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/terms/use"
            rel="noreferrer"
            target="_blank"
          >
            Terms of use
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/terms/privacy"
            rel="noreferrer"
            target="_blank"
          >
            Privacy Policy
          </a>
        </div>
        <div className="col-span-1 flex flex-col space-y-2">
          <h1 className="mb-1 text-xs font-bold uppercase">
            About Us
          </h1>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/team"
            target="_blank"
          >
            Team
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/history"
            target="_blank"
          >
            History
          </a>
          <a
            className="text-gray-300 duration-300 hover:text-white hover:underline z-[1]"
            href="/careers"
            target="_blank"
          >
            Careers
          </a>
        </div>
      </div>
    </footer>
  )
}