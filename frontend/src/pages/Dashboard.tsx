import { useSessionHistory } from "../hooks/useSessions.ts";
import HistorySessionCard from "../components/session/session card/HistorySessionCard.tsx";
import { ClipLoader } from "react-spinners";
const Dashboard = () => {
  const { data: sessions, isFetching } = useSessionHistory();

  return (
    <>
      <div className="flex flex-col self-center items-center justify-center w-[360px] gap-5 desktop:w-[965px] pb-10">
        <div className="flex flex-col justify-between items-center w-full tablet:h-[300px]">
          <h1 className="label text-info text-5xl font-bold self-center text-center leading-relaxed">
            Track Your Study Time,
            <br />
            Master Your Subjects!
          </h1>
          <p className="label text-accent font-light text-xl text-center tracking-widest">
            PLAN, GROUP, AND SUCCEED WITH OUR STUDY SESSION APP!
          </p>
        </div>
        <div className="divider divider-primary p-0 m-1"></div>
        <label className="label text-info text-xl font-medium self-start">
          Session History
        </label>
        {!isFetching ? (
          <div className="flex flex-col w-full desktop:px-8 gap-4">
            {sessions?.map((session, index) => (
              <HistorySessionCard key={index} session={session} />
            ))}
          </div>
        ) : (
          <div>
            <ClipLoader color="#1B998B" size={100} speedMultiplier={0.5} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
