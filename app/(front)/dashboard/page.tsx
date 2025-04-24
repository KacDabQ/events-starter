import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/dashboard";
import { geAdminByEmail } from "@/lib/getUser";

export default async function DashboardPage() {
  const session: any = await getServerSession(authOptions);
  const { user } = session || { user: null };
  const admin = await geAdminByEmail(user?.email);
  const isAdmin = admin ? true : false;

  console.log("isAdmin from dashboard", isAdmin);

  if (!user) redirect("/");

  return (
    <div>
      <Dashboard isAdmin={isAdmin} />
    </div>
  );
}
