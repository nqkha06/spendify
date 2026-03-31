import { User, Bell, Shield, Palette, Globe, ChevronRight } from 'lucide-react';
import ExpenseLayout from '@/components/expense-tracker/layout';
import type { ExpenseNavigationItem, ExpenseProfile } from '@/types/expense-tracker';

interface SettingProps {
  navigation: ExpenseNavigationItem[];
  profile?: ExpenseProfile;
}

export default function Setting({ navigation, profile }: SettingProps) {
  return (
    <ExpenseLayout
      title="Settings"
      heading="Settings"
      description="Manage your profile and application preferences."
      activePath="/user/settings"
      navigation={navigation}
      profile={profile}
    >
    <div className="space-y-6 max-w-4xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="md:col-span-1 space-y-1">
          <button className="w-full flex items-center justify-between px-4 py-2.5 bg-primary-50 text-primary-700 rounded-xl font-medium text-sm transition-colors">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4" />
              Profile
            </div>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </button>
          <button className="w-full flex items-center justify-between px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium text-sm transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4" />
              Notifications
            </div>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium text-sm transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4" />
              Security
            </div>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium text-sm transition-colors">
            <div className="flex items-center gap-3">
              <Palette className="w-4 h-4" />
              Appearance
            </div>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium text-sm transition-colors">
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4" />
              Language
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Profile Information</h2>

            <div className="flex items-center gap-6 mb-8">
              <div className="h-20 w-20 bg-linear-to-tr from-primary-500 to-indigo-500 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white overflow-hidden text-2xl font-bold">
                JD
              </div>
              <div>
                <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm mb-2">
                  Change Avatar
                </button>
                <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                <input type="text" defaultValue="John" className="block w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2 px-3 shadow-sm transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                <input type="text" defaultValue="Doe" className="block w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2 px-3 shadow-sm transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" defaultValue="john.doe@example.com" className="block w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2 px-3 shadow-sm transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
                <select className="block w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2 px-3 shadow-sm transition-colors">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>VND (₫)</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-primary-500/30">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ExpenseLayout>
  );
}
