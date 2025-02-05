import { MutateDialogProps, Ban } from "./types";
import { SubmitHandler, useForm } from "react-hook-form";
import { banSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateBan } from "../../hooks/useBans";
import DatePicker from "react-datepicker";
import { HiOutlineX } from "react-icons/hi";

const CreateBanDialog = ({ id, onClose }: MutateDialogProps) => {
  const [selectExpiration, setSelectExpiration] = useState<Date | null>(null);
  const { mutate: createBan } = useCreateBan();

  const submitHandler: SubmitHandler<Ban> = (values) => {
    createBan(values);
    onClose();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ban>({
    defaultValues: { reason: "", expiration: new Date(), userId: id },
    resolver: zodResolver(banSchema),
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50">
      <div className="flex flex-col items-center w-fit gap-2 p-12 bg-white shadow-md shadow-primary rounded-lg">
        <button className="self-end" onClick={onClose}>
          <HiOutlineX className="w-[25px] h-[25px]" />
        </button>
        <h1 className="text-2xl desktop:text-3xl font-semibold text-info">
          Create Ban
        </h1>

        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
          <label htmlFor="reason" className="label text-base font-medium">
            Reason
          </label>
          <input
            {...register("reason")}
            type="text"
            id="reason"
            placeholder="Banned because..."
            className="input input-bordered input-primary w-[250px] h-[50px] desktop:w-[400px] text-sm desktop:text-base"
          />
          {errors.reason && (
            <p className="text-red-700 mt-2 text-sm">{errors.reason.message}</p>
          )}

          <label
            htmlFor="expiration"
            className="label text-base font-medium mt-4"
          >
            Expiration date
          </label>
          <DatePicker
            {...register("expiration")}
            id="expiration"
            selected={selectExpiration}
            minDate={new Date()}
            onChange={setSelectExpiration}
            placeholderText="Choose expiration..."
            isClearable={true}
            dateFormat={"dd/MM/yyyy"}
            className="border border-primary rounded-[10px] h-[50px] text-info text-sm desktop:text-base font-medium pl-4 pr-1 placeholder:text-[#D2D2D2] w-[250px] desktop:w-[400px]"
          />
          {errors.expiration && (
            <p className="text-red-700 mt-2 text-sm">
              {errors.expiration.message}
            </p>
          )}
          <button
            type="submit"
            className="btn btn-error self-center w-[100px] desktop:w-[150px] mt-6"
          >
            Ban User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBanDialog;
