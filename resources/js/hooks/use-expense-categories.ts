import { useEffect, useState } from 'react';
import type { ExpenseCategory } from '@/types/expense-tracker';

export function useExpenseCategories(): ExpenseCategory[] {
    const [categories, setCategories] = useState<ExpenseCategory[]>([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const loadCategories = async () => {
            try {
                const response = await fetch('/user/categories', {
                    signal: controller.signal,
                    headers: {
                        Accept: 'application/json',
                    },
                });

                if (!response.ok) {
                    return;
                }

                const data = (await response.json()) as ExpenseCategory[];

                if (isMounted && Array.isArray(data)) {
                    setCategories(data);
                }
            } catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError') {
                    return;
                }
            }
        };

        void loadCategories();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return categories;
}
