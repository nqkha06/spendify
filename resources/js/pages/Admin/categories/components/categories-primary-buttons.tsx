import { Button } from '@/components/ui/button';

interface CategoriesPrimaryButtonsProps {
    onAdd: () => void;
}

export function CategoriesPrimaryButtons({ onAdd }: CategoriesPrimaryButtonsProps) {
    return (
        <div className="flex items-center gap-2">
            <Button type="button" onClick={onAdd}>
                Add Category
            </Button>
        </div>
    );
}
