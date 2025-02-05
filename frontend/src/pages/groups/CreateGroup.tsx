import GroupSettingsBase from "../../components/groups/GroupSettingsBase.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";

const CreateGroup = () => {
  const auth = useAuth();
  if (!auth?.user) return null;

  return (
    <div className="flex flex-col self-center items-center justify-center w-[360px] gap-5 desktop:w-[965px]">
      <header className="label text-info text-3xl font-semibold self-start">
        Create group
      </header>
      <GroupSettingsBase
        buttonText={"Create group"}
        groupId=""
        defaultValues={{
          name: "",
          members: [auth?.user.email],
        }}
      />
    </div>
  );
};

export default CreateGroup;
