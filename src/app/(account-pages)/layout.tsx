"use client";

import React, { FC } from "react";
import { Nav } from "./(components)/Nav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const router = useRouter();
  const {data:session} = useSession();
  const user = session?.user;
  const isLoggedIn = !!user;

  /*if (!isLoggedIn) {
    router.push("/auth/signin");
  }*/

  return (
    <div className="nc-CommonLayoutAccount bg-neutral-50 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-700 pt-12 bg-white dark:bg-neutral-800">
        <Nav />
      </div>
      <div className="container pt-14 sm:pt-20 pb-24 lg:pb-32">{children}</div>
    </div>
  );
};

export default CommonLayout;
