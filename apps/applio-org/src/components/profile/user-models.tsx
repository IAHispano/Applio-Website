import ModelCard from "../models/model-card";

export default function UserModels({ data }: { data: any[] }) {
    console.log(data);
    return (
        <section className="mt-44 w-full grid gap-4 md:grid-cols-4 z-30">
            {Array.isArray(data) && data.map((model: any, index: number) => {
                console.log(model); // Añadido para depuración
                return (
                    <a href={`/models?id=${model.id}`} className="w-full h-full flex cursor-pointer" key={index}>
                        <ModelCard key={index} data={model} />
                    </a>
                );
            })}
        </section>
    );
}
