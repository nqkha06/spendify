import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Header />
      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-in fade-in duration-500">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
