"use client";

import { useState } from "react";
import Form, { FormData } from "@/components/layout/Forms/Form";
import Search from "@/components/ui/inputs/search/Search";

const Page = () => {
  const [initialData, setInitialData] = useState<Partial<FormData> | undefined>(
    undefined
  );

  return (
    <>
      <main>
        <Search onResult={setInitialData} />
        <Form initialData={initialData} />
      </main>
    </>
  );
};

export default Page;
