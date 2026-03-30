import { Wallet } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Wallet className="h-5 w-5 text-slate-400" />
            <span className="text-slate-500 font-medium tracking-tight">Expensify &copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex space-x-6 text-sm text-slate-500">
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Contact Support</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Help</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
