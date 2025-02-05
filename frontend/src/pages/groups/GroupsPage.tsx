import GroupCard from "../../components/groups/GroupCard";
import { Link } from "react-router-dom";
import { useGroups } from "../../hooks/useGroups.ts";
import { ClipLoader } from "react-spinners";

const GroupsPage = () => {
  const { data: groups, isFetching } = useGroups();

  return (
    <>
      <header className="flex self-center tablet:items-center justify-between tablet:w-full tablet:px-20 text-3xl gap-24 font-semibold text-info">
        Groups
        <Link to={"/auth/groups/new"}>
          <button className="btn btn-secondary w-[150px] h-[50px] text-base-100 text-lg font-bold">
            Create group
          </button>
        </Link>
      </header>

      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 justify-items-center gap-10 px-10 pt-0 mb-10">
        {isFetching || !groups ? (
          <ClipLoader color="#1B998B" size={200} speedMultiplier={0.5} />
        ) : groups.length === 0 ? (
          <div className="skeleton w-full tablet:col-span-2 desktop:col-span-3 h-32 bg-primary">
            <p className="text-info font-semibold text-center pt-11 tablet:text-2xl px-4">
              You have no study groups, invite your friends and study together!
            </p>
          </div>
        ) : (
          groups.map((group, index) => <GroupCard key={index} group={group} />)
        )}
      </div>
    </>
  );
};

export default GroupsPage;
