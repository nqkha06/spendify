import Layout from '@/components/Layout';
import { Link } from '@inertiajs/react';
import { register } from '@/routes';
import expense from '@/routes/expense';
import {
    ArrowRight,
    BarChart3,
    Check,
    CircleDollarSign,
    CreditCard,
    Github,
    Landmark,
    LineChart,
    Linkedin,
    PieChart,
    PlayCircle,
    Quote,
    ShieldCheck,
    Sparkles,
    Target,
    TrendingUp,
    Twitter,
    Wallet,
} from 'lucide-react';

const features = [
    {
        icon: CircleDollarSign,
        title: 'Expense tracking',
        description: 'Automatically categorize spending and monitor every transaction in real time.',
    },
    {
        icon: Target,
        title: 'Budget planning',
        description: 'Set smart monthly budgets and get proactive alerts before overspending.',
    },
    {
        icon: BarChart3,
        title: 'Financial reports & analytics',
        description: 'Understand your cash flow with clear weekly and monthly performance insights.',
    },
    {
        icon: Wallet,
        title: 'Multi-wallet management',
        description: 'Connect bank accounts, cash wallets, and cards in one unified dashboard.',
    },
];

const testimonials = [
    {
        name: 'Sophie Tran',
        role: 'Product Designer',
        avatar: 'https://i.pravatar.cc/100?img=47',
        content: 'I finally understand where my money goes every month. The budgeting flow is incredibly intuitive.',
    },
    {
        name: 'Daniel Kim',
        role: 'Freelance Developer',
        avatar: 'https://i.pravatar.cc/100?img=12',
        content: 'The analytics helped me cut unnecessary subscriptions and save 22% in just 2 months.',
    },
    {
        name: 'Mia Nguyen',
        role: 'Marketing Manager',
        avatar: 'https://i.pravatar.cc/100?img=5',
        content: 'Beautiful UI, fast setup, and great mobile experience. It feels like a premium fintech app.',
    },
];

export default function Index() {
    return (
        <Layout title="FinanceFlow - Personal Finance Management" showFooter={false}>
            <div className="bg-slate-950 text-slate-100">
                <section className="relative overflow-hidden bg-gradient-to-br from-[#1d4ed8] via-[#4338ca] to-[#0f766e] pb-20 pt-16 md:pb-28 md:pt-24">
                    <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-300/30 blur-3xl" />
                    <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-purple-300/30 blur-3xl" />

                    <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
                        <div className="max-w-xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100 backdrop-blur-xl">
                                <Sparkles className="h-4 w-4" />
                                Built for modern money habits
                            </div>

                            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                                Take Control of Your Money
                            </h1>

                            <p className="mb-8 text-base leading-relaxed text-cyan-50/90 sm:text-lg">
                                Track expenses, manage budgets, and grow your savings effortlessly.
                            </p>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Link
                                    href={register()}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow-xl shadow-indigo-900/30 transition hover:-translate-y-0.5 hover:bg-slate-100"
                                >
                                    Get Started Free
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={expense.dashboard().url}
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-lg transition hover:bg-white/20"
                                >
                                    <PlayCircle className="h-4 w-4" />
                                    View Demo
                                </Link>
                            </div>
                        </div>

                        <div className="relative mx-auto w-full max-w-[520px] rounded-3xl border border-white/25 bg-white/10 p-4 shadow-2xl shadow-indigo-950/40 backdrop-blur-2xl sm:p-6">
                            <div className="mb-4 grid grid-cols-2 gap-3">
                                <div className="rounded-2xl border border-white/20 bg-white/15 p-4">
                                    <p className="text-xs text-cyan-100/80">Total Balance</p>
                                    <p className="mt-1 text-2xl font-bold text-white">$24,860</p>
                                    <p className="mt-1 text-xs text-emerald-300">+12.4% this month</p>
                                </div>
                                <div className="rounded-2xl border border-white/20 bg-white/15 p-4">
                                    <p className="text-xs text-cyan-100/80">Monthly Savings</p>
                                    <p className="mt-1 text-2xl font-bold text-white">$1,920</p>
                                    <p className="mt-1 text-xs text-cyan-200">Goal: 84% reached</p>
                                </div>
                            </div>

                            <div className="grid gap-3 md:grid-cols-[1.2fr,1fr]">
                                <div className="rounded-2xl border border-white/20 bg-slate-900/40 p-4">
                                    <p className="mb-4 text-xs font-semibold text-cyan-100/80">Cashflow Trend</p>
                                    <svg viewBox="0 0 240 90" className="h-24 w-full">
                                        <polyline
                                            fill="none"
                                            stroke="#22d3ee"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            points="0,72 28,60 56,64 84,44 112,52 140,30 168,36 196,22 224,18 240,26"
                                        />
                                    </svg>
                                </div>
                                <div className="rounded-2xl border border-white/20 bg-slate-900/40 p-4">
                                    <p className="mb-4 text-xs font-semibold text-cyan-100/80">Spending Mix</p>
                                    <div className="mx-auto h-24 w-24 rounded-full border-[10px] border-cyan-400/70 border-r-violet-400 border-t-teal-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="bg-white py-16 text-slate-900 md:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-12 max-w-2xl">
                            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Everything you need to run your personal finances</h2>
                            <p className="mt-4 text-base text-slate-500 md:text-lg">A clean, professional toolkit designed for planning, tracking, and growth.</p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                    <article key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_35px_-24px_rgba(30,41,59,0.45)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-22px_rgba(37,99,235,0.35)]">
                                        <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-blue-50 via-violet-50 to-teal-50 p-3 text-indigo-600">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-lg font-bold">{feature.title}</h3>
                                        <p className="mt-3 text-sm leading-relaxed text-slate-500">{feature.description}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section id="dashboard" className="bg-slate-50 py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Dashboard preview that feels like a real app</h2>
                            <p className="mx-auto mt-4 max-w-3xl text-slate-500">Clean interface, realistic data cards, and chart-focused layout for fast decision-making.</p>
                        </div>

                        <div className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_22px_45px_-28px_rgba(15,23,42,0.35)] lg:grid-cols-[1.35fr,1fr]">
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                <div className="mb-5 flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Net Worth Overview</h3>
                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">+9.8%</span>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                                        <p className="text-xs text-slate-500">Checking</p>
                                        <p className="mt-1 text-xl font-bold text-slate-900">$8,320</p>
                                    </div>
                                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                                        <p className="text-xs text-slate-500">Savings</p>
                                        <p className="mt-1 text-xl font-bold text-slate-900">$12,940</p>
                                    </div>
                                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                                        <p className="text-xs text-slate-500">Investments</p>
                                        <p className="mt-1 text-xl font-bold text-slate-900">$3,600</p>
                                    </div>
                                </div>
                                <div className="mt-5 rounded-2xl bg-white p-4">
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">6 Month Cash Flow</p>
                                    <div className="grid grid-cols-6 items-end gap-2">
                                        {[42, 56, 48, 64, 70, 78].map((bar, index) => (
                                            <div key={index} className="rounded-t-md bg-gradient-to-t from-blue-500 to-violet-400" style={{ height: `${bar}px` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-700">Recent Transactions</h3>
                                    <div className="space-y-3">
                                        {[
                                            { merchant: 'Whole Foods', amount: '-$84.60', category: 'Groceries' },
                                            { merchant: 'Spotify', amount: '-$12.99', category: 'Subscription' },
                                            { merchant: 'Payroll', amount: '+$4,200.00', category: 'Income' },
                                        ].map((tx) => (
                                            <div key={tx.merchant} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">{tx.merchant}</p>
                                                    <p className="text-xs text-slate-500">{tx.category}</p>
                                                </div>
                                                <p className={`text-sm font-bold ${tx.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-800'}`}>{tx.amount}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-violet-50 to-teal-50 p-5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Budget Health</p>
                                    <p className="mt-2 text-2xl font-extrabold text-slate-900">76% on track</p>
                                    <div className="mt-4 h-2 rounded-full bg-white/80">
                                        <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-teal-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="benefits" className="bg-white py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Why users love FinanceFlow</h2>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <div className="mb-4 inline-flex rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                                    <Landmark className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Save more money</h3>
                                <p className="mt-3 text-slate-500">Set savings targets and automate contributions to build stronger cash reserves every month.</p>
                            </article>

                            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <div className="mb-4 inline-flex rounded-2xl bg-blue-100 p-3 text-blue-700">
                                    <LineChart className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Understand spending habits</h3>
                                <p className="mt-3 text-slate-500">Visual spending categories reveal patterns instantly so you can make better daily decisions.</p>
                            </article>

                            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <div className="mb-4 inline-flex rounded-2xl bg-violet-100 p-3 text-violet-700">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Achieve goals faster</h3>
                                <p className="mt-3 text-slate-500">Track milestones, monitor progress, and stay motivated with actionable goal insights.</p>
                            </article>
                        </div>
                    </div>
                </section>

                <section id="testimonials" className="bg-slate-50 py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Trusted by people who care about financial clarity</h2>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            {testimonials.map((item) => (
                                <article key={item.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_30px_-26px_rgba(15,23,42,0.35)]">
                                    <Quote className="mb-4 h-6 w-6 text-indigo-500" />
                                    <p className="text-sm leading-relaxed text-slate-600">“{item.content}”</p>
                                    <div className="mt-6 flex items-center gap-3">
                                        <img src={item.avatar} alt={item.name} className="h-12 w-12 rounded-full object-cover" />
                                        <div>
                                            <p className="font-bold text-slate-900">{item.name}</p>
                                            <p className="text-xs text-slate-500">{item.role}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="pricing" className="bg-white py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Simple pricing for every stage</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-slate-500">Start free and upgrade when you want deeper analytics and automation.</p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Free</p>
                                <p className="mt-3 text-4xl font-extrabold text-slate-900">$0<span className="text-base font-medium text-slate-500">/month</span></p>
                                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Basic expense tracking</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Monthly budgets</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Up to 2 connected accounts</li>
                                </ul>
                                <Link href={register()} className="mt-8 inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100">
                                    Start Free
                                </Link>
                            </article>

                            <article className="relative rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-600 p-8 text-white shadow-2xl shadow-indigo-500/25">
                                <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">Most Popular</span>
                                <p className="text-sm font-bold uppercase tracking-wider text-indigo-100">Premium</p>
                                <p className="mt-3 text-4xl font-extrabold">$9<span className="text-base font-medium text-indigo-100">/month</span></p>
                                <ul className="mt-6 space-y-3 text-sm text-indigo-50">
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Unlimited account connections</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Smart spending insights with AI</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Goal automation and recurring rules</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Advanced reports and export</li>
                                </ul>
                                <Link href={register()} className="mt-8 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-indigo-700 transition hover:bg-slate-100">
                                    Upgrade to Premium
                                </Link>
                            </article>
                        </div>
                    </div>
                </section>

                <section id="contact" className="bg-slate-900 py-16 md:py-24">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-xl md:p-12">
                            <h2 className="text-3xl font-extrabold text-white md:text-4xl">Start managing your money today</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-slate-300">Join thousands of users building healthier financial habits with one intuitive platform.</p>
                            <Link
                                href={register()}
                                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-cyan-300"
                            >
                                Sign Up Now
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="border-t border-white/10 bg-slate-950 py-8">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-400 md:flex-row">
                        <div className="flex items-center gap-2 font-semibold text-slate-200">
                            <ShieldCheck className="h-4 w-4 text-emerald-400" />
                            Bank-level security and encrypted data
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="#" className="transition hover:text-white"><Twitter className="h-4 w-4" /></a>
                            <a href="#" className="transition hover:text-white"><Linkedin className="h-4 w-4" /></a>
                            <a href="#" className="transition hover:text-white"><Github className="h-4 w-4" /></a>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
