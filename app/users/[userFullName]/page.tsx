import Follow from "@/components/follow-user";
import Userinfo from "@/components/user-info";

export default function User({ params }: { params: { userFullName: string } }) {
  const { userFullName } = params;

  return (
    <div>
      <Follow userFullName={userFullName} />
      <Userinfo userFullName={userFullName} />
    </div>
  );
}