import { Link } from "react-router-dom";
import { Group } from "../../models/group";

interface GroupCardProps {
  group: Group;
}

const GroupCard = ({ group }: GroupCardProps) => {
  return (
    <div>
      <div
        className="card w-[357px] h-[449px] bg-base-100
        text-info border-primary border-2 shadow-blue"
      >
        <div className="card-body items-center text-center justify-center">
          <h2 className="card-title text-2xl">{group.name}</h2>
          <div className="text-left text-xl p-2">
            <p className="text-info mt-6">Number of members</p>
            <p className="text-accent p-4 font-medium">
              {group.members.length}
            </p>
            <p className="text-info">Next session</p>
            {group.sessions.length > 0 ? (
              <p className="text-accent p-4 font-medium">
                {new Date(group.sessions[0].start).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-accent p-4 font-medium">No sessions</p>
            )}
          </div>
          <div className="card-actions justify-end">
            <Link to={`/auth/groups/${group.id}/info`} key={group.id}>
              <button className="btn btn-primary text-info w-[227px] text-base font-medium">
                Group info
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
