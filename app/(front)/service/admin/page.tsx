import Admin from "@/components/admin/admin";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { redirect } from "next/navigation";
import { geAdminByEmail } from "@/lib/getUser";

export default async function AdminPage() {
  const session: any = await getServerSession(authOptions);
  const { user } = session || { user: null };
  const admin = await geAdminByEmail(user?.email);

  if (!admin) redirect("/");

  return (
    <div>
      <Admin />
    </div>
  );
}
