export function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center min-h-dvh flex-col bg-accent">
      <section className="flex w-full min-h-dvh max-w-[450px] bg-background">{children}</section>
    </main>
  );
}
