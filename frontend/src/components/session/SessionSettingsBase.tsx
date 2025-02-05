import { SessionFormProps, sessionSchema } from "./validationSchemas.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Session, SessionCreateInput } from "../../models/session.ts";
import { Group } from "../../models/group.ts";
import { useCreateSession, useUpdateSession } from "../../hooks/useSessions.ts";
import { useNavigate } from "react-router-dom";

interface SessionSettingsBaseProps {
  buttonText: string;
  defaultValues: SessionFormProps;
  groups: Group[];
  sessionId: string;
  sessionGroup?: Group;
}

const SessionSettingsBase = ({
  buttonText,
  defaultValues,
  groups,
  sessionId,
  sessionGroup,
}: SessionSettingsBaseProps) => {
  const { mutate: createSession } = useCreateSession();
  const { mutate: updateSession } = useUpdateSession(sessionId);
  const navigate = useNavigate();

  const {
    control,
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SessionFormProps>({
    defaultValues: defaultValues,
    resolver: zodResolver(sessionSchema),
  });

  const repeatPeriod = watch("repeatPeriod");
  const startDate = watch("date");

  const newSession = (values: SessionFormProps) => {
    const [hours, minutes] = values.time.split(":").map(Number);
    const newSession: SessionCreateInput = {
      start: new Date(values.date.setHours(hours, minutes)),
      duration: values.duration,
      groupId: values.groupId,
      subject: values.subject,
      repeatPeriod: values.repeatPeriod as string,
      repetitionEnd: values.repetitionEnd,
    };
    createSession(newSession);
    navigate("/auth/sessions");
  };

  const editSession = (values: SessionFormProps) => {
    const [hours, minutes] = values.time.split(":").map(Number);
    const editedSession: Session = {
      start: new Date(values.date.setHours(hours, minutes)),
      duration: values.duration,
      groupId: values.groupId,
      subject: values.subject,
      repeatPeriod: defaultValues.repeatPeriod as string,
      repetitionEnd: defaultValues.repetitionEnd,
      group: sessionGroup as Group,
      id: sessionId,
      realDuration: values.duration,
    };
    updateSession(editedSession);
    navigate(-1);
  };

  const submitHandler: SubmitHandler<SessionFormProps> = (values) => {
    if (sessionId) {
      editSession(values);
    } else {
      newSession(values);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col w-[360px] desktop:w-[965px] gap-5 text-info text-base desktop:text-xl mb-10"
    >
      <div className="flex flex-col gap-2 desktop:flex-row desktop:flex-wrap desktop:gap-4">
        <label className="form-control w-full desktop:flex-1">
          <div className="label font-medium text-base">Subject</div>
          <input
            {...register("subject")}
            type="text"
            placeholder="Subject"
            className="input input-bordered input-primary w-full h-[50px]"
          />
          {errors.subject && (
            <p className="text-red-700 mt-2 text-sm">
              {errors.subject.message}
            </p>
          )}
        </label>
        <label className="form-control w-full desktop:flex-1">
          <div className="label font-medium text-base">Group</div>
          <select
            {...register("groupId")}
            className="select select-bordered select-primary w-full h-[50px]"
          >
            {groups.map((group, index) => (
              <option value={group.id} key={index}>
                {group.name}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-row w-full gap-4">
          <label className="form-control w-full">
            <div className="label font-medium text-base">Date</div>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  {...register("date")}
                  id="expiration"
                  selected={field.value}
                  minDate={new Date()}
                  onChange={(date) => {
                    field.onChange(date);
                    setValue("date", date ? date : new Date());
                  }}
                  placeholderText="Choose date"
                  isClearable={true}
                  dateFormat={"dd/MM/yyyy"}
                  className="border border-primary rounded-[10px] h-[50px] text-info text-base font-medium pl-4 pr-1 placeholder:font-[600] mb-0 bg-white w-full placeholder:text-[#D2D2D2]"
                />
              )}
            />

            {errors.date && (
              <p className="text-red-700 mt-2 text-sm">{errors.date.message}</p>
            )}
          </label>
          <label className="form-control w-full">
            <div className="label font-medium text-base">Time</div>
            <input
              {...register("time")}
              type="time"
              placeholder="hh:mm"
              className="input input-bordered input-primary w-full h-[50px]"
            />
            {errors.time && (
              <p className="text-red-700 mt-2 text-sm">{errors.time.message}</p>
            )}
          </label>
        </div>
        <label className="form-control w-full">
          <div className="label font-medium text-base">Duration</div>
          <label className="input input-bordered input-primary flex items-center gap-2">
            <input
              {...register("duration", { valueAsNumber: true })}
              type="number"
              min={"1"}
              max={"360"}
              className="grow"
              placeholder="Duration"
            />
            {errors.duration && (
              <p className="text-red-700 mt-2 text-sm">
                {errors.duration.message}
              </p>
            )}
            minutes
          </label>
        </label>

        <label className="form-control w-full desktop:flex-1">
          <div className="label font-medium text-base">Repeat</div>
          <div className="form-control w-[180px] flex-row">
            <label className="label cursor-pointer pl-10">
              <input
                {...register("repeatPeriod")}
                type="radio"
                name="repeat"
                value="No repetition"
                onChange={() => setValue("repeatPeriod", "No repetition")}
                checked={repeatPeriod === "No repetition"}
                disabled={sessionId !== ""}
                className="radio radio-primary"
              />
              <span className="label-text text-info text-sm font-medium pl-6">
                No repetition
              </span>
            </label>
          </div>
          <div className="form-control w-[180px] flex-row">
            <label className="label cursor-pointer pl-10">
              <input
                type="radio"
                name="repeat"
                value="Every day"
                onChange={() => setValue("repeatPeriod", "Every day")}
                checked={repeatPeriod === "Every day"}
                disabled={sessionId !== ""}
                className="radio radio-primary"
              />
              <span className="label-text text-info text-sm font-medium pl-6">
                Every day
              </span>
            </label>
          </div>
          <div className="form-control w-[180px] flex-row">
            <label className="label cursor-pointer pl-10">
              <input
                type="radio"
                name="repeat"
                value="Every week"
                onChange={() => setValue("repeatPeriod", "Every week")}
                checked={repeatPeriod === "Every week"}
                disabled={sessionId !== ""}
                className="radio radio-primary"
              />
              <span className="label-text text-info text-sm font-medium pl-6">
                Every week
              </span>
            </label>
          </div>
          <div className="form-control w-[180px] flex-row">
            <label className="label cursor-pointer pl-10">
              <input
                type="radio"
                name="repeat"
                value="Every month"
                onChange={() => setValue("repeatPeriod", "Every month")}
                checked={repeatPeriod === "Every month"}
                disabled={sessionId !== ""}
                className="radio radio-primary"
              />
              <span className="label-text text-info text-sm font-medium pl-6">
                Every month
              </span>
            </label>
          </div>
        </label>
        {errors.repeatPeriod && (
          <p className="text-red-700 mt-2 text-sm">
            {errors.repeatPeriod.message}
          </p>
        )}

        <label className="form-control w-full desktop:flex-1">
          <div className="label font-medium text-base">Repetition end</div>
          <Controller
            control={control}
            name="repetitionEnd"
            render={({ field }) => (
              <DatePicker
                {...register("repetitionEnd")}
                id="repetitionEnd"
                selected={field.value}
                minDate={startDate}
                onChange={(date) => {
                  field.onChange(date);
                  setValue("repetitionEnd", date ? date : undefined);
                }}
                placeholderText="Choose end date"
                isClearable={true}
                dateFormat={"dd/MM/yyyy"}
                disabled={repeatPeriod === "No repetition" || sessionId !== ""}
                className="border border-primary rounded-[10px] h-[50px] text-info text-base font-medium pl-4 pr-1
                placeholder:font-[600] mb-0 bg-white w-full placeholder:text-[#D2D2D2] disabled:border-neutral"
              />
            )}
          />

          {errors.repetitionEnd && (
            <p className="text-red-700 mt-2 text-sm">
              {errors.repetitionEnd.message}
            </p>
          )}
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-accent w-[220px] h-[45px] text-base text-base-100
                    font-medium self-center"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default SessionSettingsBase;
