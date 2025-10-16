"use client";

import { useAppContext } from "@/context/AppContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../chatScreen/Sidebar";

function AuthProtector({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, setLoading } = useAppContext();

  useEffect(() => {
    if (!loading && !user && pathname !== "/login") {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [user, pathname, router, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="dark:bg-gradient-to-b dark:from-[#242124] dark:to-[#000]">
        <div className="flex h-screen">
          {pathname !== "/login" && <Sidebar />}
          {children}
        </div>
      </div>
    </>
  );
}

export default AuthProtector;
