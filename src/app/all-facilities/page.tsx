import React from "react";
import Allfacility from "../components/Allfacility/Allfacility";

const Page = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility`,
    {
      cache: "no-cache",
    },
  );

  const data = await res.json();

  return <Allfacility data={data} />;
};

export default Page;
