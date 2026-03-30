import { FormEvent, useState } from 'react';
import ExpenseLayout from '@/components/expense-tracker/layout';
import type { ExpenseNavigationItem, ExpenseProfile } from '@/types/expense-tracker';

interface ContactProps {
    navigation: ExpenseNavigationItem[];
    profile: ExpenseProfile;
    data: {
        channels: Array<{
            name: string;
            value: string;
        }>;
        faqs: Array<{
            question: string;
            answer: string;
        }>;
    };
}

export default function Contact({ navigation, profile, data }: ContactProps) {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <ExpenseLayout
            title="Contact Expense Tracker"
            heading="Contact"
            description="Contact form is handled locally to mimic user interaction without API calls."
            activePath="/expense-tracker/contact"
            navigation={navigation}
            profile={profile}
        >
            <div className="grid gap-6 lg:grid-cols-2">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Support Channels</h2>
                    <div className="mt-4 space-y-3">
                        {data.channels.map((channel) => (
                            <div key={channel.name} className="rounded-lg border border-slate-200 p-3">
                                <p className="text-xs uppercase tracking-wide text-slate-500">{channel.name}</p>
                                <p className="font-medium text-slate-900">{channel.value}</p>
                            </div>
                        ))}
                    </div>

                    <h3 className="mt-6 text-base font-semibold text-slate-900">FAQ</h3>
                    <div className="mt-3 space-y-2">
                        {data.faqs.map((faq) => (
                            <article key={faq.question} className="rounded-lg bg-slate-50 p-3">
                                <p className="font-medium text-slate-900">{faq.question}</p>
                                <p className="mt-1 text-sm text-slate-600">{faq.answer}</p>
                            </article>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 p-4">
                    <h2 className="text-lg font-semibold text-slate-900">Send Message</h2>
                    <div className="mt-4 space-y-3">
                        <input
                            value={formState.name}
                            onChange={(event) =>
                                setFormState((previous) => ({ ...previous, name: event.target.value }))
                            }
                            placeholder="Your name"
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        />
                        <input
                            type="email"
                            value={formState.email}
                            onChange={(event) =>
                                setFormState((previous) => ({ ...previous, email: event.target.value }))
                            }
                            placeholder="Email"
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        />
                        <textarea
                            rows={4}
                            value={formState.message}
                            onChange={(event) =>
                                setFormState((previous) => ({ ...previous, message: event.target.value }))
                            }
                            placeholder="How can we help?"
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        />
                    </div>
                    <button type="submit" className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                        Submit
                    </button>

                    {submitted ? (
                        <p className="mt-3 text-sm text-emerald-700">Mock submit successful. Form is handled on frontend only.</p>
                    ) : null}
                </form>
            </div>
        </ExpenseLayout>
    );
}
