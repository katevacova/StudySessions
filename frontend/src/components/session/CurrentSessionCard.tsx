import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useSession, useUpdateSession } from "../../hooks/useSessions.ts";
import { ClipLoader } from "react-spinners";
import { Session } from "../../models/session"; // Import the correct types

interface CurrentSessionCardProps {
  setIsSessionStarted: Dispatch<SetStateAction<boolean>>;
  currentSessionId: string;
}

const CurrentSessionCard = ({
  setIsSessionStarted,
  currentSessionId,
}: CurrentSessionCardProps) => {
  const { data, isFetching } = useSession(currentSessionId);

  const [counter, setCounter] = useState<number>(0); // Initialize with 0

  useEffect(() => {
    if (data?.duration) {
      setCounter(data.duration * 60);
    }
  }, [data]);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused && counter > 0) {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPaused, counter]);

  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  const { mutate: editSession } = useUpdateSession(currentSessionId);

  const endSession = async () => {
    setIsPaused(true);

    // Calculate new duration
    const newDuration = Math.round(counter / 60);

    // Ensure all required fields are set with defaults if undefined
    const sessionData: Session = {
      id: data?.id || "",
      duration: newDuration,
      subject: data?.subject || "",
      groupId: data?.groupId || "",
      repeatPeriod: data?.repeatPeriod || "",
      start: data?.start || new Date(),
      repetitionEnd: data?.repetitionEnd || undefined,
      group: data?.group || {
        id: "",
        ownerId: "",
        name: "",
        members: [],
        sessions: [],
      },
      realDuration: data?.realDuration || 0,
    };

    editSession(sessionData);

    setCounter(0);
    setIsSessionStarted(false);
  };

  return (
    <div className="card w-[357px] h-[449px] bg-base-100 text-info border-primary border-2 shadow-blue flex flex-col justify-center">
      {isFetching ? (
        <ClipLoader color="#1B998B" size={20} speedMultiplier={0.5} />
      ) : (
        <div className="card-body items-center text-center text-info w-full px-6">
          <h2 className="card-title text-xl">Current session</h2>
          <div className="flex flex-row items-left gap-2 self-start">
            <p className="label text-base text-info w-[67px]">Subject</p>
            <p className="label text-accent text-base font-medium">
              {data?.subject ?? "N/A"}
            </p>
          </div>
          <div className="flex flex-row items-left gap-2 self-start">
            <p className="label text-base text-info w-[67px]">Group</p>
            <p className="label text-accent text-base font-medium">
              {data?.group?.name ?? "N/A"}
            </p>
          </div>
          <div className="m-3 flex h-[180px] w-[180px] items-center justify-center rounded-full border-4 border-accent">
            <span className="countdown font-mono text-2xl">
              {minutes}m {seconds}s
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="btn btn-primary w-[146px] h-[40px] text-base text-info font-medium"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={endSession}
              className="btn btn-secondary w-[146px] h-[40px] text-base text-base-100 font-medium"
            >
              End session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentSessionCard;
