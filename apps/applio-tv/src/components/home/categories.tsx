import { useLocale, useTranslations } from "next-intl";

export default function Categories() {
    const categories = [
        { name: "Music", image: "/Music1.png", link: "music" },
        { name: "Anime", image: "/Anime1.png", link: "anime" },
        { name: "Tutorial", image: "/Tutorial1.png", link: "tutorial" },
        { name: "Comedy", image: "/Comedy1.png", link: "comedy" }
    ];
    const locale = useLocale();
    const t = useTranslations("home");

    return (
        <main>
            <h1 className="md:mx-44 mx-12 mt-12 mb-4 text-3xl tracking-tight md:tracking-tighter font-bold">{t("search_category")}</h1>
            <div className="justify-center lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-4 md:mx-44 mx-12 mb-8">
                {categories.map((category) => (
                    <a key={category.name} href={`${locale}/categories/${category.link}`}>
                        <div className="relative w-full h-full rounded-[12px] overflow-hidden block border border-black/10 hover:saturate-150 cursor-pointer">
                            <img className="w-full h-full aspect-video object-center" src={category.image} alt={`Image of ${category.name}`} />
                        </div>
                    </a>
                ))}
            </div>
        </main>
    )
}