import { useEffect, useState } from 'react';
import { MOCK_CATEGORIES, type Category } from './MockData';

export const useExpenseCategories = () => {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);

  useEffect(() => {
    let isMounted = true;

    fetch('/user/categories')
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!isMounted || !Array.isArray(data)) {
          return;
        }

        setCategories(data);
      })
      .catch(() => {
        // Keep mock categories when API is unavailable.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return categories;
};
