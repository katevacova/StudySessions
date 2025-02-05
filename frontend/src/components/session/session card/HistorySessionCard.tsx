import { Session } from "../../../models/session.ts";
import { useState } from "react";
import DeleteSessionDialog from "../../dialogs/DeleteSessionDialog.tsx";

export interface HistorySessionCardProps {
  session: Session;
}

const HistorySessionCard = ({ session }: HistorySessionCardProps) => {
  const [deletingEntityId, setDeletingEntityId] = useState<boolean>(false);
  const handleEntityDelete = () => setDeletingEntityId(true);
  const handleCloseDeleteDialog = () => setDeletingEntityId(false);

  return (
    <div className="card grid grid-auto-cols grid-auto-rows justify-items-center justify-stretch p-5 desktop:px-10 gap-x-5 gap-y-2 desktop:gap-y-0 w-[827] desktop:w-[373] h-[136] desktop:h-[126] border-4 rounded-lg shadow-lg text-info">
      <div className="col-start-1 row-start-1 self-end text-base desktop:text-xl">
        Session Start
      </div>
      <div className="col-start-1 row-start-2 text-3xl desktop:text-4xl font-extrabold self-center text-center">
        {session.start
          ? new Date(session.start).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : ""}
      </div>
      <div className="col-start-1 row-start-3 text-base desktop:text-xl font-medium">
        {session.start
          ? new Date(session.start).toLocaleDateString([], {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })
          : ""}
      </div>
      <div className="col-start-2 row-start-1 desktop:row-start-2 flex flex-nowrap desktop:flex-col place-content-between justify-self-stretch desktop:justify-self-center">
        <div className="self-center text-base desktop:text-xl">Duration</div>
        <div className="text-xl desktop:text-4xl font-medium desktop:font-bold">
          {session.realDuration - session.duration + " min"}
        </div>
      </div>
      <button
        className="btn btn-lg btn-error col-start-2 row-start-2 row-span-2 desktop:col-start-3 justify-self-stretch self-center desktop:self-auto"
        onClick={() => handleEntityDelete()}
      >
        Delete session
      </button>
      {deletingEntityId && session.id && (
        <DeleteSessionDialog
          id={session.id}
          onClose={handleCloseDeleteDialog}
        />
      )}
    </div>
  );
};

export default HistorySessionCard;
