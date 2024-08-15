import BlogPost from "@/components/blog/blog-post"

export const runtime = "edge"

export default async function User({ params }: { params: { id: string } }) {
  const { id } = params
  return (
    <section>
      <BlogPost id={id} />
    </section>
  )
}
