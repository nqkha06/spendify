import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import adminMerchants from '@/routes/admin/merchants';

interface Merchant {
    id: number;
    name: string;
}

interface DeleteMerchantDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    merchant: Merchant | null;
}

export function DeleteMerchantDialog({
    open,
    onOpenChange,
    merchant,
}: DeleteMerchantDialogProps) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (merchant) {
            destroy(adminMerchants.destroy(merchant.id).url, {
                onSuccess: () => {
                    onOpenChange(false);
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Merchant</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <strong>{merchant?.name}</strong>? This
                        action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={processing}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
