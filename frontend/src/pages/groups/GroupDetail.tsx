import SessionCard from "../../components/session/session card/SessionCard.tsx";
import { Link, useParams } from "react-router-dom";
import { useGroup } from "../../hooks/useGroups.ts";
import { ClipLoader } from "react-spinners";

const GroupDetail = () => {
  const { groupId } = useParams();
  if (!groupId) {
    return null;
  }

  const { data: group, isFetching } = useGroup(groupId);

  return (
    <>
      {isFetching || !group ? (
        <ClipLoader color="#1B998B" size={200} speedMultiplier={0.5} />
      ) : (
        <div className="flex flex-col self-center items-center justify-center w-[360px] gap-5 tablet:w-[965px] text-info mb-10">
          <div className="flex flex-row justify-between w-full">
            <header className="label text-info text-3xl font-semibold self-start line-clamp-1">
              {group.name}
            </header>
            <Link to={`/auth/groups/${groupId}/edit`}>
              <button className="btn btn-secondary text-base-100 text-base font-medium h-[45px] w-[160px]">
                Group Settings
              </button>
            </Link>
          </div>
          <div className="flex flex-col w-full gap-4">
            <label className="label font-semibold">Members</label>
            {group.members.map((member, index) => (
              <div
                key={index}
                className="flex flex-col w-[333px] tablet:w-[930px] self-center"
              >
                <div className="flex flex-row items-center gap-5">
                  <div className="flex flex-col gap-0 tablet:flex-row tablet:justify-between tablet:w-full">
                    <label className="label text-xl font-medium text-info p-0 pb-3">
                      {member.name}
                    </label>
                    <label className="label text-sm font-normal text-info p-0 tablet:text-base pb-3">
                      {member.email}
                    </label>
                  </div>
                </div>
                {index !== group.members.length - 1 && (
                  <div className="divider divider-primary p-0 m-1"></div>
                )}
              </div>
            ))}
          </div>
          <div className="divider divider-primary"></div>
          <div className="flex flex-col w-full gap-4">
            {group.sessions
              .filter((session) => new Date(session.start) > new Date())
              .map((session, index) => (
                <SessionCard key={index} session={session} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GroupDetail;
