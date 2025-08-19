import Form from "@/components/layout/forms/Form";
import Nav from "@/components/layout/Nav/Nav";
import Search from "@/components/ui/inputs/search/Search";

const Page = () => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Search />
        <Form />
      </main>
    </>
  );
};

export default Page;
