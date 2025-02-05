import { MutateDialogProps, Ban } from "../components/dialogs/types";
import { useForm } from "react-hook-form";
import { banSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateBan } from "../hooks/useBans";
import DatePicker from "react-datepicker";
import { HiOutlineX } from "react-icons/hi";

const CreateBanForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ban>({
    defaultValues: { reason: "", expiration: new Date(), userId: id },
    resolver: zodResolver(banSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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

      <label className="label text-base font-medium mt-4">
        Expiration date
      </label>
      <DatePicker
        {...register("expiration", { valueAsDate: true })}
        selected={selectExpiration}
        minDate={new Date()}
        onChange={setSelectExpiration}
        placeholderText="Choose expiration..."
        isClearable={true}
        dateFormat={"dd/MM/yyyy"}
        className="border border-primary rounded-[10px] h-[50px] text-info text-sm desktop:text-base font-medium pl-4 pr-1 placeholder:text-[#D2D2D2] w-[250px] desktop:w-[400px]"
      />
      {errors.expiration && (
        <p className="text-red-700 mt-2 text-sm">{errors.expiration.message}</p>
      )}
      <button
        type="submit"
        className="btn btn-error self-center w-[100px] desktop:w-[150px] mt-6"
        onClick={handleSubmit(onSubmit)}
      >
        Ban User
      </button>
    </form>
  );
};

export default CreateBanForm;
