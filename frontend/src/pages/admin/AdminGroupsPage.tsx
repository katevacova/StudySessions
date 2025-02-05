import { createColumnHelper } from "@tanstack/react-table";
import GroupsTable from "../../components/table/GroupsTable";
import { useGroupsForAdmin } from "../../hooks/useGroups";
import { User } from "../../models/user";
import { ClipLoader } from "react-spinners";
import { Session } from "../../models/session.ts";

const colsHelper = createColumnHelper();

const columns = [
  colsHelper.accessor("name", { header: "Name" }),
  colsHelper.accessor("sessions", {
    header: "Sessions",
    cell: (cell) => (cell.getValue() as Session[]).length,
  }),
  colsHelper.accessor("members", {
    header: "Members",
    cell: (cell) => (cell.getValue() as User[]).length,
  }),
  colsHelper.accessor("id", { header: "" }),
];

const AdminGroupsPage = () => {
  const { data: groups, isFetching } = useGroupsForAdmin();

  return (
    <div className="flex self-center mb-10">
      {groups && !isFetching ? (
        <GroupsTable data={groups} columns={columns} />
      ) : (
        <div className="mt-20">
          <ClipLoader color="#1B998B" size={200} speedMultiplier={0.5} />
        </div>
      )}
    </div>
  );
};

export default AdminGroupsPage;
