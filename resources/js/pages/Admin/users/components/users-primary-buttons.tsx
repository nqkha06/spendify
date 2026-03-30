import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface UsersPrimaryButtonsProps {
    onAdd: () => void;
}

export function UsersPrimaryButtons({ onAdd }: UsersPrimaryButtonsProps) {
    return (
        <Button onClick={onAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
        </Button>
    );
}
