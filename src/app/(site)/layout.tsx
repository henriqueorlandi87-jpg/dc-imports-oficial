export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dark:bg-[#101828] flex flex-col flex-1 min-h-screen">
      {/* O Header e o Footer antigos foram removidos para dar lugar exclusivo à sua loja */}
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}