import { Session } from "../../../models/session";
import {
  cardStyle,
  timeStyle,
  dateStyle,
  durationStyle,
  buttonStyle,
  labelStyle,
} from "./styles";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

export interface SessionCardProps {
  session: Session;
  isSessionStarted: boolean;
  setIsSessionStarted: Dispatch<SetStateAction<boolean>>;
  setCurrentSessionId: Dispatch<SetStateAction<string>>;
}

const SessionCard = ({
  session,
  isSessionStarted,
  setIsSessionStarted,
  setCurrentSessionId,
}: SessionCardProps) => {
  const type =
    session.start &&
    new Date(session.start).getTime() - 600000 <= new Date().getTime()
      ? "active"
      : "non-active";

  const startSession = () => {
    if (isSessionStarted) {
      return;
    }
    setCurrentSessionId(session.id);
    setIsSessionStarted(true);
  };

  return (
    <div className={cardStyle(type)}>
      <div className="col-start-1 row-start-1 self-end text-base desktop:text-xl">
        Session Start
      </div>
      <div className={timeStyle(type)}>
        {session.start
          ? new Date(session.start).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : ""}
      </div>
      <div className={dateStyle(type)}>
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
        <div className={durationStyle(type)}>{session.duration + " min"}</div>
      </div>
      <button
        className={`${buttonStyle(type)} ${type === "active" && isSessionStarted ? "disabled-class" : ""}`}
        onClick={type === "active" ? startSession : undefined}
        disabled={type === "active" && isSessionStarted}
      >
        {type === "active" ? (
          <div className={labelStyle(type)}>Start Session</div>
        ) : (
          <Link
            to={`/auth/sessions/${session.id}/edit`}
            className={labelStyle(type)}
          >
            Edit Session
          </Link>
        )}
      </button>
    </div>
  );
};

export default SessionCard;
