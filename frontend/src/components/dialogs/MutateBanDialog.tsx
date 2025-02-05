import { MutateDialogProps } from "./types";
import { MutateBan } from "../../models/ban";
import { useMemo } from "react";
import { useBanByUser } from "../../hooks/useBans";
import MutateBanForm from "./forms/MutateBanForm";
import { HiOutlineX } from "react-icons/hi";
import { ClipLoader } from "react-spinners";

interface MutateBanDialogProps extends MutateDialogProps {
  onMutate: () => void;
}

const MutateBanDialog = ({ id, onClose, onMutate }: MutateBanDialogProps) => {
  const { data: ban, isFetching } = useBanByUser(id);

  const defaultValues = useMemo<MutateBan | undefined>(() => {
    if (!ban) return undefined;
    const { userId: id, ...rest } = ban;
    return { userId: id, ...rest };
  }, [ban]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50">
      <div className="flex flex-col items-center w-fit gap-2 p-12 bg-white shadow-md shadow-primary rounded-lg">
        <button className="self-end" onClick={onClose}>
          <HiOutlineX className="w-[25px] h-[25px]" />
        </button>
        <h1 className="text-2xl desktop:text-3xl font-semibold text-info">
          Edit Ban
        </h1>

        {!isFetching && defaultValues ? (
          <MutateBanForm
            defaultValues={defaultValues}
            onClose={onClose}
            onMutate={onMutate}
          />
        ) : (
          <ClipLoader color="#1B998B" size={20} speedMultiplier={0.5} />
        )}
      </div>
    </div>
  );
};

export default MutateBanDialog;
