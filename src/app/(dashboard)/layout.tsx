import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";


interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: PrivateLayoutProps) {
  
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full !z-50">
        <Navbar session={session}/>
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar session={session}/>
      </div>
      <main className="md:pl-56 h-full pt-[80px]">{children}</main>
    </div>
  );
}
