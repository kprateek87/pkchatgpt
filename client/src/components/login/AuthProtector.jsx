"use client";

import { useAppContext } from "@/context/AppContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  return <>{children}</>;
}

export default AuthProtector;
