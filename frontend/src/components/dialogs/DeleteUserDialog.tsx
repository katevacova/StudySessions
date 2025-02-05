import { useDeleteUser } from "../../hooks/useUsers";
import { MutateDialogProps } from "./types";

const DeleteUserDialog = ({ id, onClose }: MutateDialogProps) => {
  const { mutate: deleteUser } = useDeleteUser(id);

  const handleDelete = () => {
    deleteUser();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50">
      <div className="flex flex-col items-center w-fit gap-4 p-10 bg-white shadow-xl shadow-primary rounded-lg">
        <h1 className="text-2xl desktop:text-3xl font-semibold text-info">
          Delete User
        </h1>
        <p className="text-secondary text-base desktop:text-lg">
          Are you sure you want to delete this user?
        </p>
        <div className="flex gap-6">
          <button
            className="btn w-[100px] desktop:w-[120px] bg-primary text-info desktop:text-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="btn w-[100px] desktop:w-[120px] bg-accent text-base-100 desktop:text-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserDialog;
