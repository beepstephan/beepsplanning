import { Button } from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  message,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg font-semibold mb-4">{message}</p>
        <div className="flex gap-2">
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600"
          >
            Confirm
          </Button>
          <Button
            onClick={onCancel}
            className="flex-1 bg-gray-500 hover:bg-gray-600"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
