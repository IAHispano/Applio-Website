import Follow from "@/components/account/follow-user";
import Usermodels from "@/components/account/user-models";

export default function User({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <Follow userFullName={id} />
      <Usermodels userFullName={id} />
    </div>
  );
}