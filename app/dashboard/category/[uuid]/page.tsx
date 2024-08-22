"use client";

import React, { useEffect, useState } from "react";

function Index({ params }: { params: { uuid: string } }) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    const isLogin: boolean = localStorage.getItem("isLogin") === "true";
    setIsLogin(isLogin);
  }, []);
  return (
    <div>
      My Post: {params.uuid}, {isLogin ? "ok" : "ng"}
      <button className="bg-[#E85C0D] hover:bg-[#C7253E] text-white font-bold py-2 px-4 rounded">
        Omke Gas
      </button>
    </div>
  );
}

export default Index;
