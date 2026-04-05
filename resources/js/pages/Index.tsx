import { Link } from '@inertiajs/react';
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
import Layout from '@/components/Layout';
import { register } from '@/routes';
import expense from '@/routes/expense';

const highlights = [
    {
        label: 'Giao dịch đã ghi',
        value: '128K+',
        note: 'Mỗi tháng từ người dùng',
    },
    {
        label: 'Thời gian thêm trung bình',
        value: '38s',
        note: 'Cho mỗi giao dịch',
    },
    {
        label: 'Tỷ lệ đạt ngân sách',
        value: '72%',
        note: 'Giữ chi tiêu đúng kế hoạch',
    },
];

const features = [
    {
        icon: CircleDollarSign,
        title: 'Nhập thủ công trong vài giây',
        description: 'Thêm nhanh với giá trị gợi ý thông minh cho số tiền, danh mục và ví.',
    },
    {
        icon: Target,
        title: 'Ngân sách linh hoạt',
        description: 'Đặt mục tiêu theo tháng và xem ngay số còn lại chỉ trong một màn hình.',
    },
    {
        icon: BarChart3,
        title: 'Báo cáo rõ ràng',
        description: 'Tổng hợp theo tuần và tháng, dễ hiểu ngay từ cái nhìn đầu tiên.',
    },
    {
        icon: Wallet,
        title: 'Kiểm soát ví tiền',
        description: 'Theo dõi tiền mặt, thẻ và tài khoản ngân hàng thủ công tại một nơi.',
    },
    {
        icon: LineChart,
        title: 'Theo dõi mục tiêu',
        description: 'Tích lũy cho điều quan trọng với tiến độ được cập nhật mỗi tuần.',
    },
    {
        icon: PieChart,
        title: 'Phân tích theo danh mục',
        description: 'Nhìn ra xu hướng chi tiêu nhanh với biểu đồ danh mục rõ ràng.',
    },
];

const steps = [
    {
        icon: Wallet,
        title: 'Tạo ví',
        description: 'Thêm tiền mặt, thẻ hoặc số dư ngân hàng thủ công chỉ trong vài giây.',
    },
    {
        icon: CreditCard,
        title: 'Ghi giao dịch',
        description: 'Nhập khoản thu chi với danh mục thông minh, có thể dùng lại.',
    },
    {
        icon: TrendingUp,
        title: 'Rà soát hàng tuần',
        description: 'Kiểm tra ngân sách và tổng hợp để luôn bám sát kế hoạch chi tiêu.',
    },
];

const templates = [
    {
        icon: Landmark,
        title: 'Mẫu danh mục có sẵn',
        description: 'Ăn uống, tiền nhà, tiện ích, thuê bao và nhiều danh mục khác.',
    },
    {
        icon: CircleDollarSign,
        title: 'Khoản định kỳ',
        description: 'Hóa đơn và thu nhập lặp lại theo tháng chỉ với một chạm.',
    },
    {
        icon: Sparkles,
        title: 'Ghi chú thông minh',
        description: 'Thêm nhãn và ghi chú ngắn để dễ tra cứu lại sau này.',
    },
    {
        icon: ShieldCheck,
        title: 'Riêng tư mặc định',
        description: 'Dữ liệu luôn thuộc về bạn. Xuất ra bất cứ lúc nào.',
    },
];

const testimonials = [
    {
        name: 'Sophie Tran',
        role: 'Nhà thiết kế sản phẩm',
        avatar: 'https://i.pravatar.cc/100?img=47',
        content: 'Nhập thủ công ở đây thật sự nhẹ đầu. Tôi biết chính xác mình đã chi gì và vì sao.',
    },
    {
        name: 'Daniel Kim',
        role: 'Lập trình viên tự do',
        avatar: 'https://i.pravatar.cc/100?img=12',
        content: 'Bản tổng hợp hàng tuần giúp tôi kỷ luật hơn. Mọi thứ đơn giản và rất nhanh để theo dõi.',
    },
    {
        name: 'Mia Nguyen',
        role: 'Quản lý marketing',
        avatar: 'https://i.pravatar.cc/100?img=5',
        content: 'Bố cục gọn gàng, không rối mắt, chỉ có thông tin tôi cần để ra quyết định.',
    },
    {
        name: 'Alex Rivera',
        role: 'Nhà sáng lập startup',
        avatar: 'https://i.pravatar.cc/100?img=33',
        content: 'Danh mục được thiết kế hợp lý và giao diện giúp tôi luôn tập trung.',
    },
    {
        name: 'Priya Patel',
        role: 'Trưởng bộ phận vận hành',
        avatar: 'https://i.pravatar.cc/100?img=31',
        content: 'Kiểm tra ngân sách rất rõ ràng và nhanh. Thứ Hai nào tôi cũng mở xem.',
    },
];

const testimonialSlides = [...testimonials, ...testimonials];

const logos = ['Stellar', 'Northwind', 'NovaPay', 'Lumen', 'Orbit', 'Finq'];

export default function Index() {
    return (
        <Layout title="FinanceFlow - Quản lý chi tiêu cá nhân" showFooter={false}>
            <div className="bg-white text-slate-900">
                <section className="relative overflow-hidden bg-white pb-16 pt-12 md:pb-24 md:pt-20">
                    <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />
                    <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-emerald-100/70 blur-3xl" />

                    <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-1 lg:items-start justify-items-center">
                        <div className="mx-auto max-w-xl text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm">
                                <Sparkles className="h-4 w-4 text-slate-700" />
                                Theo dõi thủ công đơn giản
                            </div>

                            <h1 className="mb-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                Cách theo dõi tiền bạc gọn gàng, nhẹ đầu
                            </h1>

                            <p className="mb-8 text-base leading-relaxed text-slate-600 sm:text-lg">
                                FinanceFlow được tạo ra cho nhu cầu quản lý chi tiêu thủ công đơn giản. Ghi giao dịch nhanh, theo dõi ngân sách rõ ràng,
                                và xem tổng hợp hằng tuần mà không bị rối bởi những thứ không cần thiết.
                            </p>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-center">
                                <Link
                                    href={register()}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
                                >
                                    Bắt đầu miễn phí
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={expense.dashboard().url}
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                                >
                                    <PlayCircle className="h-4 w-4" />
                                    Xem demo trực tiếp
                                </Link>
                            </div>

                            <div className="mt-8 grid gap-3 text-sm text-slate-600">
                                {[
                                    'Không cần kết nối tài khoản ngân hàng',
                                    'Nhập thủ công hoàn toàn với gợi ý thông minh',
                                    'Xuất dữ liệu bất cứ lúc nào',
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
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Tính năng cốt lõi</p>
                            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                                Đủ mọi thứ bạn cần để quản lý thủ công
                            </h2>
                            <p className="mt-4 text-base text-slate-600 md:text-lg">
                                Không tích hợp rườm rà. Không dư thừa. Chỉ giữ lại những gì cần thiết để kiểm soát chi tiêu.
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
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Cách hoạt động</p>
                            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">3 bước để quản lý chi tiêu nhẹ nhàng</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                                Ghi lại, rà soát, rồi cải thiện. Mọi thứ luôn đơn giản vì bạn chủ động nhập liệu.
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
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Mẫu có sẵn</p>
                                <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">Danh mục gợi ý và khoản chi định kỳ</h2>
                                <p className="mt-4 text-base text-slate-600">
                                    Tiết kiệm thời gian với các mẫu có thể tùy chỉnh, rất phù hợp cho quy trình nhập thủ công.
                                </p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Bộ lọc nhanh</p>
                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                    {['Ăn uống', 'Tiền nhà', 'Thuê bao', 'Di chuyển', 'Ăn ngoài', 'Mua sắm'].map((item) => (
                                        <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-center">
                                    <p className="text-xs text-slate-400">Khoản định kỳ tiếp theo</p>
                                    <p className="mt-2 text-lg font-bold text-slate-900">Tiền điện thoại · $64</p>
                                    <p className="mt-1 text-xs text-slate-500">Đến hạn ngày 6/5</p>
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
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Người dùng yêu thích</p>
                            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
                                Người thật, thói quen tốt thật
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                                Quy trình càng đơn giản càng dễ duy trì. Đây là chia sẻ từ người dùng khi theo dõi chi tiêu thủ công cùng FinanceFlow.
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
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Yên tâm sử dụng</p>
                                <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
                                    Quyền riêng tư rõ ràng, thiết kế cho quản lý thủ công
                                </h2>
                                <p className="mt-4 max-w-2xl text-slate-600">
                                    Dữ liệu của bạn gọn gàng và dễ mang đi. Bạn toàn quyền quyết định nhập gì và xuất dữ liệu ra sao.
                                </p>

                                <ul className="mt-7 space-y-3 text-sm text-slate-700">
                                    <li className="flex items-center justify-center gap-2">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                        Xuất CSV bất cứ lúc nào.
                                    </li>
                                    <li className="flex items-center justify-center gap-2">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                        Chỉ nhập thủ công, không kết nối ngân hàng bên ngoài.
                                    </li>
                                    <li className="flex items-center justify-center gap-2">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                        Mỗi giao dịch đều có lịch sử rõ ràng.
                                    </li>
                                </ul>

                                <Link
                                    href={register()}
                                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                                >
                                    Bắt đầu theo dõi
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-center shadow-[0_22px_45px_-28px_rgba(15,23,42,0.25)]">
                                <p className="text-sm font-bold uppercase tracking-wide text-slate-700">Tổng quan dữ liệu</p>
                                <div className="mt-5 space-y-4">
                                    {[
                                        { label: 'Lượt xuất dữ liệu', value: '2,114' },
                                        { label: 'Giao dịch có gắn nhãn', value: '98%' },
                                        { label: 'Độ chính xác số dư ví', value: '99.2%' },
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
                                        <p className="text-sm font-bold">Riêng tư mặc định</p>
                                    </div>
                                    <p className="mt-2 text-xs text-slate-600">Bạn chọn nội dung muốn theo dõi, tải xuống và toàn quyền kiểm soát.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="bg-slate-900 py-16 text-white md:py-24">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-12">
                            <h2 className="text-3xl font-extrabold md:text-4xl">Bắt đầu quản lý chi tiêu ngay hôm nay</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-white/70">
                                Theo dõi thủ công đơn giản, giao diện nhẹ mắt và sự rõ ràng bạn cần mỗi tuần.
                            </p>
                            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Link
                                    href={register()}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
                                >
                                    Đăng ký ngay
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={expense.dashboard().url}
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white/80 transition hover:border-white/60 hover:text-white"
                                >
                                    Xem demo
                                    <PlayCircle className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-slate-200 bg-white py-12">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
                            <div className="lg:col-span-2">
                                <p className="text-lg font-extrabold tracking-tight text-slate-900">FinanceFlow</p>
                                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                                    Ứng dụng quản lý chi tiêu cá nhân theo hướng thủ công, đơn giản và rõ ràng để bạn duy trì thói quen tài chính tốt mỗi tuần.
                                </p>

                            </div>

                            <div>
                                <p className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">Sản phẩm</p>
                                <div className="mt-4 space-y-2 text-sm text-slate-600">
                                    <a href="#features" className="block transition hover:text-slate-900">
                                        Tính năng
                                    </a>
                                    <a href="#how-it-works" className="block transition hover:text-slate-900">
                                        Cách hoạt động
                                    </a>
                                    <a href="#templates" className="block transition hover:text-slate-900">
                                        Mẫu có sẵn
                                    </a>
                                    <a href="#privacy" className="block transition hover:text-slate-900">
                                        Quyền riêng tư
                                    </a>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">Tài nguyên</p>
                                <div className="mt-4 space-y-2 text-sm text-slate-600">
                                    <Link href={register()} className="block transition hover:text-slate-900">
                                        Đăng ký
                                    </Link>
                                    <Link href={expense.dashboard().url} className="block transition hover:text-slate-900">
                                        Xem demo
                                    </Link>
                                    <a href="#testimonials" className="block transition hover:text-slate-900">
                                        Đánh giá người dùng
                                    </a>
                                    <a href="#contact" className="block transition hover:text-slate-900">
                                        Liên hệ
                                    </a>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">Kết nối</p>
                                <div className="mt-4 flex items-center gap-3 text-slate-500">
                                    <a href="#" className="rounded-full border border-slate-200 p-2 transition hover:border-slate-300 hover:text-slate-900">
                                        <Twitter className="h-4 w-4" />
                                    </a>
                                    <a href="#" className="rounded-full border border-slate-200 p-2 transition hover:border-slate-300 hover:text-slate-900">
                                        <Linkedin className="h-4 w-4" />
                                    </a>
                                    <a href="#" className="rounded-full border border-slate-200 p-2 transition hover:border-slate-300 hover:text-slate-900">
                                        <Github className="h-4 w-4" />
                                    </a>
                                </div>
                                <p className="mt-4 text-sm text-slate-500">hello@financeflow.app</p>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex md:items-center md:justify-between">
                            <p>© {new Date().getFullYear()} FinanceFlow. Đã đăng ký bản quyền.</p>
                            <div className="mt-3 flex items-center gap-4 md:mt-0">
                                <a href="#" className="transition hover:text-slate-900">
                                    Điều khoản
                                </a>
                                <a href="#" className="transition hover:text-slate-900">
                                    Chính sách bảo mật
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
