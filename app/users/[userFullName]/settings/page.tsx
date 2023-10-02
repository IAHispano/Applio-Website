import AccountSettings from "@/components/account/settings";

export default function User({ params }: { params: { userFullName: string } }) {
  const { userFullName } = params;

  return (
    <div className="flex justify-center items-center mx-auto my-8">
      <AccountSettings userFullName={userFullName}/>
    </div>
  );
}