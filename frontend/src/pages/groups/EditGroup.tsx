import { useState } from "react";
import GroupSettingsBase from "../../components/groups/GroupSettingsBase";
import DeleteGroupDialog from "../../components/dialogs/DeleteGroupDialog";
import { useParams } from "react-router-dom";
import { useGroup } from "../../hooks/useGroups";
import { ClipLoader } from "react-spinners";

const EditGroup = () => {
  const { groupId } = useParams<{ groupId: string }>();
  if (!groupId) {
    return null;
  }

  const { data: group, isFetching } = useGroup(groupId);

  const [deletingEntityId, setDeletingEntityId] = useState<boolean>(false);
  const handleEntityDelete = () => setDeletingEntityId(true);
  const handleCloseDeleteDialog = () => setDeletingEntityId(false);

  return (
    <>
      {isFetching || !group ? (
        <div className="self-center mt-20">
          <ClipLoader color="#1B998B" size={200} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className="flex flex-col self-center items-center justify-center w-[360px] desktop:w-[965px] gap-5 mb-10">
          <div className="flex flex-row justify-between w-full">
            <header className="label text-info text-3xl font-semibold self-start">
              Edit Group
            </header>
            <button
              className="btn btn-secondary text-base-100 text-base font-medium h-[45px] w-[160px]"
              onClick={handleEntityDelete}
            >
              Delete group
            </button>
          </div>
          <GroupSettingsBase
            buttonText={"Edit group"}
            groupId={groupId}
            defaultValues={{
              name: group.name,
              members: group.members.map((member) => member.email),
            }}
          />
          {deletingEntityId && (
            <DeleteGroupDialog id={groupId} onClose={handleCloseDeleteDialog} />
          )}
        </div>
      )}
    </>
  );
};

export default EditGroup;
