import Form from "@/components/login/form";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

export default async function Login() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <div className="mt-10">
      <Form />
    </div>
  );
}
