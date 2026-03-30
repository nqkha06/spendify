import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Wallet, ArrowRight, Facebook, Twitter, Instagram, Lock, ChevronUp } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    showFooter?: boolean;
}

export default function Layout({
    children,
    title = 'Backcash - Earn Cashback Everywhere',
    showFooter = true,
}: LayoutProps) {
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
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-sm">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">Backcash</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
                        <a href="/#features" className="hover:text-brand-600 transition-colors">Features</a>
                        <a href="/#how-it-works" className="hover:text-brand-600 transition-colors">Workflow</a>
                        <a href="/#templates" className="hover:text-brand-600 transition-colors">Templates</a>
                        <a href="/#contact" className="hover:text-brand-600 transition-colors">Contact</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="hidden sm:block font-medium text-slate-600 hover:text-brand-600 transition-colors">Log in</Link>
                        <Link href="/register" className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm">
                            Sign up free
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow pt-20">
                {children}
            </main>

            {/* Footer */}
            {showFooter && (
                <footer className="bg-slate-50 pt-20 pb-10 border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
                        {/* Branding */}
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white">
                                    <Wallet className="w-5 h-5" />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-slate-900">Backcash</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-sm">
                                The smartest way to shop. Earn real cashback at over 20,000 top brands, both online and in-store.
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
                            <h4 className="font-bold text-slate-900 mb-6">Product</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a href="/#how-it-works" className="hover:text-brand-600 transition-colors">How it works</a></li>
                                <li><Link href="/leaderboard" className="hover:text-brand-600 transition-colors">Leaderboard</Link></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Browser Extension</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Mobile App</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Refer a Friend</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link href="/about" className="hover:text-brand-600 transition-colors">About Us</Link></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Press</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Support</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Missing Cashback</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-brand-600 transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-500">
                            &copy; 2026 Backcash Inc. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                                <Lock className="w-4 h-4" />
                                256-BIT ENCRYPTION
                            </div>
                        </div>
                    </div>
                </div>
                </footer>
            )}

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
