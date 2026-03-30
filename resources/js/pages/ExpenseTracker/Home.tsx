import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    Check,
    CircleDollarSign,
    CreditCard,
    Landmark,
    LineChart,
    PieChart,
    PlayCircle,
    ShieldCheck,
    Target,
    TrendingUp,
    Twitter,
    Wallet,
} from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-950 font-['Inter'] text-slate-100">
            <Head title="Finovo - Personal Expense Management">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>

            <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-500 pb-20 pt-16 md:pb-28 md:pt-24">
                <div className="absolute -left-16 top-14 h-52 w-52 rounded-full bg-cyan-300/30 blur-3xl" />
                <div className="absolute -bottom-14 right-0 h-64 w-64 rounded-full bg-violet-300/30 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
                    <div className="max-w-xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur-lg">
                            <TrendingUp className="h-4 w-4" />
                            Modern personal finance platform
                        </span>

                        <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                            Take Control of Your Money
                        </h1>

                        <p className="mt-5 text-base leading-relaxed text-blue-50/95 sm:text-lg">
                            Track expenses, manage budgets, and grow your savings effortlessly.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow-xl shadow-indigo-900/25 transition hover:-translate-y-0.5 hover:bg-slate-100"
                            >
                                Get Started Free
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/user/dashboard"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-lg transition hover:bg-white/20"
                            >
                                <PlayCircle className="h-4 w-4" />
                                View Demo
                            </Link>
                        </div>
                    </div>

                    <div className="mx-auto w-full max-w-[520px] rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl shadow-indigo-900/35 backdrop-blur-2xl sm:p-6">
                        <div className="mb-4 grid grid-cols-2 gap-3">
                            <article className="rounded-2xl border border-white/20 bg-white/15 p-4">
                                <p className="text-xs text-cyan-100/80">Total Balance</p>
                                <p className="mt-1 text-2xl font-extrabold text-white">$12,480</p>
                                <p className="mt-1 text-xs text-emerald-300">+8.3% this month</p>
                            </article>
                            <article className="rounded-2xl border border-white/20 bg-white/15 p-4">
                                <p className="text-xs text-cyan-100/80">Savings Goal</p>
                                <p className="mt-1 text-2xl font-extrabold text-white">72%</p>
                                <p className="mt-1 text-xs text-cyan-100">$1,440 / $2,000</p>
                            </article>
                        </div>

                        <div className="grid gap-3 md:grid-cols-[1.2fr,1fr]">
                            <article className="rounded-2xl border border-white/20 bg-slate-900/35 p-4">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-100/80">Line Chart</p>
                                <svg viewBox="0 0 240 90" className="h-24 w-full">
                                    <polyline
                                        fill="none"
                                        stroke="#22d3ee"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        points="0,75 28,56 56,62 84,46 112,49 140,34 168,38 196,24 224,20 240,26"
                                    />
                                </svg>
                            </article>

                            <article className="rounded-2xl border border-white/20 bg-slate-900/35 p-4">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-100/80">Pie Chart</p>
                                <div className="mx-auto h-24 w-24 rounded-full border-[10px] border-cyan-300 border-r-violet-300 border-t-teal-300" />
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 text-slate-900 md:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Powerful features for smarter budgeting</h2>
                    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: CircleDollarSign,
                                title: 'Expense Tracking',
                                description: 'Auto-categorize transactions and monitor spending in real time.',
                            },
                            {
                                icon: Target,
                                title: 'Budget Planning',
                                description: 'Build realistic monthly budgets and prevent overspending early.',
                            },
                            {
                                icon: BarChart3,
                                title: 'Reports & Analytics',
                                description: 'Understand trends with visual charts and weekly financial snapshots.',
                            },
                            {
                                icon: Wallet,
                                title: 'Multi-wallet Management',
                                description: 'Manage bank accounts, cards, and cash wallets in one place.',
                            },
                        ].map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <article key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_35px_-24px_rgba(30,41,59,0.4)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-22px_rgba(59,130,246,0.3)]">
                                    <div className="inline-flex rounded-2xl bg-gradient-to-br from-blue-50 via-violet-50 to-teal-50 p-3 text-indigo-600">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold">{feature.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <h2 className="text-center text-3xl font-extrabold text-slate-900 md:text-4xl">Dashboard Preview</h2>
                    <div className="mt-10 grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_22px_45px_-28px_rgba(15,23,42,0.35)] lg:grid-cols-[1.35fr,1fr]">
                        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-sm font-bold text-slate-700">Balance Summary</p>
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">Healthy</span>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl bg-white p-4">
                                    <p className="text-xs text-slate-500">Checking</p>
                                    <p className="mt-1 text-lg font-bold text-slate-900">$5,840</p>
                                </div>
                                <div className="rounded-2xl bg-white p-4">
                                    <p className="text-xs text-slate-500">Savings</p>
                                    <p className="mt-1 text-lg font-bold text-slate-900">$4,960</p>
                                </div>
                                <div className="rounded-2xl bg-white p-4">
                                    <p className="text-xs text-slate-500">Card</p>
                                    <p className="mt-1 text-lg font-bold text-slate-900">-$620</p>
                                </div>
                            </div>
                            <div className="mt-5 rounded-2xl bg-white p-4">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Monthly Trend</p>
                                <div className="grid grid-cols-6 items-end gap-2">
                                    {[35, 48, 42, 62, 70, 77].map((bar, index) => (
                                        <div key={index} className="rounded-t-md bg-gradient-to-t from-blue-500 to-violet-400" style={{ height: `${bar}px` }} />
                                    ))}
                                </div>
                            </div>
                        </article>

                        <div className="grid gap-4">
                            <article className="rounded-3xl border border-slate-200 bg-white p-5">
                                <p className="text-sm font-bold text-slate-700">Transactions</p>
                                <div className="mt-4 space-y-3">
                                    {[
                                        { title: 'Coffee Shop', value: '-$9.40' },
                                        { title: 'Netflix', value: '-$14.99' },
                                        { title: 'Salary', value: '+$2,500.00' },
                                    ].map((item) => (
                                        <div key={item.title} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                                            <span className="text-sm font-medium text-slate-800">{item.title}</span>
                                            <span className={`text-sm font-bold ${item.value.startsWith('+') ? 'text-emerald-600' : 'text-slate-800'}`}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </article>

                            <article className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-violet-50 to-teal-50 p-5">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Budget Status</p>
                                <p className="mt-2 text-2xl font-extrabold text-slate-900">84% on track</p>
                                <div className="mt-3 h-2 rounded-full bg-white/80">
                                    <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-blue-500 to-teal-400" />
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <h2 className="text-center text-3xl font-extrabold text-slate-900 md:text-4xl">Benefits</h2>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <Landmark className="h-7 w-7 text-emerald-600" />
                            <h3 className="mt-4 text-xl font-bold text-slate-900">Save more money</h3>
                            <p className="mt-2 text-slate-500">Proactive alerts and smarter limits help you keep more cash every month.</p>
                        </article>
                        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <LineChart className="h-7 w-7 text-blue-600" />
                            <h3 className="mt-4 text-xl font-bold text-slate-900">Understand spending habits</h3>
                            <p className="mt-2 text-slate-500">Visual trend analysis shows exactly where your money goes and why.</p>
                        </article>
                        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <TrendingUp className="h-7 w-7 text-violet-600" />
                            <h3 className="mt-4 text-xl font-bold text-slate-900">Achieve goals faster</h3>
                            <p className="mt-2 text-slate-500">Track milestones and improve progress with focused goal planning tools.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <h2 className="text-center text-3xl font-extrabold text-slate-900 md:text-4xl">Testimonials</h2>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {[
                            {
                                name: 'Anna Lee',
                                role: 'Freelancer',
                                avatar: 'https://i.pravatar.cc/100?img=32',
                                feedback: 'This app helped me cut unnecessary costs and finally save consistently.',
                            },
                            {
                                name: 'Michael Tran',
                                role: 'Product Manager',
                                avatar: 'https://i.pravatar.cc/100?img=11',
                                feedback: 'Clean design, fast dashboard, and the budget planner is exactly what I needed.',
                            },
                            {
                                name: 'Sophie Nguyen',
                                role: 'Marketing Lead',
                                avatar: 'https://i.pravatar.cc/100?img=5',
                                feedback: 'Feels premium like Revolut but super easy for personal use and daily planning.',
                            },
                        ].map((item) => (
                            <article key={item.name} className="rounded-3xl border border-slate-200 bg-white p-6">
                                <p className="text-sm leading-relaxed text-slate-600">“{item.feedback}”</p>
                                <div className="mt-6 flex items-center gap-3">
                                    <img src={item.avatar} alt={item.name} className="h-11 w-11 rounded-full object-cover" />
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

            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="text-center text-3xl font-extrabold text-slate-900 md:text-4xl">Pricing</h2>
                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Free Plan</p>
                            <p className="mt-3 text-4xl font-extrabold text-slate-900">$0<span className="text-base font-medium text-slate-500">/month</span></p>
                            <ul className="mt-6 space-y-3 text-sm text-slate-600">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Expense tracking</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Basic budgets</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> 2 account connections</li>
                            </ul>
                            <Link href="/register" className="mt-8 inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100">Get Started</Link>
                        </article>

                        <article className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-600 via-violet-600 to-teal-500 p-8 text-white shadow-xl shadow-indigo-500/20">
                            <p className="text-sm font-bold uppercase tracking-wider text-indigo-100">Premium Plan</p>
                            <p className="mt-3 text-4xl font-extrabold">$9<span className="text-base font-medium text-indigo-100">/month</span></p>
                            <ul className="mt-6 space-y-3 text-sm text-indigo-50">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Unlimited wallets & accounts</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Advanced analytics dashboards</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Goal automation and reminders</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Priority support</li>
                            </ul>
                            <Link href="/register" className="mt-8 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-indigo-700 transition hover:bg-slate-100">Go Premium</Link>
                        </article>
                    </div>
                </div>
            </section>

            <section className="bg-slate-900 py-16 md:py-24">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-xl md:p-12">
                        <h2 className="text-3xl font-extrabold text-white md:text-4xl">Start managing your money today</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-slate-300">Build healthy habits with data-driven insights and a modern personal finance experience.</p>
                        <Link href="/register" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-cyan-300">
                            Sign Up Now
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/10 bg-slate-950 py-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2 font-bold text-slate-200">
                        <Wallet className="h-5 w-5 text-cyan-300" />
                        Finovo
                    </div>
                    <nav className="flex flex-wrap items-center gap-5">
                        <a href="#" className="transition hover:text-white">About</a>
                        <a href="#" className="transition hover:text-white">Features</a>
                        <a href="#" className="transition hover:text-white">Pricing</a>
                        <a href="#" className="transition hover:text-white">Contact</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <a href="#" className="transition hover:text-white"><Twitter className="h-4 w-4" /></a>
                        <a href="#" className="transition hover:text-white"><CreditCard className="h-4 w-4" /></a>
                        <a href="#" className="transition hover:text-white"><PieChart className="h-4 w-4" /></a>
                    </div>
                </div>
                <div className="mx-auto mt-6 flex max-w-7xl items-center gap-2 px-6 text-xs text-slate-500">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Secure, encrypted, and designed for modern financial workflows.
                </div>
            </footer>
        </div>
    );
}
