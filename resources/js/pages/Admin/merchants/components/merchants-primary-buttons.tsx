import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface MerchantsPrimaryButtonsProps {
    onAdd: () => void;
}

export function MerchantsPrimaryButtons({ onAdd }: MerchantsPrimaryButtonsProps) {
    return (
        <Button onClick={onAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Merchant
        </Button>
    );
}
