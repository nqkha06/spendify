import { User, Bell, Shield, Palette, Globe, ChevronRight } from 'lucide-react';
import TrackerLayout from '@/components/expense-tracker/layout';
import type {
    TrackerNavigationItem,
    TrackerProfile,
} from '@/types/expense-tracker';

interface SettingProps {
    navigation: TrackerNavigationItem[];
    profile?: TrackerProfile;
}

export default function Setting({ navigation, profile }: SettingProps) {
    return (
        <TrackerLayout
            title="Cài đặt"
            heading="Cài đặt"
            description="Quản lý hồ sơ và tùy chọn ứng dụng của bạn."
            activePath="/user/settings"
            navigation={navigation}
            profile={profile}
        >
            <div className="mx-auto w-full max-w-4xl space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    {/* Navigation Sidebar */}
                    <div className="space-y-1 md:col-span-1">
                        <button className="text-primary-700 flex w-full items-center justify-between rounded-xl bg-primary-50 px-4 py-2.5 text-sm font-medium transition-colors">
                            <div className="flex items-center gap-3">
                                <User className="h-4 w-4" />
                                Hồ sơ
                            </div>
                            <ChevronRight className="h-4 w-4 opacity-50" />
                        </button>
                        <button className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                            <div className="flex items-center gap-3">
                                <Bell className="h-4 w-4" />
                                Thông báo
                            </div>
                        </button>
                        <button className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                            <div className="flex items-center gap-3">
                                <Shield className="h-4 w-4" />
                                Bảo mật
                            </div>
                        </button>
                        <button className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                            <div className="flex items-center gap-3">
                                <Palette className="h-4 w-4" />
                                Giao diện
                            </div>
                        </button>
                        <button className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                            <div className="flex items-center gap-3">
                                <Globe className="h-4 w-4" />
                                Ngôn ngữ
                            </div>
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="space-y-6 md:col-span-3">
                        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                            <h2 className="mb-6 text-lg font-bold text-slate-900">
                                Thông tin hồ sơ
                            </h2>

                            <div className="mb-8 flex items-center gap-6">
                                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-linear-to-tr from-primary-500 to-indigo-500 text-2xl font-bold text-white shadow-md">
                                    JD
                                </div>
                                <div>
                                    <button className="mb-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                                        Đổi ảnh đại diện
                                    </button>
                                    <p className="text-xs text-slate-500">
                                        JPG, GIF hoặc PNG. Dung lượng tối đa
                                        800K
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">
                                        Tên
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Nguyễn"
                                        className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 shadow-sm transition-colors focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">
                                        Họ
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Văn A"
                                        className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 shadow-sm transition-colors focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-slate-700">
                                        Địa chỉ email
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="nguyenvana@example.com"
                                        className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 shadow-sm transition-colors focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-slate-700">
                                        Tiền tệ
                                    </label>
                                    <select className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 shadow-sm transition-colors focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>GBP (£)</option>
                                        <option>VND (₫)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">
                                <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-50">
                                    Hủy
                                </button>
                                <button className="hover:bg-primary-700 rounded-xl bg-primary-600 px-6 py-2 font-medium text-white shadow-sm shadow-primary-500/30 transition-colors">
                                    Lưu thay đổi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TrackerLayout>
    );
}
