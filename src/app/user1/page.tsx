"use client";

import React, { useState } from "react";
import { sessionStatus } from "../utils/session";
import { redirect } from "next/navigation";
import { auth } from "../../../firebase";
import { useAuthContext } from "../layout";
import withAuth from "../component/withAuth";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Button
        loading={loading}
        onClick={() => {
          setLoading(true);
          router.push("/user2");
        }}
        className="mt-[10px] ml-[10px]"
        type="primary"
      >
        route to user 2
      </Button>
      <h1>This is a server 2 component</h1>
    </div>
  );
};

export default withAuth(Page);
