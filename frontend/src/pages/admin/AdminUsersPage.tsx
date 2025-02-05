import { createColumnHelper } from "@tanstack/react-table";
import UsersTable from "../../components/table/UsersTable";
import { useUsers } from "../../hooks/useUsers";
import { ClipLoader } from "react-spinners";

const colsHelper = createColumnHelper();
const columns = [
  colsHelper.accessor("name", { header: "Username" }),
  colsHelper.accessor("email", { header: "Email" }),
  colsHelper.accessor("banned", { header: "Banned" }),
  colsHelper.accessor("id", { header: "" }),
];

const AdminUsersPage = () => {
  const { data: users, isFetching, refetch } = useUsers();
  const tableData = users?.filter((user) => !user.isOwner);

  return (
    <div className="flex self-center mb-10">
      {tableData && !isFetching ? (
        <UsersTable data={tableData} columns={columns} onMutate={refetch} />
      ) : (
        <div className="mt-20">
          <ClipLoader color="#1B998B" size={200} speedMultiplier={0.5} />
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
