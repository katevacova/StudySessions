import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AdhocSessionFormProps,
  adhocSessionSchema,
} from "./validationSchemas.ts";
import CurrentSessionCard from "./CurrentSessionCard.tsx";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useGroups } from "../../hooks/useGroups.ts";
import { ClipLoader } from "react-spinners";
import { useCreateSession } from "../../hooks/useSessions.ts";

interface PlanSessionCardProps {
  isSessionStarted: boolean;
  setIsSessionStarted: Dispatch<SetStateAction<boolean>>;
  currentSessionId: string;
  setCurrentSessionId: Dispatch<SetStateAction<string>>;
}

const PlanSessionCard = ({
  isSessionStarted,
  setIsSessionStarted,
  currentSessionId,
  setCurrentSessionId,
}: PlanSessionCardProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdhocSessionFormProps>({
    defaultValues: {
      subject: "",
      groupId: "",
      repeatPeriod: "no repetition",
      duration: 0,
      start: new Date(),
      repetitionEnd: new Date(),
    },
    resolver: zodResolver(adhocSessionSchema),
  });

  const { data, isFetching } = useGroups();
  const { newSession, mutate: createSession } = useCreateSession();

  const submitHandler: SubmitHandler<AdhocSessionFormProps> = (values) => {
    createSession(values);
  };

  useEffect(() => {
    if (newSession) {
      setCurrentSessionId(newSession.id);
      setIsSessionStarted(true);
    }
  }, [newSession]);

  return isSessionStarted ? (
    <CurrentSessionCard
      setIsSessionStarted={setIsSessionStarted}
      currentSessionId={currentSessionId}
    />
  ) : (
    <div className="card w-[357px] h-[449px] bg-base-100 text-info border-primary border-2 shadow-blue flex flex-col justify-center">
      <div className="card-body items-center text-center text-info w-full px-6">
        <h2 className="card-title text-xl">Start new session</h2>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col items-center w-full"
        >
          <div className="flex flex-col items-start w-full">
            <label className="form-control w-full">
              <div className="label font-medium mb-1">Subject</div>
              <input
                {...register("subject")}
                type="text"
                placeholder="Subject"
                className="input input-bordered input-primary h-[50px] w-full"
              />
              {errors.subject && (
                <p className="text-red-700 text-sm mt-2 self-start">
                  {errors.subject.message}
                </p>
              )}
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label font-medium">Group</div>
              {!isFetching ? (
                <select
                  {...register("groupId")}
                  className="select select-bordered select-primary w-full"
                >
                  {data?.map((group, index) => (
                    <option value={group.id} key={index}>
                      {group.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div>
                  <ClipLoader color="#1B998B" size={20} speedMultiplier={0.5} />
                </div>
              )}
            </label>
            <label className="form-control w-full">
              <div className="label font-medium">Duration</div>
              <label className="input input-bordered input-primary flex items-center gap-2">
                <input
                  {...register("duration", { valueAsNumber: true })}
                  type="number"
                  min={"1"}
                  max={"360"}
                  className="grow"
                  placeholder="Duration"
                />
                minutes
              </label>
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary text-info w-[227px] text-base font-medium mt-4"
          >
            Start session
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlanSessionCard;
