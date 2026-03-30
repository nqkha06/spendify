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

const highlights = [
    {
        label: 'Entries logged',
        value: '128K+',
        note: 'Monthly by users',
    },
    {
        label: 'Avg. time to add',
        value: '38s',
        note: 'Per transaction',
    },
    {
        label: 'Budget success',
        value: '72%',
        note: 'Stay on track',
    },
];

const features = [
    {
        icon: CircleDollarSign,
        title: 'Manual entry in seconds',
        description: 'Quick add with smart defaults for amount, category, and wallet.',
    },
    {
        icon: Target,
        title: 'Flexible budgets',
        description: 'Set monthly targets and see your remaining balance at a glance.',
    },
    {
        icon: BarChart3,
        title: 'Clear reports',
        description: 'Weekly and monthly summaries you can understand instantly.',
    },
    {
        icon: Wallet,
        title: 'Wallet control',
        description: 'Track cash, cards, and bank balances manually in one place.',
    },
    {
        icon: LineChart,
        title: 'Goal tracking',
        description: 'Save for what matters with progress updates each week.',
    },
    {
        icon: PieChart,
        title: 'Category insights',
        description: 'Spot patterns fast with clean category breakdowns.',
    },
];

const steps = [
    {
        icon: Wallet,
        title: 'Create wallets',
        description: 'Add cash, cards, or bank balances manually in seconds.',
    },
    {
        icon: CreditCard,
        title: 'Log transactions',
        description: 'Type in expenses and income with smart, reusable categories.',
    },
    {
        icon: TrendingUp,
        title: 'Review weekly',
        description: 'Check budgets and summaries to keep your spending on track.',
    },
];

const templates = [
    {
        icon: Landmark,
        title: 'Category presets',
        description: 'Groceries, rent, utilities, subscriptions, and more.',
    },
    {
        icon: CircleDollarSign,
        title: 'Recurring items',
        description: 'Bills and income that repeat monthly with one tap.',
    },
    {
        icon: Sparkles,
        title: 'Smart notes',
        description: 'Add tags and short notes for better recall later.',
    },
    {
        icon: ShieldCheck,
        title: 'Private by default',
        description: 'Your data stays with you. Export anytime.',
    },
];

const testimonials = [
    {
        name: 'Sophie Tran',
        role: 'Product Designer',
        avatar: 'https://i.pravatar.cc/100?img=47',
        content: 'Manual entry actually feels relaxing here. I know exactly what I spent and why.',
    },
    {
        name: 'Daniel Kim',
        role: 'Freelance Developer',
        avatar: 'https://i.pravatar.cc/100?img=12',
        content: 'The weekly recap keeps me honest. It is simple and fast to keep up.',
    },
    {
        name: 'Mia Nguyen',
        role: 'Marketing Manager',
        avatar: 'https://i.pravatar.cc/100?img=5',
        content: 'Clean layout, no noise, just the info I need to make decisions.',
    },
    {
        name: 'Alex Rivera',
        role: 'Startup Founder',
        avatar: 'https://i.pravatar.cc/100?img=33',
        content: 'Categories are thoughtful and the design keeps me focused.',
    },
    {
        name: 'Priya Patel',
        role: 'Operations Lead',
        avatar: 'https://i.pravatar.cc/100?img=31',
        content: 'Budget checks are clear and quick. I open it every Monday.',
    },
];

const testimonialSlides = [...testimonials, ...testimonials];

const logos = ['Stellar', 'Northwind', 'NovaPay', 'Lumen', 'Orbit', 'Finq'];

export default function Index() {
    return (
        <Layout title="FinanceFlow - Personal Finance Management" showFooter={false}>
            <div className="bg-white text-slate-900">
                <section className="relative overflow-hidden bg-white pb-16 pt-12 md:pb-24 md:pt-20">
                    <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />
                    <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-emerald-100/70 blur-3xl" />

                    <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-1 lg:items-start justify-items-center">
                        <div className="mx-auto max-w-xl text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm">
                                <Sparkles className="h-4 w-4 text-slate-700" />
                                Simple manual tracking
                            </div>

                            <h1 className="mb-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                A clean, calm way to track your money
                            </h1>

                            <p className="mb-8 text-base leading-relaxed text-slate-600 sm:text-lg">
                                FinanceFlow is built for simple, manual tracking. Add entries fast, keep budgets visible, and review weekly summaries
                                without extra noise.
                            </p>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-center">
                                <Link
                                    href={register()}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
                                >
                                    Get Started Free
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={expense.dashboard().url}
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                                >
                                    <PlayCircle className="h-4 w-4" />
                                    View Live Demo
                                </Link>
                            </div>

                            <div className="mt-8 grid gap-3 text-sm text-slate-600">
                                {[
                                    'No bank connections needed',
                                    'Fully manual input with smart defaults',
                                    'Export your data anytime',
                                ].map((item) => (
                                    <div key={item} className="flex items-center justify-center gap-2">
                                        <Check className="h-4 w-4 text-emerald-500" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                {highlights.map((item) => (
                                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                                        <p className="text-xs uppercase tracking-[0.15em] text-slate-400">{item.label}</p>
                                        <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
                                        <p className="mt-1 text-xs font-medium text-emerald-600">{item.note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="border-y border-slate-100 bg-slate-50 py-10">
                    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {logos.map((logo) => (
                            <span key={logo}>{logo}</span>
                        ))}
                    </div>
                </section>

                <section id="features" className="bg-white py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <div className="mx-auto mb-12 max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Core features</p>
                            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                                Everything you need for manual tracking
                            </h2>
                            <p className="mt-4 text-base text-slate-600 md:text-lg">
                                No integrations. No noise. Just the essentials to keep your spending under control.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:justify-items-center">
                            {features.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                    <article
                                        key={feature.title}
                                        className="group rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-[0_20px_40px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:border-slate-300"
                                    >
                                        <div className="mb-4 inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-700 transition group-hover:border-slate-300">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                                        <p className="mt-3 text-sm leading-relaxed text-slate-500">{feature.description}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="bg-slate-50 py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <div className="mb-12 text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">How it works</p>
                            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">Three steps to financial calm</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                                Log, review, and improve. It stays simple because it is manual.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3 md:justify-items-center">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <article key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-700">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-400">0{index + 1}</span>
                                        </div>
                                        <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                                        <p className="mt-3 text-sm leading-relaxed text-slate-500">{step.description}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section id="templates" className="bg-white py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr,0.9fr] lg:items-center lg:justify-items-center">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Templates</p>
                                <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">Preset categories and recurring items</h2>
                                <p className="mt-4 text-base text-slate-600">
                                    Save time with presets you can customize. Great for manual entry workflows.
                                </p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Quick filters</p>
                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                    {['Groceries', 'Rent', 'Subscriptions', 'Transport', 'Dining', 'Shopping'].map((item) => (
                                        <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-center">
                                    <p className="text-xs text-slate-400">Next recurring</p>
                                    <p className="mt-2 text-lg font-bold text-slate-900">Phone bill · $64</p>
                                    <p className="mt-1 text-xs text-slate-500">Due May 6</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:justify-items-center">
                            {templates.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                                        <div className="mb-4 inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-700">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                                        <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.description}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section id="testimonials" className="bg-slate-50 py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <div className="mb-10 text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Customer love</p>
                            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
                                Real people, consistent habits
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                                The simplest workflow wins. Here is what users say about manual tracking with FinanceFlow.
                            </p>
                        </div>

                        <div className="relative overflow-hidden">
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent" />
                            <div className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused]">
                                {testimonialSlides.map((item, index) => (
                                    <article
                                        key={`${item.name}-${index}`}
                                        className="w-[280px] rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm"
                                    >
                                        <Quote className="mb-4 h-6 w-6 text-slate-300" />
                                        <p className="text-sm leading-relaxed text-slate-600">“{item.content}”</p>
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
                    </div>
                </section>

                <section id="privacy" className="bg-white py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-6 text-center">
                        <div className="grid gap-10 lg:grid-cols-[1.1fr,1fr] lg:items-center lg:justify-items-center">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Peace of mind</p>
                                <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
                                    Simple privacy, built for manual tracking
                                </h2>
                                <p className="mt-4 max-w-2xl text-slate-600">
                                    Your data stays focused and portable. You control what you enter and how you export it.
                                </p>

                                <ul className="mt-7 space-y-3 text-sm text-slate-700">
                                    <li className="flex items-center justify-center gap-2">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                        Export to CSV anytime.
                                    </li>
                                    <li className="flex items-center justify-center gap-2">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                        Manual inputs only, no external bank connections.
                                    </li>
                                    <li className="flex items-center justify-center gap-2">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                        Clear audit trail for every entry.
                                    </li>
                                </ul>

                                <Link
                                    href={register()}
                                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                                >
                                    Start Tracking
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-center shadow-[0_22px_45px_-28px_rgba(15,23,42,0.25)]">
                                <p className="text-sm font-bold uppercase tracking-wide text-slate-700">Data snapshot</p>
                                <div className="mt-5 space-y-4">
                                    {[
                                        { label: 'Exports generated', value: '2,114' },
                                        { label: 'Entries tagged', value: '98%' },
                                        { label: 'Wallet accuracy', value: '99.2%' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                                            <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                                            <p className="text-sm font-bold text-slate-900">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                                    <div className="flex items-center justify-center gap-2 text-slate-800">
                                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                                        <p className="text-sm font-bold">Private by default</p>
                                    </div>
                                    <p className="mt-2 text-xs text-slate-600">You choose what to track. Download and keep full control.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="bg-slate-900 py-16 text-white md:py-24">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-12">
                            <h2 className="text-3xl font-extrabold md:text-4xl">Start managing your money today</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-white/70">
                                Simple manual tracking, calm UI, and the clarity you want every week.
                            </p>
                            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Link
                                    href={register()}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
                                >
                                    Sign Up Now
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={expense.dashboard().url}
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white/80 transition hover:border-white/60 hover:text-white"
                                >
                                    View Demo
                                    <PlayCircle className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-slate-200 bg-white py-8">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row">
                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                            Simple tracking. Full control.
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="#" className="transition hover:text-slate-900">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" className="transition hover:text-slate-900">
                                <Linkedin className="h-4 w-4" />
                            </a>
                            <a href="#" className="transition hover:text-slate-900">
                                <Github className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
