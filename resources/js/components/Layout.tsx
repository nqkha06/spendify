import { Head, Link, usePage } from '@inertiajs/react';
import { Facebook, Twitter, Instagram, Lock, ChevronUp } from 'lucide-react';
import React, { useEffect } from 'react';
import { login, register } from '@/routes';
import expense from '@/routes/expense';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    showFooter?: boolean;
}

export default function Layout({
    children,
    title = 'Spendify - Quan ly chi tieu ca nhan',
}: LayoutProps) {
    const { auth } = usePage().props as {
        auth?: {
            user?: unknown | null;
        };
    };
    const isAuthenticated = Boolean(auth?.user);

    useEffect(() => {
        const backToTopBtn = document.getElementById('backToTop');
        const handleScroll = () => {
            if (window.scrollY > 400) {
                backToTopBtn?.classList.remove('opacity-0', 'pointer-events-none');
                backToTopBtn?.classList.add('opacity-100', 'pointer-events-auto');
            } else {
                backToTopBtn?.classList.add('opacity-0', 'pointer-events-none');
                backToTopBtn?.classList.remove('opacity-100', 'pointer-events-auto');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-50 text-slate-800 antialiased selection:bg-brand-500 selection:text-white min-h-screen flex flex-col font-sans">
            <Head title={title}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10">
                            <img className='w-full h-full object-cover rounded-xl shadow-sm' src="/logo.png" alt="Spendify Logo" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">Spendify</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
                        <a href="/#features" className="hover:text-brand-600 transition-colors">Tính năng</a>
                        <a href="/#how-it-works" className="hover:text-brand-600 transition-colors">Cách hoạt động</a>
                        <a href="/#templates" className="hover:text-brand-600 transition-colors">Câu hỏi thường gặp</a>
                        <a href="/#contact" className="hover:text-brand-600 transition-colors">Liên hệ</a>
                    </div>

                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <Link href={expense.dashboard().url} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm">
                                Tổng quan
                            </Link>
                        ) : (
                            <>
                                <Link href={login()} className="hidden sm:block font-medium text-slate-600 hover:text-brand-600 transition-colors">Đăng nhập</Link>
                                <Link href={register()} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm">
                                    Đăng ký miễn phí
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow pt-20">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white pt-20 pb-10 border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
                        {/* Branding */}
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-10 h-10">
                                    <img className='w-full h-full object-cover rounded-xl shadow-sm' src="/logo.png" alt="Spendify Logo" />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-slate-900">Spendify</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-sm">
                                Cách quản lý chi tiêu thông minh và nhẹ nhàng hơn mỗi ngày. Theo dõi thu chi rõ ràng, duy trì thói quen tài chính bền vững.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-slate-600 hover:text-brand-500 hover:border-brand-500 transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-slate-600 hover:text-brand-500 hover:border-brand-500 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-slate-600 hover:text-brand-500 hover:border-brand-500 transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Sản phẩm</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a href="/#how-it-works" className="hover:text-brand-600 transition-colors">Cách hoạt động</a></li>
                                <li><Link href="/leaderboard" className="hover:text-brand-600 transition-colors">Bảng xếp hạng</Link></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Tiện ích trình duyệt</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Ứng dụng di động</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Giới thiệu bạn bè</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Công ty</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link href="/about" className="hover:text-brand-600 transition-colors">Về chúng tôi</Link></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Tuyển dụng</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Báo chí</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Liên hệ</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Hỗ trợ</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Trung tâm trợ giúp</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Giao dịch bị thiếu</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Chính sách bảo mật</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Điều khoản sử dụng</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-500">
                            &copy; 2026 Spendify. Đã đăng ký bản quyền.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                                <Lock className="w-4 h-4" />
                                MÃ HÓA 256-BIT
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to Top */}
            <button
                id="backToTop"
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-brand-500 hover:-translate-y-1 transition-all duration-300 opacity-0 pointer-events-none"
            >
                <ChevronUp className="w-6 h-6" />
            </button>
        </div>
    );
}
