import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/dashboard";

export default async function DashboardPage() {
  const session: any = await getServerSession(authOptions);
  const { user } = session || { user: null };

  if (!user) redirect("/");

  return (
    <div>
      <Dashboard />
    </div>
  );
}
