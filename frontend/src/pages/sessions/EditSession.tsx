import SessionSettingsBase from "../../components/session/SessionSettingsBase.tsx";
import { useState } from "react";
import DeleteSessionDialog from "../../components/dialogs/DeleteSessionDialog.tsx";
import { useParams } from "react-router-dom";
import { useSession } from "../../hooks/useSessions.ts";
import { ClipLoader } from "react-spinners";
import { useGroups } from "../../hooks/useGroups.ts";

const EditSession = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  if (!sessionId) {
    return null;
  }

  const { data: groups, isFetching: fetchingGroups } = useGroups();
  const { data: session, isFetching: fetchingSession } = useSession(sessionId);

  const [deletingEntityId, setDeletingEntityId] = useState<boolean>(false);
  const handleEntityDelete = () => setDeletingEntityId(true);
  const handleCloseDeleteDialog = () => setDeletingEntityId(false);

  return (
    <>
      <div className="flex flex-col self-center items-center justify-center w-[360px] gap-5 desktop:w-[965px] mb-10">
        <div className="flex flex-row justify-between w-full">
          <header className="label text-info text-3xl font-semibold self-start">
            Edit Session
          </header>
          <button
            className="btn btn-secondary text-base-100 text-base font-medium h-[45px] w-[160px]"
            onClick={() => handleEntityDelete()}
          >
            Delete session
          </button>
        </div>
        {fetchingSession || fetchingGroups || !session || !groups ? (
          <ClipLoader color="#1B998B" size={200} speedMultiplier={0.5} />
        ) : (
          <SessionSettingsBase
            buttonText={"Edit Session"}
            groups={groups}
            sessionId={sessionId}
            defaultValues={{
              subject: session.subject,
              duration: session.duration,
              repeatPeriod: session.repeatPeriod,
              repetitionEnd: session.repetitionEnd,
              time: session.start
                ? new Date(session.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "",
              date: new Date(session.start),
              groupId: session.groupId,
            }}
          />
        )}
        {deletingEntityId && sessionId && (
          <DeleteSessionDialog
            id={sessionId}
            onClose={handleCloseDeleteDialog}
          />
        )}
      </div>
    </>
  );
};

export default EditSession;
