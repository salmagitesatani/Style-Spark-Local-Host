import { Outlet } from "react-router";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}