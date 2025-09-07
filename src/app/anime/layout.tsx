import MobileHeader from "@/components/layout/headers/mobileHeader/MobileHeader";

export default function AnimeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileHeader />
      <main>{children}</main>
    </>
  );
}
