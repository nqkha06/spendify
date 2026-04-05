import { useForm } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import {
    Plus,
    Landmark,
    Wallet as WalletIcon,
    CreditCard,
    ArrowDownRight,
    DollarSign,
    MoreVertical,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import ExpenseLayout from '@/components/expense-tracker/layout';
import {
    MOCK_WALLETS,
    MOCK_TRANSACTIONS,
    MOCK_CATEGORIES,
} from '@/lib/mock-data';
import expense from '@/routes/expense';
import type {
    ExpenseCategory,
    ExpenseNavigationItem,
    ExpenseProfile,
    ExpenseTransaction,
    ExpenseWallet,
} from '@/types/expense-tracker';

interface WalletsProps {
    navigation: ExpenseNavigationItem[];
    profile?: ExpenseProfile;
    data?: {
        wallets?: ExpenseWallet[];
        categories?: ExpenseCategory[];
        transactions?: ExpenseTransaction[];
    };
}

export default function Wallets({ navigation, profile, data }: WalletsProps) {
    const wallets = data?.wallets ?? MOCK_WALLETS;
    const categories = data?.categories ?? MOCK_CATEGORIES;
    const transactions = data?.transactions ?? MOCK_TRANSACTIONS;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWalletId, setSelectedWalletId] = useState<string>(
        wallets[0]?.id ?? '',
    );
    const selectedWallet = wallets.find(
        (wallet) => wallet.id === selectedWalletId,
    );

    const {
        data: formData,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        name: '',
        currency: 'VND',
        opening_balance: '0',
        is_default: false,
    });

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submitWallet = (event: FormEvent) => {
        event.preventDefault();

        post(expense.wallets().url, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const getWalletIcon = (type: string) => {
        switch (type) {
            case 'bank':
                return <Landmark className="h-6 w-6" />;
            case 'credit':
                return <CreditCard className="h-6 w-6" />;
            default:
                return <WalletIcon className="h-6 w-6" />;
        }
    };

    const getWalletColor = (type: string) => {
        switch (type) {
            case 'bank':
                return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            case 'credit':
                return 'bg-rose-50 text-rose-600 border-rose-100';
            default:
                return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        }
    };

    const walletTransactions = transactions
        .filter((tx) => tx.walletId === selectedWalletId)
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

    return (
        <ExpenseLayout
            title="Ví tiền"
            heading="Ví tiền"
            description="Quản lý số dư tiền mặt, ngân hàng và thẻ tại một nơi."
            activePath="/user/wallets"
            navigation={navigation}
            profile={profile}
            action={
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="hover:bg-primary-700 flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 font-medium text-white shadow-sm shadow-primary-500/30 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Thêm ví
                </button>
            }
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {wallets.length === 0 ? (
                        <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
                            <p className="text-lg font-semibold text-slate-800">
                                Chưa có ví nào
                            </p>
                            <p className="mt-1 text-sm">
                                Thêm ví đầu tiên để bắt đầu theo dõi số dư.
                            </p>
                        </div>
                    ) : (
                        wallets.map((wallet) => {
                            const isSelected = wallet.id === selectedWalletId;
                            const isNegative = wallet.balance < 0;
                            return (
                                <div
                                    key={wallet.id}
                                    onClick={() =>
                                        setSelectedWalletId(wallet.id)
                                    }
                                    className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 bg-white p-6 transition-all duration-200 ${
                                        isSelected
                                            ? 'border-primary-500 shadow-md ring-4 ring-primary-500/10'
                                            : 'hover:border-primary-200 border-slate-100 shadow-sm hover:shadow-md'
                                    }`}
                                >
                                    {isSelected && (
                                        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-16 w-16 rounded-full bg-linear-to-bl from-primary-100 to-transparent"></div>
                                    )}

                                    <div className="relative mb-6 flex items-start justify-between">
                                        <div
                                            className={`rounded-xl border p-3 ${getWalletColor(wallet.type)}`}
                                        >
                                            {getWalletIcon(wallet.type)}
                                        </div>
                                        <button
                                            className="p-1 text-slate-400 transition-colors hover:text-slate-600"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div>
                                        <p className="mb-1 text-sm font-medium text-slate-500">
                                            {wallet.name}
                                        </p>
                                        <h3
                                            className={`text-2xl font-bold ${isNegative ? 'text-danger-600' : 'text-slate-900'}`}
                                        >
                                            $
                                            {wallet.balance.toLocaleString(
                                                'en-US',
                                                { minimumFractionDigits: 2 },
                                            )}
                                        </h3>
                                        <p className="mt-2 text-xs tracking-wider text-slate-400 uppercase">
                                            {wallet.type} tài khoản
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {isModalOpen ? (
                    <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm duration-200 fade-in">
                        <div className="w-full max-w-lg animate-in overflow-hidden rounded-2xl bg-white shadow-xl duration-300 slide-in-from-bottom-4">
                            <div className="flex items-center justify-between border-b border-slate-100 p-5">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Thêm ví
                                </h2>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                                >
                                    <MoreVertical className="h-5 w-5 rotate-90" />
                                </button>
                            </div>

                            <form
                                onSubmit={submitWallet}
                                className="space-y-4 p-5"
                            >
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">
                                        Tên ví
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(event) =>
                                            setData('name', event.target.value)
                                        }
                                        placeholder="Ví tiền mặt"
                                        className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                    />
                                    {errors.name ? (
                                        <p className="mt-1 text-xs text-danger-600">
                                            {errors.name}
                                        </p>
                                    ) : null}
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            Tiền tệ
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.currency}
                                            onChange={(event) =>
                                                setData(
                                                    'currency',
                                                    event.target.value.toUpperCase(),
                                                )
                                            }
                                            placeholder="VND"
                                            maxLength={3}
                                            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        />
                                        {errors.currency ? (
                                            <p className="mt-1 text-xs text-danger-600">
                                                {errors.currency}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            Số dư ban đầu
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={formData.opening_balance}
                                            onChange={(event) =>
                                                setData(
                                                    'opening_balance',
                                                    event.target.value,
                                                )
                                            }
                                            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        />
                                        {errors.opening_balance ? (
                                            <p className="mt-1 text-xs text-danger-600">
                                                {errors.opening_balance}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>

                                <label className="flex items-center gap-2 text-sm text-slate-600">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_default}
                                        onChange={(event) =>
                                            setData(
                                                'is_default',
                                                event.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    Đặt làm ví mặc định
                                </label>

                                <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="hover:bg-primary-700 rounded-xl bg-primary-600 px-5 py-2 text-sm font-medium text-white shadow-sm shadow-primary-500/30 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing ? 'Đang lưu...' : 'Lưu ví'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : null}

                {/* Selected Wallet Details */}
                <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-6">
                        <h3 className="text-lg font-bold tracking-tight text-slate-900">
                            Lịch sử giao dịch{' '}
                            <span className="ml-2 text-sm font-normal text-slate-500">
                                ({selectedWallet?.name ?? 'Chưa chọn ví'})
                            </span>
                        </h3>
                        <button className="hover:text-primary-700 text-sm font-medium text-primary-600 transition-colors">
                            Xem thống kê
                        </button>
                    </div>

                    {walletTransactions.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="border-b border-slate-100 bg-slate-50/50 text-xs font-medium tracking-wider text-slate-500 uppercase">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">
                                            Giao dịch
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Danh mục
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Ngày
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-right"
                                        >
                                            Số tiền
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    {walletTransactions.map((tx) => {
                                        const category = categories.find(
                                            (c) => c.id === tx.categoryId,
                                        );
                                        const isIncome = tx.type === 'income';
                                        return (
                                            <tr
                                                key={tx.id}
                                                className="group cursor-pointer transition-colors hover:bg-slate-50/80"
                                            >
                                                <td className="flex items-center gap-3 px-6 py-4 font-medium text-slate-900">
                                                    <div
                                                        className={`rounded-lg p-2 ${isIncome ? 'group-hover:bg-success-100 bg-success-50 text-success-600' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'} transition-colors`}
                                                    >
                                                        {isIncome ? (
                                                            <ArrowDownRight className="h-4 w-4" />
                                                        ) : (
                                                            <DollarSign className="h-4 w-4" />
                                                        )}
                                                    </div>
                                                    {tx.note || 'Chuyển khoản'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
                                                        style={{
                                                            backgroundColor: `${category?.color}15`,
                                                            color: category?.color,
                                                            borderColor: `${category?.color}30`,
                                                        }}
                                                    >
                                                        {category?.name}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">
                                                    {format(
                                                        parseISO(tx.date),
                                                        'dd/MM/yyyy',
                                                    )}
                                                </td>
                                                <td
                                                    className={`px-6 py-4 text-right font-bold ${isIncome ? 'text-success-600' : 'text-slate-900'}`}
                                                >
                                                    {isIncome ? '+' : '-'}$
                                                    {tx.amount.toLocaleString(
                                                        'en-US',
                                                        {
                                                            minimumFractionDigits: 2,
                                                        },
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center text-slate-500">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                <DollarSign className="h-8 w-8 text-slate-400" />
                            </div>
                            <p className="mb-1 text-lg font-medium text-slate-900">
                                Chưa có giao dịch
                            </p>
                            <p className="text-sm">
                                Ví này chưa có giao dịch nào.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </ExpenseLayout>
    );
}
