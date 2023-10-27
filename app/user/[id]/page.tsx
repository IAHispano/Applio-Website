import Follow from "@/components/account/follow-user";
import Usermodels from "@/components/account/user-models";
import Head from "next/head";

export default function User({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <Head>
        <meta name="description" content={`Visit the user ${id} on Applio.`} />
      </Head> 
      <Follow userFullName={id} />
      <Usermodels userFullName={id} />
    </div>
  );
}