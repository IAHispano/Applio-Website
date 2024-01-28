import GuidePost from "@/components/guides/guide-post"

export default async function PostGuide({ params }: { params: { id: string } }) {
  const { id } = params
  return (
    <section>
      <GuidePost id={id} />
    </section>
  )
}
