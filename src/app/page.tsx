"use client";

import { useState } from "react";
import Form, { FormData } from "@/components/layout/forms/Form";
import Nav from "@/components/layout/Nav/Nav";
import Search from "@/components/ui/inputs/search/Search";

const Page = () => {
  const [initialData, setInitialData] = useState<Partial<FormData> | undefined>(
    undefined
  );

  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Search onResult={setInitialData} />
        <Form initialData={initialData} />
      </main>
    </>
  );
};

export default Page;
