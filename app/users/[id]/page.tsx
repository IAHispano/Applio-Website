import Follow from "@/components/follow-user";
import Userinfo from "@/components/user-info";

export default function User({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <Follow userFullName={id} />
      <Userinfo userFullName={id} />
    </div>
  );
}