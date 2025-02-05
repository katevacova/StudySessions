import { RedirectDialogProps } from "./types";

const DeleteSessionDialog = ({ where, onClose }: RedirectDialogProps) => {
  return (
    <div className="flex flex-col items-center w-[360px] desktop:w-[600px] gap-4 p-10 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl desktop:text-3xl font-semibold text-info text-center">
        You are not authorized to view this page
      </h1>
      <p className="text-secondary text-base desktop:text-lg text-center">
        You will be redirected to {where}
      </p>
      <div className="flex gap-6">
        <button
          className="btn w-[100px] desktop:w-[120px] bg-accent text-base-100 desktop:text-lg"
          onClick={onClose}
        >
          Redirect
        </button>
      </div>
    </div>
  );
};

export default DeleteSessionDialog;
