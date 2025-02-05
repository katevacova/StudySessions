import { ClipLoader } from "react-spinners";
import SessionSettingsBase from "../../components/session/SessionSettingsBase.tsx";
import { useGroups } from "../../hooks/useGroups.ts";

const PlanSession = () => {
  const { data: groups, isFetching } = useGroups();

  return (
    <>
      <div className="flex flex-col self-center items-center justify-center w-[360px] gap-5 desktop:w-[965px]">
        <div className="flex flex-row justify-between w-full">
          <header className="label text-info text-3xl font-semibold self-start">
            Plan Session
          </header>
        </div>
        {isFetching || !groups ? (
          <ClipLoader color="#1B998B" size={200} speedMultiplier={0.5} />
        ) : (
          <SessionSettingsBase
            buttonText={"Create new session"}
            groups={groups}
            sessionId=""
            defaultValues={{
              subject: "",
              duration: 0,
              date: new Date(),
              time: "",
              repetitionEnd: undefined,
              repeatPeriod: "No repetition",
              groupId: "",
            }}
          />
        )}
      </div>
    </>
  );
};

export default PlanSession;
