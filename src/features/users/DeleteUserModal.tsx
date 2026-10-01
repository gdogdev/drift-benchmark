import { deleteUser, type User } from '@/lib/api';

interface DeleteUserModalProps {
  user: User;
  onClose: () => void;
  onDeleted: (id: number) => void;
}

export function DeleteUserModal({ user, onClose, onDeleted }: DeleteUserModalProps) {
  const handleConfirm = () => {
    deleteUser(user.id);
    onDeleted(user.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-[420px] rounded-[6px] bg-white p-[18px] shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Delete {user.name}?</div>
          <span className="cursor-pointer text-gray-400" onClick={onClose}>
            ✕
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">This permanently removes the user and all of their data.</p>
        <div className="mt-6 flex justify-end gap-2">
          <button className="rounded-[6px] border px-4 py-2 text-sm" onClick={onClose}>
            Cancel
          </button>
          <button className="rounded-[6px] bg-red-600 px-4 py-2 text-sm text-white" onClick={handleConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
