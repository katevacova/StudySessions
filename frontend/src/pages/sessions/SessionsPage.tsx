import PlanSessionCard from "../../components/session/PlanSessionCard.tsx";
import { useSessions } from "../../hooks/useSessions.ts";
import SessionCard from "../../components/session/session card/SessionCard.tsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const SessionPage = () => {
  const { data: sessions, isFetching } = useSessions();
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState("");

  return (
    <>
      <div className="flex flex-col self-center items-center justify-center w-[360px] gap-5 desktop:w-[965px] pb-10">
        <header className="label text-info text-3xl font-semibold self-start">
          Sessions
        </header>
        <div className="flex flex-col desktop:flex-row justify-between w-full gap-8">
          <PlanSessionCard
            isSessionStarted={isSessionStarted}
            setIsSessionStarted={setIsSessionStarted}
            currentSessionId={currentSessionId}
            setCurrentSessionId={setCurrentSessionId}
          />
          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between w-full">
              <label className="label text-info text-xl font-medium self-start">
                Upcoming sessions
              </label>
              <Link to={"/auth/sessions/plan"}>
                <button className="btn btn-secondary text-base-100 text-base font-medium h-[45px] w-[160px]">
                  Plan session
                </button>
              </Link>
            </div>

            {isFetching ? (
              <ClipLoader color="#1B998B" size={200} speedMultiplier={0.5} />
            ) : sessions?.length === 0 ? (
              <div className="skeleton w-[360px] desktop:w-[500px] h-32 bg-primary">
                <p className="text-info font-semibold text-center pt-8 px-4">
                  You have no upcoming study sessions. <br />
                  Create new groups and plan sessions to get started!
                </p>
              </div>
            ) : (
              sessions?.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  setIsSessionStarted={setIsSessionStarted}
                  isSessionStarted={isSessionStarted}
                  setCurrentSessionId={setCurrentSessionId}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionPage;
