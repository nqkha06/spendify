import { NavLink } from 'react-router-dom';
import { Wallet, LayoutDashboard, ArrowRightLeft, PieChart, CreditCard, Settings, LogOut, HelpCircle, User } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: ArrowRightLeft },
    { name: 'Budgets', path: '/budgets', icon: PieChart },
    { name: 'Wallets', path: '/wallets', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary-600 text-white p-2 rounded-xl shadow-md shadow-primary-500/30">
              <Wallet className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Expensify</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-9 w-9 bg-linear-to-tr from-primary-500 to-indigo-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white overflow-hidden transition-transform hover:scale-105 active:scale-95">
                <span className="font-semibold text-sm">JD</span>
              </div>
            </button>

            {/* Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg shadow-slate-200/50 py-1 border border-slate-100 ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900">John Doe</p>
                  <p className="text-xs text-slate-500 truncate">john.doe@example.com</p>
                </div>
                <div className="py-1">
                  <NavLink to="/settings" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    <User className="mr-2 h-4 w-4 text-slate-400" />
                    Profile
                  </NavLink>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    <HelpCircle className="mr-2 h-4 w-4 text-slate-400" />
                    Help
                  </a>
                </div>
                <div className="py-1 border-t border-slate-100">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-danger-600 hover:bg-danger-50 transition-colors text-left">
                    <LogOut className="mr-2 h-4 w-4 text-danger-500" />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
