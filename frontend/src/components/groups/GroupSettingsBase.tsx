import React, { useEffect, useState } from "react";
import {
  GroupFormProps,
  groupSchema,
  inviteMemberSchema,
} from "./validationSchemas.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateGroup, useUpdateGroup } from "../../hooks/useGroups.ts";
import { useAuth } from "../../hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";
import { GroupBasic } from "../../models/group.ts";

interface GroupSettingsBaseProps {
  buttonText: string;
  defaultValues: GroupFormProps;
  groupId: string;
}
const GroupSettingsBase: React.FC<GroupSettingsBaseProps> = ({
  buttonText,
  defaultValues,
  groupId,
}) => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emails, setEmails] = useState(
    defaultValues.members || [auth?.user?.email],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<GroupFormProps>({
    defaultValues: defaultValues,
    resolver: zodResolver(groupSchema),
  });

  const { mutate: createGroup } = useCreateGroup();
  const { mutate: updateGroup } = useUpdateGroup(groupId);
  const navigate = useNavigate();

  const createGroupHandler = (values: GroupBasic) => {
    createGroup(values);
    navigate("/auth/groups");
  };

  const updateGroupHandler = (values: GroupBasic) => {
    updateGroup(values);
    navigate("/auth/groups");
  };

  const submitHandler: SubmitHandler<GroupFormProps> = (values) => {
    if (groupId !== "") {
      updateGroupHandler(values);
    } else {
      createGroupHandler(values);
    }
  };

  useEffect(() => {
    setValue("members", emails); // update the form value when emails state changes
  }, [emails, setValue]);

  const inviteMember = () => {
    const result = inviteMemberSchema.safeParse({ email });

    if (result.success) {
      setEmails([...emails, email]);
      setEmail("");
      setEmailError("");
    } else {
      setEmailError(result.error.errors[0].message);
    }
  };

  const deleteUser = (email: string) => {
    setEmails((prevEmails) =>
      prevEmails.filter((existingEmail) => existingEmail !== email),
    );
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col w-[360px] tablet:w-[965px] gap-5 mb-10 text-info text-base tablet:text-xl"
    >
      <div className="flex flex-col w-full gap-4 tablet:flex-row">
        <label className="form-control w-full">
          <div className="label font-medium">Name</div>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="input input-bordered input-primary h-[50px]"
          />
          {errors.name && (
            <p className="text-red-700 mt-2 text-sm">{errors.name.message}</p>
          )}
        </label>
      </div>
      <div className="flex flex-col">
        <div className="label font-medium mb-2">Members</div>
        {emails.map((member, index) => (
          <div
            key={index}
            className="flex flex-col w-[333px] tablet:w-[930px] self-center"
          >
            <div className="flex flex-row items-center gap-5">
              <button
                type={"button"}
                onClick={() => deleteUser(member)}
                className="btn btn-circle btn-outline btn-info btn-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex flex-col gap-0 tablet:flex-row tablet:justify-between tablet:w-full">
                <label className="label text-xl font-medium text-info p-0 tablet:text-2xl"></label>
                <label className="label text-sm font-normal text-info p-0 tablet:text-base">
                  {member}
                </label>
              </div>
            </div>
            {index !== emails.length - 1 && (
              <div className="divider divider-primary p-0 m-1"></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full gap-4 tablet:flex-row tablet:justify-end">
        <div className="flex flex-col">
          {emailError && (
            <p className="text-red-700 mt-2 text-sm">{emailError}</p>
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email address"
            className="input input-bordered input-primary h-[50px] tablet:w-[300px] mt-2"
          />
        </div>
        <button
          onClick={inviteMember}
          type={"button"}
          className="btn btn-primary w-[159px] h-[40px] text-base text-info font-medium self-end"
        >
          Invite member
        </button>
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

export default GroupSettingsBase;
